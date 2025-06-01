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




export const editStudentService = async(id,data)=>{
    let response = await studentApi(
      "PUT",
        "/"+id,
        data
    );
    return response;
}

export const deleteStudentService = async(id)=>{
    
    let response = await studentApi(
      "DELETE",
      "/"+id,
    );
    return response

}

export const studentByIdService = async (id)=>{
    let response = await studentApi(
      "GET",
       "/"+id ,
        null
    )
    return response
}