import { googleLoginApi, googleSignUpApi as googleSignUpApi } from "../../apiHelpers"

export const googleLoginService = async (data) => {
    ;
    let response = await googleLoginApi(
        "",
        "?token=" + data,

    );
    return response;
}
export const googleSignUpService = async (data) => {
    ;
    let response = await googleSignUpApi(
        "POST",
        "",
        data
    );
    return response;
}