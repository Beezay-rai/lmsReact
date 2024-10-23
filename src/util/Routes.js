import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Book from "../pages/admin/Book/Book";
import CreateBook from "../pages/admin/Book/Create";
import EditBook from "../pages/admin/book/Edit";
import CategoryIndex from "../pages/admin/Category/CategoryIndex";
import CreateCategory from "../pages/admin/Category/Create";
import EditCategory from "../pages/admin/Category/Edit";
import CourseIndex from "../pages/admin/Course/CourseIndex";
import CreateCourse from "../pages/admin/Course/Create";
import EditCourse from "../pages/admin/Course/Edit";
import Home from "../pages/admin/Home/Home";
import CreateStudent from "../pages/admin/Student/Create";
import EditStudent from "../pages/admin/Student/Edit";
import StudentIndex from "../pages/admin/Student/StudentIndex";
import CreateTransaction from "../pages/admin/Transaction/Create";
import EditTransaction from "../pages/admin/Transaction/Edit";
import Transaction from "../pages/admin/Transaction/TransactionIndex";
import CreateUser from "../pages/admin/UserList/Create";
import UserList from "../pages/admin/UserList/UserList";
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signUp";

export default function AppRoutes() {
  const userData = useSelector((state) => state.userDetail);

const testRoutes=[
    UserList={
        path:"/Admin/UserList",
        element:<UserList />

    }



]



  const AdminRoutes = (
    
    <React.Fragment>
      <Route path="/" element={<Home />} />
      {/* SetUser */}

      <Route exact path="/Admin/UserList" element={<UserList />} />
      <Route exact path="/Admin/UserList/Create" element={<CreateUser />} />
      {/*  */}
      <Route exact path="/Admin/Course" element={<CourseIndex />} />
      <Route exact path="/Admin/Course/Create" element={<CreateCourse />} />
      <Route exact path="/Admin/Course/Edit/:id" element={<EditCourse />} />
      {/* Student */}
      <Route exact path="/Admin/Student" element={<StudentIndex />} />
      <Route exact path="/Admin/Student/Create" element={<CreateStudent />} />
      <Route exact path="/Admin/Student/Edit/:id" element={<EditStudent />} />
      {/* Category */}
      <Route exact path="/Admin/Category" element={<CategoryIndex />} />
      <Route exact path="/Admin/Category/Create" element={<CreateCategory />} />
      <Route exact path="/Admin/Category/Edit/:id" element={<EditCategory />} />
      {/* Book */}
      <Route exact path="/Admin/Book" element={<Book />} />
      <Route exact path="/Admin/Book/Create" element={<CreateBook />} />
      <Route exact path="/Admin/Book/Edit/:id" element={<EditBook />} />
      {/* Transaction */}
      <Route exact path="/Admin/Transaction" element={<Transaction />} />

      <Route exact path="/Admin/Transaction/Create" element={<CreateTransaction />} />
      <Route exactpath="/Admin/Transaction/Edit/:id"element={<EditTransaction />}/>
    </React.Fragment>
  );
  return userData.role !== "User" ? { AdminRoutes } : <></>;
}
