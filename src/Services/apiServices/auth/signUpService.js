import { signUpApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const signUp = async (data) => {
    let response =await signUpApi(
        apiUrls.auth.signUp.method,
        apiUrls.auth.signUp.url,
        data
    )
    return response
}


