import { dashboardApi } from "../../apiHelpers"

export const dashboardService = async () => {
    let response = await dashboardApi(
       "GET"
    )
    return response
}