export const BOOK_EVENT = "devkripa:book";

export type BookEventDetail = { treatmentId?: string; consultation?: "dental" | "skin" | "hair" | "general" };

/**
 * Preselect a treatment in the booking form. If the form is on this page, hand it over
 * and scroll to it; otherwise go to the booking page with the choice in the URL.
 */
export function requestBooking(detail: BookEventDetail, navigate: (url: string) => void) {
  if (document.getElementById("book")) {
    window.dispatchEvent(new CustomEvent<BookEventDetail>(BOOK_EVENT, { detail }));
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const q = new URLSearchParams();
  if (detail.consultation) q.set("consultation", detail.consultation);
  if (detail.treatmentId) q.set("treatment", detail.treatmentId);
  navigate(`/book?${q.toString()}`);
}
