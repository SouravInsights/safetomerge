import { checkIsAdmin, getContributions } from "@/app/actions/admin";
import { AdminDashboard } from "./admin-dashboard";
import { AdminLogin } from "./admin-login";

export const metadata = {
  title: "Admin Dashboard | Safe to Merge",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    return <AdminLogin />;
  }

  const data = await getContributions();

  return <AdminDashboard initialData={data} />;
}
