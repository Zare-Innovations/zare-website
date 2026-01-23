'use client';

import { InlineWidget } from 'react-calendly';

interface Props {
  url: string;
}

export default function CalendlyEmbed({ url }: Props) {
  // Using colors consistent with call-booking date picker styling:
  // - Background: black (#000000) - matches bg-black
  // - Text: white (#ffffff) - matches text-white
  // - Primary: #44D1F2 (rgba(68, 209, 242)) - matches the cyan color used in date picker hover/selected states
  const themedUrl =
    `${url}` +
    `?background_color=000000` +
    `&text_color=ffffff` +
    `&primary_color=44D1F2`;

  return (
    <div className="w-[350px] h-[40px] rounded-xl overflow-hidden bg-black">
      <InlineWidget
        url={themedUrl}
        styles={{
          height: '100%',
          width: '100%',
        }}
        pageSettings={{
          hideEventTypeDetails: true,
          hideGdprBanner: true,
        }}
      />
    </div>
  );
}
