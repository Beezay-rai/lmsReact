import { bookCategoryApi } from "../../apiHelpers";

export const getAllBookCategoryService = async () => {
    let response = await bookCategoryApi(
    );  
    return response;
};

export const createBookCategoryService = async (data) => {
    let response = await bookCategoryApi(
        "POST",
        "",
        data
    );
    return response;

}


export const editBookCategoryService = async (id, data) => {
    let response = await bookCategoryApi(
        "PUT",
        "/" + id,
        data
    );
    return response;
}

export const deleteBookCategoryService = async (id) => {

    let response = await bookCategoryApi(
        "DELETE",
        "/" + id,
    );
    return response

}

export const bookCategoryByIdService = async (id) => {
    let response = await bookCategoryApi(
       "GET",
        "/" + id,
    )
    return response
}