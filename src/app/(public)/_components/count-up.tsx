type StatProps = {
  label: string;
  end: number;
  suffix?: string;
};

export default function CountUp({ label, end, suffix = "" }: StatProps) {
  return (
    <div className="flex flex-col items-start">
      <span
        className="count-up text-2xl min-[478px]:text-3xl md:text-[36px] font-medium text-cyan-500"
        style={{ "--num": end } as React.CSSProperties}
        data-suffix={suffix}
        aria-hidden="true"
      />
      <span className="sr-only">
        {end}
        {suffix} {label}
      </span>
      <span className="w-max text-xs min-[478px]:text-sm text-black">
        {label}
      </span>
    </div>
  );
}
