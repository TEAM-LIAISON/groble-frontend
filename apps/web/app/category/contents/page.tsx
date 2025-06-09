import ContentListPage from "@/features/category/components/content-list-page";
import { CategorySearchParams } from "@/features/category/types/search-params";

interface ContentsPageProps {
  searchParams: CategorySearchParams;
}

export default function CoachingPage({ searchParams }: ContentsPageProps) {
  return (
    <ContentListPage
      contentType="DOCUMENT"
      searchParams={searchParams}
      title="자료"
    />
  );
}
