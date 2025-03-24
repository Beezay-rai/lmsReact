import { categoryApi } from "../../apiHelpers";

export const categoryService = async () => {
    let response = await categoryApi(
        "",
        ""
    );  
    return response;
};

export const createCategoryService = async (data) => {
    let response = await categoryApi(
        "",
        "",
        data
    );
    return response;

}


export const editCategoryService = async (id, data) => {
    let response = await categoryApi(
        "",
        "/" + id,
        data
    );
    return response;
}

export const deleteCategoryService = async (id) => {

    let response = await categoryApi(
        "",
        "/" + id,
    );
    return response

}

export const categoryByIdService = async (id) => {
    let response = await categoryApi(
       "GET",
        "/" + id,
    )
    return response
}