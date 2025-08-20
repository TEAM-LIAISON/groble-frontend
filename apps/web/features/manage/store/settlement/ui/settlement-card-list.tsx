import { useQuery } from '@tanstack/react-query';
import SettlementCard from './settlement-card';
import { getSettlementData } from '../api/get-settlement-data';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import MakerCertficationBubble from '@/entities/maker/ui/maker-certfication-bubble';

export default function SettlementCardList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['settlementPage'],
    queryFn: () => getSettlementData(),
  });
  const totalSettlementAmount = data?.data.totalSettlementAmount;
  const currentMonthSettlementAmount = data?.data.currentMonthSettlementAmount;
  const verificationStatus = data?.data.verificationStatus !== 'VERIFIED';

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="medium" color="text-gray-500" />
        </div>
      ) : (
        <>
          {verificationStatus && <MakerCertficationBubble />}
          <div className="grid md:grid-cols-2 space-y-3 md:space-y-0 md:space-x-3 w-full">
            {/* 누적 정산 금액 */}
            <SettlementCard
              title="누적 정산 금액"
              amount={totalSettlementAmount}
            />

            {/* 예정 정산 금액 */}
            <SettlementCard
              title="정산 예정 금액"
              amount={currentMonthSettlementAmount}
            />
          </div>
        </>
      )}
    </>
  );
}
