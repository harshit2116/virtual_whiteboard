import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {  return (
    <main className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>      </div>      <div className="h-full relative z-10">
        <div className="flex h-full">
          <div className="hidden lg:block">
            <OrgSidebar />
          </div>
          <div className="flex-1 flex flex-col min-w-0 backdrop-blur-sm">
            <Navbar />
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
