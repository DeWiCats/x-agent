export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full flex overflow-hidden">{children}</main>;
}
