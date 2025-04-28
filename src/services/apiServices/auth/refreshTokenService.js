import { refreshTokenApi } from "../../apiHelpers";

export const refreshTokenService = async (refreshToken) => {
  try {
    return await refreshTokenApi(refreshToken);
  } catch (error) {
    console.error("Refresh token error:", error);
  }
};
