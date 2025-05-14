import ContentListPage from "@/components/contents/ContentListPage";

type SearchParams = {
  categoryId?: string;
  page?: string;
  sort?: string;
  [key: string]: string | string[] | undefined;
};

export default async function DocumentPage({
  searchParams,
}: {
  params: {};
  searchParams: SearchParams;
}) {
  return (
    <ContentListPage
      contentType="document"
      searchParams={searchParams}
      title="자료 목록"
    />
  );
}
