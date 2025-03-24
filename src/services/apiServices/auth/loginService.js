import { authApi } from "../../apiHelpers";

export const loginUserService = async (data) => {
    try {
        return await authApi(data);
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};
