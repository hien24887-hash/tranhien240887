import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <header className="page-banner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <main className="page-content">{children}</main>
    </>
  );
}
