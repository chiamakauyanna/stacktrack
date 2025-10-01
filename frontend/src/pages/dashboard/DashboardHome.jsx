import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-700">Here you’ll see your projects, stats, and updates.</p>
    </DashboardLayout>
  );
};

export default DashboardHome;
