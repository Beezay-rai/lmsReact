import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../components/layout/admin/Layout";
import UserLayout from "../components/layout/user/UserLayout";
export const PrivateRoute = () => {
  const userData = useSelector((state) => state.userDetail);

  return userData.user?.status === true ? (
    userData.user?.data.role !== "User" ? (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    ) : (
      <UserLayout>
        <Outlet />
      </UserLayout>
    )
  ) : (
    <Navigate to="/login" />
  );
};
