import { transactionApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const transactionService = async ()=>{
    let response = await transactionApi(
        apiUrls.transaction.transaction.method,
        apiUrls.transaction.transaction.url
    );
    return response;
};

export const createTransactionService = async (data)=>{
    let response = await transactionApi(
        apiUrls.transaction.createtransaction.method,
        apiUrls.transaction.createtransaction.url,
        data
    );
    return response;
}

export const returnTransactionService = async (id,status)=>{
    let response = await transactionApi(
        apiUrls.transaction.returnIssuedbook.method,
        apiUrls.transaction.returnIssuedbook.url+"?id="+id+"&status="+status,
    );
    return response;
}

export const transactionByIdService = async (id)=>{
    let response = await transactionApi(
        apiUrls.transaction.transactionById.method,
        apiUrls.transaction.transactionById.url+"?id="+id ,
        
    )
    return response
}

export const editTransactionService = async(data)=>{
    let response = await transactionApi(
        apiUrls.transaction.edittransaction.method,
        apiUrls.transaction.edittransaction.url ,
        data
    );
    return response;
}

export const deleteTransactionService = async(id)=>{
    let response = await transactionApi(
        apiUrls.transaction.deletetransaction.method,
        apiUrls.transaction.deletetransaction.url +"?id="+id,
    );
    return response

}