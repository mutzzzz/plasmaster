import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const FRAMES_ROOT = path.join(PUBLIC_DIR, 'frames', 'assembly');
const MANIFEST_PATH = path.join(FRAMES_ROOT, 'manifest.json');
const FPS = 24;
const DESKTOP_MAX_WIDTH = 1440;
const MOBILE_MAX_WIDTH = 900;

const SOURCES = {
  desktop: {
    label: 'desktop',
    sourceFile: path.join(PUBLIC_DIR, 'Industrial_animation_assembly.mp4'),
    sourceVideo: '/Industrial_animation_assembly.mp4',
    outputDir: path.join(FRAMES_ROOT, 'desktop'),
    pathPattern: '/frames/assembly/desktop/frame-%04d.webp',
    posterFrame: '/frames/assembly/desktop/frame-0001.webp',
    maxWidth: DESKTOP_MAX_WIDTH,
  },
  mobile: {
    label: 'mobile',
    sourceFile: path.join(PUBLIC_DIR, 'Industrial_animation_assembly_mobile.mp4'),
    sourceVideo: '/Industrial_animation_assembly_mobile.mp4',
    outputDir: path.join(FRAMES_ROOT, 'mobile'),
    pathPattern: '/frames/assembly/mobile/frame-%04d.webp',
    posterFrame: '/frames/assembly/mobile/frame-0001.webp',
    maxWidth: MOBILE_MAX_WIDTH,
  },
};

const FFMPEG_STATIC_PATH = resolveStaticBinaryPath(ffmpegStatic);
const FFPROBE_STATIC_PATH = resolveStaticBinaryPath(ffprobeStatic);

async function main() {
  const ffmpeg = await resolveBinary('ffmpeg');
  const ffprobe = await resolveBinary('ffprobe');

  const desktop = await extractVariant(SOURCES.desktop, ffmpeg, ffprobe);
  const mobile = await extractVariant(SOURCES.mobile, ffmpeg, ffprobe);

  const manifest = {
    desktop: buildManifestEntry(desktop, SOURCES.desktop),
    mobile: buildManifestEntry(mobile, SOURCES.mobile),
  };

  await fs.mkdir(FRAMES_ROOT, { recursive: true });
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  validateManifestAgainstFiles(manifest, desktop.files, mobile.files);

  console.log(`Wrote ${MANIFEST_PATH}`);
}

async function extractVariant(config, ffmpeg, ffprobe) {
  if (!existsSync(config.sourceFile)) {
    throw new Error(`Source video not found: ${config.sourceFile}`);
  }

  await fs.rm(config.outputDir, { recursive: true, force: true });
  await fs.mkdir(config.outputDir, { recursive: true });

  const filter = `fps=${FPS},scale=w=min(${config.maxWidth}\\,iw):h=-2`;
  const outputPattern = path.join(config.outputDir, 'frame-%04d.webp');

  await runCommand(ffmpeg, [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    config.sourceFile,
    '-an',
    '-sn',
    '-dn',
    '-vf',
    filter,
    '-start_number',
    '1',
    '-c:v',
    'libwebp',
    '-quality',
    '82',
    '-compression_level',
    '6',
    outputPattern,
  ]);

  const files = await listFrameFiles(config.outputDir);
  if (files.length === 0) {
    throw new Error(`No frames were extracted for ${config.label} from ${config.sourceFile}`);
  }

  const firstFramePath = path.join(config.outputDir, files[0]);
  const dimensions = await probeImageDimensions(ffprobe, firstFramePath);

  const expectedFiles = Array.from({ length: files.length }, (_, index) =>
    `frame-${String(index + 1).padStart(4, '0')}.webp`
  );
  for (let index = 0; index < expectedFiles.length; index += 1) {
    if (files[index] !== expectedFiles[index]) {
      throw new Error(
        `Unexpected frame sequence in ${config.outputDir}: expected ${expectedFiles[index]}, found ${files[index] ?? '(missing)'}`
      );
    }
  }

  return {
    frameCount: files.length,
    width: dimensions.width,
    height: dimensions.height,
    files,
  };
}

function buildManifestEntry(result, config) {
  return {
    frameCount: result.frameCount,
    fps: FPS,
    width: result.width,
    height: result.height,
    posterFrame: config.posterFrame,
    pathPattern: config.pathPattern,
    sourceVideo: config.sourceVideo,
  };
}

function validateManifestAgainstFiles(manifest, desktopFiles, mobileFiles) {
  validateEntry(manifest.desktop, desktopFiles, 'desktop');
  validateEntry(manifest.mobile, mobileFiles, 'mobile');
}

function validateEntry(entry, files, label) {
  if (entry.frameCount !== files.length) {
    throw new Error(`Manifest mismatch for ${label}: frameCount=${entry.frameCount}, files=${files.length}`);
  }

  const expectedFirst = 'frame-0001.webp';
  const expectedLast = `frame-${String(entry.frameCount).padStart(4, '0')}.webp`;
  if (files[0] !== expectedFirst || files[files.length - 1] !== expectedLast) {
    throw new Error(`Manifest mismatch for ${label}: frame sequence is not contiguous`);
  }
}

async function listFrameFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /^frame-\d{4}\.webp$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en'));
}

async function probeImageDimensions(ffprobe, filePath) {
  const { stdout } = await runCommand(ffprobe, [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-of',
    'json',
    filePath,
  ]);

  const parsed = JSON.parse(stdout);
  const stream = parsed?.streams?.[0];
  if (!stream?.width || !stream?.height) {
    throw new Error(`Could not read frame dimensions from ${filePath}`);
  }

  return { width: stream.width, height: stream.height };
}

async function resolveBinary(name) {
  const bundledCandidates = [];
  if (name === 'ffmpeg' && FFMPEG_STATIC_PATH) {
    bundledCandidates.push(FFMPEG_STATIC_PATH);
  }
  if (name === 'ffprobe' && FFPROBE_STATIC_PATH) {
    bundledCandidates.push(FFPROBE_STATIC_PATH);
  }

  for (const candidate of bundledCandidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  const localCandidates = [
    path.join(ROOT_DIR, 'tools', 'ffmpeg', 'bin', `${name}.exe`),
    path.join(ROOT_DIR, 'tools', 'ffmpeg', 'bin', name),
  ];

  for (const candidate of localCandidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  if (await canRunFromPath(name)) {
    return name;
  }

  throw new Error(
    `Required binary not found: ${name}. Ensure ${name}-static is installed, or add ${name} to PATH, or place it in tools\\ffmpeg\\bin\\${name}.exe`
  );
}

function resolveStaticBinaryPath(candidate) {
  if (!candidate) {
    return null;
  }
  if (typeof candidate === 'string') {
    return candidate;
  }
  if (typeof candidate === 'object' && typeof candidate.path === 'string') {
    return candidate.path;
  }
  return null;
}

async function canRunFromPath(name) {
  try {
    await runCommand(name, ['-version']);
    return true;
  } catch {
    return false;
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString('utf8');
    });

    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString('utf8');
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      const message = stderr.trim() || `Command failed: ${command} ${args.join(' ')}`;
      reject(new Error(message));
    });
  });
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
}
