import { commonApi } from "../../../apiHelpers"
import apiUrls from "../../../apiUrls"

export const roleService = async()=>{
    let response = await  commonApi(
        apiUrls.common.role.method,
        apiUrls.common.role.url
    )
    return response
}