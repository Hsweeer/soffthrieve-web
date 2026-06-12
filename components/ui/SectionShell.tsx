import clsx from "clsx";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
};

export function SectionShell({ children, className, id, muted }: SectionShellProps) {
  return (
    <section className={clsx("py-12 sm:py-16 lg:py-20", muted && "bg-[#f8f9fc]", className)} id={id}>
      <div className="container-shell">{children}</div>
    </section>
  );
}
