import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <div className="mobile-theme-toggle lg:hidden fixed top-4 right-4 z-50 w-28">
        <ThemeToggle />
      </div>
    </>
  );
}
