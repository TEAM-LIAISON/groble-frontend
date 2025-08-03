/* Oid 생성 함수 (페이플 공식 예시 참고)
 * 리턴 예시: groble202312251703511234567
 */
export const createOid = () => {
  const now_date = new Date();
  const now_year = now_date.getFullYear();
  let now_month: number | string = now_date.getMonth() + 1;
  now_month = now_month < 10 ? `0${now_month}` : now_month;
  let now_day: number | string = now_date.getDate();
  now_day = now_day < 10 ? `0${now_day}` : now_day;
  const datetime = now_date.getTime();
  return `groble${now_year}${now_month}${now_day}${datetime}`;
};
