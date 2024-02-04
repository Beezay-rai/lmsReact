import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";
import UserLayout from "../Components/layout/UserLayout/userLayout";
import Layout from "../Components/layout/AdminLayout/Layout";
export const PrivateRoute =({component:Component}) =>{
    const userData = useSelector((state)=>state.userDetail);


    return (
        userData.user?.status === true ? (
            userData.user?.data.role !== "User" ? (
                <Layout>
                    <Outlet />
                </Layout>
            ) : (<UserLayout />)

        ) : (
            <Navigate to="/login"/>
        )
    )

}