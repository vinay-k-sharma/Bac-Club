
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {     
    return (
        <html className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-28">
      
        <body >{children}</body>
      </html>
    );
  }