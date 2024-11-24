import {  googleLoginApi, googleSignUpApi } from "../../apiHelpers"
import apiUrls from "../../apiUrls"

export const googleLogin = async (data)=>{
    ;
    let response =  await googleLoginApi(
        apiUrls.auth.googleLogin.method,
        apiUrls.auth.googleLogin.url+"?token="+data,
        
    );
    return response;
}
export const googleSignUp = async (data)=>{
    ;
    let response =  await googleSignUpApi(
        apiUrls.auth.googleSignUpApi.method,
        apiUrls.auth.googleSignUpApi.url,
        data
    );
    return response;
}