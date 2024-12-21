import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between font-inter">
          <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-sky-1 max-lg:hidden">
            <div>
              <Image src='/purpleback.jpg' alt='auth image'  layout="fill"/>
            </div>
          </div>
          {children}
      </main>
    );
  }