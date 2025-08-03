import Footer from '@/components/(improvement)/layout/footer';
import WebHeader from '@/components/(improvement)/layout/header';
import {
  getMarketContents,
  getMarketIntro,
} from '@/features/market/api/marketApi';
import {
  ContentListSection,
  MakerSection,
  RepresentativeContentSection,
} from '@/features/market/ui';
import NoContent from '@/shared/ui/NoContent';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
        size: 12,
        sort: 'createdAt',
      }),
    ]);

    // 콘텐츠 존재 여부 확인
    const hasRepresentativeContent =
      !!marketIntroData.data.representativeContent;
    const hasContentsList = contentsData.data.items.length > 0;
    const hasAnyContent = hasRepresentativeContent || hasContentsList;

    return (
      <>
        <WebHeader mobileBack="back" />
        <section className="flex w-full flex-col items-center pb-20 lg:pb-9">
          <div className="flex w-full max-w-[1080px] flex-col  px-5 xl:px-0 md:pt-9">
            {/* 메이커 섹션 */}
            <MakerSection marketData={marketIntroData.data} />

            {hasAnyContent ? (
              <>
                {/* 대표 콘텐츠 */}
                <RepresentativeContentSection
                  content={marketIntroData.data.representativeContent}
                />

                {/* 콘텐츠 리스트 */}
                <ContentListSection
                  contentsData={contentsData.data}
                  marketLinkUrl={marketLink}
                />
              </>
            ) : (
              /* 콘텐츠가 없을 때 메시지 */
              <NoContent
                message="아직 등록된 콘텐츠가 없어요"
                className="py-[3.5rem]"
              />
            )}
          </div>
        </section>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('마켓 페이지 로딩 에러:', error);
    notFound();
  }
}
