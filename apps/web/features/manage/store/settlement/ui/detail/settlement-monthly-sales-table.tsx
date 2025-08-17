import { PageInfo } from '@/lib/api';
import { SettlementMonthlySalesHistoryItem } from '../../types/settlement-detail-types';
import SettlementMonthlySalesTableHeader from './settlement-monthly-sales-table-header';
import SettlementMonthlySalesTableRows from './settlement-monthly-sales-table-rows';
import Pagination from '@/shared/ui/Pagination';

type Props = {
  items: SettlementMonthlySalesHistoryItem[];
  pageInfo: PageInfo;
};

export default function SettlementMonthlySalesTable({
  items,
  pageInfo,
}: Props) {
  return (
    <>
      <div className="mt-3 overflow-x-auto ">
        <SettlementMonthlySalesTableHeader />
        <SettlementMonthlySalesTableRows items={items} />
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
