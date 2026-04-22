# Performance Baseline (2026-04-22)

## Scope
- Route: /
- Build toolchain: next build (Next 16.2.4)
- Environment: local production build/start

## Measured Baseline
- Client JS in `.next/static/chunks`: 795523 bytes raw (~202755 bytes gzip initial modern route load).
- Main home client chunk `187-h_3_an18o.js`: 169227 bytes raw, 58045 bytes gzip.
- Home RSC payload `.next/server/app/index.rsc`: 24686 bytes raw, 7168 bytes gzip.
- Public media inventory:
  - `public/site-images`: 27329742 bytes (12 files)
  - `public/frames/assembly/desktop`: 7394682 bytes (192 frames)
  - `public/frames/assembly/mobile`: 6964290 bytes (192 frames)
  - hero videos total (`Industrial_animation_assembly*.mp4`): 10652947 bytes
- Public static cache headers (direct files): `Cache-Control: public, max-age=0`.
- Home HTML contains image preload for desktop-only hero side image due `priority`.

## Acceptance Targets
- Reduce main home chunk to <= 90000 bytes raw.
- Reduce initial modern JS gzip from ~202755 bytes to <= 140000 bytes.
- Remove desktop-only hero image preload from mobile-first startup path.
- Add CDN-focused cache policy for static media via Next headers (Vercel).
