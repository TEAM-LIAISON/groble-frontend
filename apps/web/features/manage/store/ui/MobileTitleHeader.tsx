interface MobileTitleHeaderProps {
  title: string;
}

export default function MobileTitleHeader({ title }: MobileTitleHeaderProps) {
  return (
    <header className="w-full px-5 py-[17px]">
      <h1 className="text-headline-1 font-bold text-[#1D212C]">{title}</h1>
    </header>
  )
}