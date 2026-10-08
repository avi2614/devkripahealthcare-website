import { SiteShell } from "@/components/layout/site-shell";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <SiteShell crumb={{ label: title }}>
      <div className="container-x max-w-3xl py-14 md:py-20">
        <h1 className="display text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-12 space-y-6 text-[1.02rem] leading-[1.8] text-foreground/85 [&_h2]:display [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </SiteShell>
  );
}
