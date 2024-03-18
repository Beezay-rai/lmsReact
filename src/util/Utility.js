import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../Components/layout/Admin/Layout";
import UserLayout from "../Components/layout/User/userLayout";
export const PrivateRoute =() =>{
    const userData = useSelector((state)=>state.userDetail);

    return (
        userData.user?.status === true ? (
            userData.user?.data.role !== "User" ? (
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            ) : (<UserLayout />)

        ) : (
            <Navigate to="/login"/>
        )
    )

}