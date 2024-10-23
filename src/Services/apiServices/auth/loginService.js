import { authApi } from "../../apiHelpers"
import apiUrls from "../../apiUrls"

export const loginUser = async (data)=>{
    debugger;
    let response =  await authApi(
        apiUrls.auth.loginUser.method,
        apiUrls.auth.loginUser.url,
        data
    );
    return response;
}