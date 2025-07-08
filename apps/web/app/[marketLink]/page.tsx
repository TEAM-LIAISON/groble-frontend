import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WebHeader from '@/components/(improvement)/layout/header';
import {
  MakerSection,
  RepresentativeContentSection,
  ContentListSection,
} from '@/features/market/ui';
import {
  getMarketIntro,
  getMarketContents,
} from '@/features/market/api/marketApi';

interface MarketPageProps {
  params: {
    marketLink: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({
  params,
}: MarketPageProps): Promise<Metadata> {
  try {
    const { marketLink } = await params;
    const marketData = await getMarketIntro(marketLink);

    return {
      title: `${marketData.data.marketName} - 그로블`,
      description: `${marketData.data.marketName}에서 다양한 콘텐츠를 만나보세요.`,
    };
  } catch {
    return {
      title: '마켓을 찾을 수 없습니다 - Groble',
    };
  }
}

export default async function MarketPage({
  params,
  searchParams,
}: MarketPageProps) {
  try {
    const { marketLink } = await params;
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page ?? '1') - 1; // 0부터 시작

    // 병렬로 데이터 페칭
    const [marketIntroData, contentsData] = await Promise.all([
      getMarketIntro(marketLink),
      getMarketContents({
        marketLinkUrl: marketLink,
        page: currentPage,
        size: 24,
        sort: 'createdAt',
      }),
    ]);

    return (
      <>
        <WebHeader mobileBack="back" />
        <section className="flex w-full flex-col items-center pb-20 lg:pb-9">
          <div className="flex w-full max-w-[1080px] flex-col gap-9 px-5 xl:px-0 pt-9">
            {/* 메이커 섹션 */}
            <MakerSection marketData={marketIntroData.data} />

            {/* 대표 콘텐츠 */}
            <RepresentativeContentSection
              content={marketIntroData.data.representativeContent}
            />

            {/* 콘텐츠 리스트 */}
            <ContentListSection
              contentsData={contentsData.data}
              marketLinkUrl={marketLink}
            />
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('마켓 페이지 로딩 에러:', error);
    notFound();
  }
}
