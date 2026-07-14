interface Props { children: React.ReactNode; }

export default function EnglishLayout({ children }: Readonly<Props>) {
  return <div lang="en">{children}</div>;
}
