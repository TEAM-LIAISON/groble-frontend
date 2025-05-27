import ContentListPage from "@/features/category/components/content-list-page";
import { CategorySearchParams } from "@/features/category/types/search-params";

interface CoachPageProps {
  searchParams: CategorySearchParams;
}

export default async function CoachPage({ searchParams }: CoachPageProps) {
  return (
    <ContentListPage
      contentType="COACHING"
      searchParams={searchParams}
      title="코칭"
    />
  );
}
