'use client';

import { InlineWidget } from 'react-calendly';

interface Props {
  url: string;
}

export default function CalendlyEmbed({ url }: Props) {

  return (
    <div className="w-[350px] h-[410px] rounded-xl overflow-hidden bg-white/90">
      <InlineWidget
        url={url}
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
