import { CategoryPage, categoryMetadata } from "@/components/treatments/category-page";

export const metadata = categoryMetadata("dental");

export default function Page() {
  return <CategoryPage group="dental" />;
}
