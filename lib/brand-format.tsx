import { Fragment, type ReactNode } from "react";

const LEGACY_BRAND_NAME = "Plasmaster";
export const BRAND_NAME = "PlasMASTER";

export function renderBrandText(text: string): ReactNode {
  const segments = text.split(LEGACY_BRAND_NAME);

  if (segments.length === 1) {
    return text;
  }

  return segments.map((segment, index) => (
    <Fragment key={index}>
      {index > 0 ? <strong>{BRAND_NAME}</strong> : null}
      {segment}
    </Fragment>
  ));
}
