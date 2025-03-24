import { studentApi } from "../../apiHelpers";

export const studentService = async ()=>{
    let response = await studentApi(
     "GET",
        ""
    );
    return response;
};

export const createStudentService = async (data)=>{
    let response = await studentApi(
       "POST",
        "",
        data
    );
    return response;
}




export const editStudentService = async(data,id)=>{
    let response = await studentApi(
      "PUT",
        "/"+id,
        data
    );
    return response;
}

export const deleteStudentService = async(id)=>{
    
    let response = await studentApi(
      "Delete",
      "/="+id,
    );
    return response

}

export const studentByIdService = async (id)=>{
    let response = await studentApi(
      "GET",
       "/"+id ,
        
    )
    return response
}