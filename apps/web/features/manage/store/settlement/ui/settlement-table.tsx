import Pagination from '@/shared/ui/Pagination';
import { SettlementHistory } from '../types/settlement-types';
import SettlementTableHeader from './settlement-table-header';
import SettlementTableRows from './settlement-table-rows';
import { PageInfo } from '@/lib/api';

type Props = {
  items: SettlementHistory[];
  pageInfo: PageInfo;
};

export default function SettlementTable({ items, pageInfo }: Props) {
  return (
    <>
      <div className="mt-3 overflow-x-auto ">
        <SettlementTableHeader />
        <SettlementTableRows items={items} />
      </div>
      {pageInfo?.totalPages && pageInfo.totalPages > 1 && (
        <div className="mt-3">
          <Pagination
            currentPage={(pageInfo.currentPage ?? 0) + 1}
            totalPages={pageInfo.totalPages ?? 0}
          />
        </div>
      )}
    </>
  );
}
