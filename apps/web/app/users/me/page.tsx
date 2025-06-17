import Header, { Settings } from '@/components/header';
import NavigationBar from '@/components/navigation-bar';
import { getUserMyPageDetail, getUserMyPageSummary } from '@/lib/api';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Detail from './detail/detail';
import SettingList from './settings/setting-list';
import { Summary } from './summary';
import WebHeader from '@/components/(improvement)/layout/header';

export const metadata: Metadata = {
  title: '마이페이지',
};

export default async function SummaryPage() {
  const response = await getUserMyPageSummary(
    // @ts-expect-error
    {}
  );
  console.log(response);

  if (response.status != 200) throw new Error(JSON.stringify(response));

  const detailResponse = await getUserMyPageDetail(
    // @ts-expect-error
    {}
  );

  if (
    detailResponse.status == 200 &&
    detailResponse.data.data?.accountType == 'SOCIAL'
  ) {
    if (!detailResponse.data.data.nickname) redirect('/auth/sign-up/user-type');
  }

  return (
    <div className="flex h-screen flex-col bg-background-alternative md:bg-white">
      <WebHeader />
      <Header
        right={
          <Link href="/users/me/settings">
            <Settings />
          </Link>
        }
      />
      <Summary
        response={response}
        detail={<Detail className="hidden md:mt-[80px] md:flex" />}
        settings={<SettingList className="hidden md:mt-[80px] md:flex" />}
      />
      <NavigationBar />
    </div>
  );
}
