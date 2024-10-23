import { bookApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const bookService = async ()=>{
    let response = await bookApi(
        apiUrls.book.book.method,
        apiUrls.book.book.url
    );
    return response;
};

export const createBookService = async (data)=>{
    let response = await bookApi(
        apiUrls.book.createBook.method,
        apiUrls.book.createBook.url,
        data
    );
    return response;

}


export const editBookService = async(data)=>{
    let response = await bookApi(
        apiUrls.book.editBook.method,
        apiUrls.book.editBook.url ,
        data
    );
    return response;
}

export const deleteBookService = async(id)=>{
    debugger
    let response = await bookApi(
        apiUrls.book.deleteBook.method,
        apiUrls.book.deleteBook.url +"?id="+id,
    );
    return response

}

export const bookByIdService = async (id)=>{
    let response = await bookApi(
        apiUrls.book.bookById.method,
        apiUrls.book.bookById.url+"?id="+id ,
        
    )
    return response
}