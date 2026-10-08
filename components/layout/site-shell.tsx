import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; parent?: { label: string; href: string } };

/**
 * Page body. Header, footer and the WhatsApp shortcut live in the root layout;
 * inner pages get a breadcrumb under the fixed header.
 */
export function SiteShell({ children, crumb }: { children: React.ReactNode; crumb?: Crumb }) {
  return (
    <main
      id="main"
      className={crumb ? "pt-[4.5rem] [&>section:first-of-type]:!pt-10 md:[&>section:first-of-type]:!pt-14" : ""}
    >
      {crumb && (
        <nav aria-label="Breadcrumb" className="container-x pt-8 md:pt-10">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="link-underline hover:text-foreground">
                Home
              </Link>
            </li>
            {crumb.parent && (
              <>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href={crumb.parent.href} className="link-underline hover:text-foreground">
                    {crumb.parent.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="line-clamp-1 text-foreground">
              {crumb.label}
            </li>
          </ol>
        </nav>
      )}
      {children}
    </main>
  );
}
