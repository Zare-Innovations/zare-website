import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { CaseImage, CaseStudy } from '@/content/work';
import { cn } from '@/lib/utils';

/**
 * Product screenshots carry small UI text, which WebP smears at any lossy
 * setting below 100. Must stay listed in `images.qualities` in next.config.ts.
 */
export const SCREENSHOT_QUALITY = 100;

/** The drawn window bar, px. */
const BAR = 14;
/** Between two windows, px. Matches `gap-4`. */
const GAP = 16;

const ratio = (img: CaseImage) => img.src.width / img.src.height;

/** What a card shows: the case's chosen cover, else its first screenshot. */
export function coverShots(caseStudy: CaseStudy): CaseImage[] {
  const cover = caseStudy.cover ?? caseStudy.images?.[0];
  return cover ? [cover] : [];
}

/**
 * Screenshots shown whole, never cropped: each in a drawn browser window on a
 * light stage, as large as the stage allows.
 *
 * The stage is a size container, so the windows are sized from its box in
 * CSS alone: every window shares one image height — the stage's height less
 * the bar, unless the row would then be wider than the stage — and takes the
 * width its own aspect ratio gives it. The stage must get its size from its
 * context (an aspect ratio, or a stretched grid row); its content does not
 * size it.
 *
 * `fitShape` lets the stage take its shape from the shots where it stands
 * alone in its row: a 3:1 site banner in a 16:10 stage is a strip in a field
 * of grey. Clamped to 1:1–2.6:1 on phones, which scroll and can afford a tall
 * frame, and to 16:10–2.6:1 at lg, where it sits beside the copy. Cards that
 * sit side by side leave it off so they stay one height.
 */
export function ScreenshotStage({
  shots,
  sizes,
  fitShape = false,
  className,
}: {
  shots: CaseImage[];
  sizes: string;
  fitShape?: boolean;
  className?: string;
}) {
  const total = shots.reduce((sum, s) => sum + ratio(s), 0);
  const shape = (min: number) => Math.min(Math.max(total, min), 2.6);
  const gaps = GAP * (shots.length - 1);
  const imageHeight = `min(100cqh - ${BAR}px, (100cqw - ${gaps}px) / ${total})`;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 bg-surface-mist p-4 [container-type:size] sm:p-6',
        fitShape && '[aspect-ratio:var(--shape)] lg:[aspect-ratio:var(--shape-lg)]',
        className,
      )}
      style={
        fitShape
          ? ({ '--shape': shape(1), '--shape-lg': shape(1.6) } as CSSProperties)
          : undefined
      }
    >
      {shots.map((s) => (
        <div
          key={s.src.src}
          className="flex shrink-0 flex-col overflow-hidden border border-rule-light bg-surface-paper"
          style={{ width: `calc(${ratio(s)} * ${imageHeight})` }}
        >
          <div
            aria-hidden
            className="flex shrink-0 items-center gap-1 border-b border-rule-light px-2"
            style={{ height: BAR }}
          >
            <span className="h-[5px] w-[5px] rounded-full bg-rule-light" />
            <span className="h-[5px] w-[5px] rounded-full bg-rule-light" />
            <span className="h-[5px] w-[5px] rounded-full bg-rule-light" />
          </div>
          <Image
            src={s.src}
            alt={s.alt}
            sizes={sizes}
            quality={SCREENSHOT_QUALITY}
            placeholder="blur"
            className="block h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
