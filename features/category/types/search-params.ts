export interface CategorySearchParams {
  categoryId?: string;
  page?: string;
  sort?: string;
  [key: string]: string | string[] | undefined;
}
