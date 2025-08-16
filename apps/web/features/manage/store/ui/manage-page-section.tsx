type ManagePageSectionProps = {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
};

export default function ManagePageSection({
  children,
  className,
  fullHeight,
}: ManagePageSectionProps) {
  return (
    <div>
      <section
        className={`mx-auto bg-white px-5 md:px-9 py-5 md:py-12 md:rounded-xl md:shadow-card ${className} ${
          fullHeight && 'min-h-[calc(100vh-122px)]'
        }`}
      >
        {children}
      </section>
    </div>
  );
}
