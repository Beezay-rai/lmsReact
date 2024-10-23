import { commonApi } from "../../apiHelpers"
import apiUrls from "../../apiUrls"

export const UserListSerivce = async ()=>{
    let response = await commonApi(
        apiUrls.common.userList.method,
        apiUrls.common.userList.url
    );
    return response
}