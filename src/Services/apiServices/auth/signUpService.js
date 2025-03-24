import { signUpApi } from "../../apiHelpers";

export const signUpUserService = async (data) => {
    try {
        return await signUpApi(data);
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};
