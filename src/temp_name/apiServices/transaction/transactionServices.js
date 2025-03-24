import { transactionApi } from "../../apiHelpers";

export const transactionService = async ()=>{
    let response = await transactionApi(
        "GET",
       
    );
    return response;
};

export const createTransactionService = async (data)=>{
    let response = await transactionApi(
       "POST",
       "",
        data
    );
    return response;
}

export const returnTransactionService = async (id,status)=>{
    let response = await transactionApi(
       "GET",
        // apiUrls.transaction.returnIssuedbook.url+"?id="+id+"&status="+status,
    );
    return response;
}

export const transactionByIdService = async (id)=>{
    let response = await transactionApi(
        // apiUrls.transaction.transactionById.method,
        // apiUrls.transaction.transactionById.url+"?id="+id ,
        
    )
    return response
}

export const editTransactionService = async(data)=>{
    let response = await transactionApi(
        // apiUrls.transaction.edittransaction.method,
        // apiUrls.transaction.edittransaction.url ,
        data
    );
    return response;
}

export const deleteTransactionService = async(id)=>{
    let response = await transactionApi(
        // apiUrls.transaction.deletetransaction.method,
        "/"+id,
    );
    return response

}