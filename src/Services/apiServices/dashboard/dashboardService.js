import { dashboardApi } from "../../apiHelpers"
import apiUrls from "../../apiUrls"

export const dashboardService = async () => {
    let response = await dashboardApi(
        apiUrls.dashboard.dashboard.method,
        apiUrls.dashboard.dashboard.url
    )
    return response
}