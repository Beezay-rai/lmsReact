import { bookApi } from "../../apiHelpers";


export const getAllBooks = async () => {
    let response = await bookApi(
        "GET",
        ""
    );
    return response;
};

export const createBook = async (data) => {
    let response = await bookApi(
        "POST",
        "",
        data
    );
    return response;

}


export const updateBook = async (id, data) => {
    let response = await bookApi(
        "PUT",
        "/" + id,
        data
    );
    return response;
}

export const deleteBook = async (id) => {

    let response = await bookApi(
        "DELETE",
        "/" + id,
    );
    return response

}

export const getBookById = async (id) => {
    let response = await bookApi(
        "GET",
        "/" + id,
    )
    return response
}