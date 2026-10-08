import { CategoryPage, categoryMetadata } from "@/components/treatments/category-page";

export const metadata = categoryMetadata("skin");

export default function Page() {
  return <CategoryPage group="skin" />;
}
