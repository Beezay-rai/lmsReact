const apiUrls = {
  auth: {
    loginUser: {
      method: "POST",
      url: "/Login",
    },
    signUp: {
      method: "POST",
      url: "/SignUp",
    },
    googleSignUp: {
      method: "POST",
      url: "/GoogleSignup",
    },
    googleLogin: {
      method: "POST",
      url: "/GoogleLogin",
    },
  },

  course: {
    Course: {
      method: "GET",
      url: "",
    },
    createCourse: {
      method: "POST",
      url: "",
    },
    editCourse: {
      method: "PUT",
      url: "/",
    },
    deleteCourse: {
      method: "DELETE",
      url: "/",
    },
    courseById: {
      method: "GET",
      url: "/",
    },
  },
  transaction: {
    transaction: {
      method: "GET",
      url: "/GetAlltransaction",
    },
    createtransaction: {
      method: "POST",
      url: "/Createtransaction",
    },
    transactionById: {
      method: "GET",
      url: "/GetTransactionById/",
    },
    edittransaction: {
      method: "PUT",
      url: "/EditTransaction",
    },

    deletetransaction: {
      method: "DELETE",
      url: "/DeleteTransaction",
    },
  },

  book: {
    book: {
      method: "GET",
      url: "/GetAllBook",
    },
    createBook: {
      method: "POST",
      url: "/CreateBook",
    },
    editBook: {
      method: "PUT",
      url: "/EditBook",
    },
    deleteBook: {
      method: "DELETE",
      url: "/DeleteBook",
    },
    bookById: {
      method: "GET",
      url: "/GetBookById",
    },
  },

  student: {
    student: {
      method: "GET",
      url: "",
    },
    createStudent: {
      method: "POST",
      url: "",
    },
    editStudent: {
      method: "PUT",
      url: "/",
    },
    deleteStudent: {
      method: "DELETE",
      url: "/",
    },
    studentById: {
      method: "GET",
      url: "/",
    },
  },

  category: {
    category: {
      method: "GET",
      url: "",
    },
    createCategory: {
      method: "POST",
      url: "",
    },
    editCategory: {
      method: "PUT",
      url: "/",
    },
    deleteCategory: {
      method: "DELETE",
      url: "/DeleteCategory",
    },
    categoryById: {
      method: "GET",
      url: "/",
    },
  },
  common: {
    gender: {
      gender: {
        method: "GET",
        url: "/GetGender",
      },
    },
    role: {
      method: "GET",
      url: "/GetRoles",
    },
    userList: {
      method: "GET",
      url: "/GetAllUser",
    },
  },
  dashboard: {
    dashboard: {
      method: "GET",
      url: "/GetDashboardData",
    },
  },
};
export default apiUrls