import { categoryApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const categoryService = async ()=>{
    let response = await categoryApi(
        apiUrls.category.category.method,
        apiUrls.category.category.url
    );
    return response;
};

export const createCategoryService = async (data)=>{
    let response = await categoryApi(
        apiUrls.category.createCategory.method,
        apiUrls.category.createCategory.url,
        data
    );
    return response;

}


export const editCategoryService = async(data)=>{
    let response = await categoryApi(
        apiUrls.category.editCategory.method,
        apiUrls.category.editCategory.url ,
        data
    );
    return response;
}

export const deleteCategoryService = async(id)=>{
    debugger
    let response = await categoryApi(
        apiUrls.category.deleteCategory.method,
        apiUrls.category.deleteCategory.url +"?id="+id,
    );
    return response

}

export const categoryByIdService = async (id)=>{
    let response = await categoryApi(
        apiUrls.category.categoryById.method,
        apiUrls.category.categoryById.url+"?id="+id ,
        
    )
    return response
}