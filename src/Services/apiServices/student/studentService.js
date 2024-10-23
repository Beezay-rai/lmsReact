import { studentApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const studentService = async ()=>{
    let response = await studentApi(
        apiUrls.student.student.method,
        apiUrls.student.student.url
    );
    return response;
};

export const createStudentService = async (data)=>{
    let response = await studentApi(
        apiUrls.student.createStudent.method,
        apiUrls.student.createStudent.url,
        data
    );
    return response;
}




export const editStudentService = async(data)=>{
    let response = await studentApi(
        apiUrls.student.editStudent.method,
        apiUrls.student.editStudent.url ,
        data
    );
    return response;
}

export const deleteStudentService = async(id)=>{
    debugger
    let response = await studentApi(
        apiUrls.student.deleteStudent.method,
        apiUrls.student.deleteStudent.url +"?id="+id,
    );
    return response

}

export const studentByIdService = async (id)=>{
    let response = await studentApi(
        apiUrls.student.studentById.method,
        apiUrls.student.studentById.url+"?id="+id ,
        
    )
    return response
}