import ContentListPage from "@/components/contents/ContentListPage";

type SearchParams = {
  categoryId?: string;
  page?: string;
  sort?: string;
  [key: string]: string | string[] | undefined;
};

export default async function CoachingPage({
  searchParams,
}: {
  params: {};
  searchParams: SearchParams;
}) {
  return (
    <ContentListPage
      contentType="document"
      searchParams={searchParams}
      title="자료"
    />
  );
}
