import InfoTooltip from '@/components/ui/InfoTooltip';

import { Suspense } from 'react';
import SettlementHistoryContent from './settlement-history-content';

export default function SettlementHistory() {
  return (
    <>
      <h2 className="text-headline-1 font-bold text-label-normal">
        정산 내역
      </h2>
      <Suspense>
        <SettlementHistoryContent />
      </Suspense>
    </>
  );
}
