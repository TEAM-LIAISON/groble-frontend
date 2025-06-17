import WebHeader from '@/components/(improvement)/layout/header';
import ContentListPage from '@/features/category/components/content-list-page';
import { CategorySearchParams } from '@/features/category/types/search-params';

interface CoachPageProps {
  searchParams: CategorySearchParams;
}

export default async function CoachPage({ searchParams }: CoachPageProps) {
  return (
    <>
      <WebHeader mobileTitle="코칭" mobileBack="back" />
      <ContentListPage
        contentType="COACHING"
        searchParams={searchParams}
        title="코칭"
      />
    </>
  );
}
