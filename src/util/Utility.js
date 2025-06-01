import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/admin/Layout";
import UserLayout from "../components/layout/user/UserLayout";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshTokenService } from "../services/apiServices/auth/refreshTokenService";
import { logout, updateToken } from "../redux/appSlices";

export const checkTokenValidity = (token) => {
  try {
    if (token) {
      const decodedAccessToken = jwtDecode(token);
      const currentTime = Date.now();
      if (decodedAccessToken.exp * 1000 < currentTime) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userDetail);
  const access_token = userData?.user?.access_token;
  const refresh_token = userData?.user?.refresh_token;
  const isAccessTokenValid = checkTokenValidity(access_token);
  const isRefreshTokenValid = checkTokenValidity(refresh_token);
  useEffect(() => {
    const validateTokens = async () => {
      if (!isAccessTokenValid && isRefreshTokenValid) {
        const response = await refreshTokenService(refresh_token);
        if (response && response.access_token) {
          dispatch(updateToken(response));
        } else {
          dispatch(logout());
          navigate("/login");
        }
      } else if (!isAccessTokenValid && !isRefreshTokenValid) {
        dispatch(logout());
        navigate("/login");
      }
    };
    validateTokens();
  }, [navigate]);

  return userData.user ? (
    userData.user?.role !== "User" ? (
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
