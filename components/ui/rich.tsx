import { Fragment } from "react";

/** Renders copy where **double-asterisk** spans are target keywords, shown in bold. */
export function Rich({ text, strongClassName = "font-semibold text-foreground" }: { text: string; strongClassName?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={strongClassName}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
