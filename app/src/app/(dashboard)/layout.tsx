import Navbar from "@/components/navbar";
import Sidebar  from "@/components/sidebar";
import { ToasterProvider } from "@/components/toaster.provider";
import { CrispProvider } from "@/components/crisp-provider";
const DashboardLayout = ({ children
}: {
    children: React.ReactNode;
}) => {
    return (
        <html>
            <CrispProvider />
            <body>
            <div className="h-full relative">
                <div className="hidden h-full md:flex md:w-75 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                    <div>
                        <Sidebar />
                    </div>
                </div>
                <main className="md:pl-72">
                    <Navbar />
                    {children}
                </main>
            </div>
            </body>
        </html>
    )
}

export default DashboardLayout;