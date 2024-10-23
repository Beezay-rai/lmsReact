const apiUrls = {
    auth: {
        loginUser: {
            method: "POST",
            url: "/Login"

        },
        signUp:{
            method:"POST",
            url:"/SignUp"
        },
        googleSignUp:{
            method:"POST",
            url:"/GoogleSignup"
        },
        googleLogin:{
            method:"POST",
            url:"/GoogleLogin"
        }

    },



    course: {
        Course: {
            method: "GET",
            url: "",
        },
        createCourse: {
            method: "POST",
            url: "/CreateCourse"
        },
        editCourse: {
            method: "PUT",
            url: "/EditCourse"
        },
        deleteCourse: {
            method: "DELETE",
            url: "/DeleteCourse"
        },
        courseById: {
            method: "GET",
            url: "/GetCourseById"
        }
    },
    transaction: {
        transaction: {
            method: "GET",
            url: "/GetAlltransaction",
        },
        createtransaction: {
            method: "POST",
            url: "/Createtransaction"
        },
        transactionById: {
            method: "GET",
            url: "/GetTransactionById/"
        },
        edittransaction: {
            method: "PUT",
            url: "/EditTransaction"
        },
      
        deletetransaction: {
            method: "DELETE",
            url: "/DeleteTransaction"
        }
    },

    book: {
        book: {
            method: "GET",
            url: "/GetAllBook",
        },
        createBook: {
            method: "POST",
            url: "/CreateBook"
        },
        editBook: {
            method: "PUT",
            url: "/EditBook"
        },
        deleteBook: {
            method: "DELETE",
            url: "/DeleteBook"
        },
        bookById: {
            method: "GET",
            url: "/GetBookById"
        }
    },

    student: {
        student: {
            method: "GET",
            url: "/GetAllStudent",
        },
        createStudent: {
            method: "POST",
            url: "/CreateStudent"
        },
        editStudent: {
            method: "PUT",
            url: "/EditStudent"
        },
        deleteStudent: {
            method: "DELETE",
            url: "/DeleteStudent"
        },
        studentById: {
            method: "GET",
            url: "/GetStudentById"
        }
    },

    category: {
        category: {
            method: "GET",
            url: "/GetAllCategory",
        },
        createCategory: {
            method: "POST",
            url: "/CreateCategory"
        },
        editCategory: {
            method: "PUT",
            url: "/EditCategory"
        },
        deleteCategory: {
            method: "DELETE",
            url: "/DeleteCategory"
        },
        categoryById: {
            method: "GET",
            url: "/GetCategoryById"
        }
    },
    common: {
        gender: {
            gender: {
                method: "GET",
                url: "/GetGender"
            }
        },
        role:{
            method:"GET",
            url:"/GetRoles"
        },
        userList:{
            method:"GET",
            url:"/GetAllUser"
        }
    },
    dashboard: {
        dashboard: {
            method: "GET",
            url: "/GetDashboardData"
        }
    }

}
export default apiUrls