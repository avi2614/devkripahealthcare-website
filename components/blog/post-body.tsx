import Link from "next/link";
import { Fragment } from "react";

type Block = { type: "h2"; text: string; id: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Parses the lightweight markup described in data/blog.ts. */
export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of body.trim().split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (lines[0].startsWith("## ")) {
      const text = lines[0].slice(3);
      blocks.push({ type: "h2", text, id: slugify(text) });
    } else if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

/** Inline **bold** and [text](href). */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*(.+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-foreground">{bold[1]}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <Link key={i} href={link[2]} className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              {link[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-[1.075rem] leading-[1.85] text-foreground/85">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} id={b.id} className="display scroll-mt-28 pt-6 text-3xl text-foreground md:text-[2.1rem]">
              {b.text}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-accent">
              {b.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <Inline text={b.text} />
          </p>
        );
      })}
    </div>
  );
}
