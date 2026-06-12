type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, text, center }: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-tight tracking-[0] text-[#082f49] sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p> : null}
    </div>
  );
}
