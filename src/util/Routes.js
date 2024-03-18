import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Book from "../Pages/Admin/Book/Book";
import CreateBook from "../Pages/Admin/Book/Create";
import EditBook from "../Pages/Admin/Book/Edit";
import CategoryIndex from "../Pages/Admin/Category/CategoryIndex";
import CreateCategory from "../Pages/Admin/Category/Create";
import EditCategory from "../Pages/Admin/Category/Edit";
import CourseIndex from "../Pages/Admin/Course/CourseIndex";
import CreateCourse from "../Pages/Admin/Course/Create";
import EditCourse from "../Pages/Admin/Course/Edit";
import Home from "../Pages/Admin/Home/Home";
import CreateStudent from "../Pages/Admin/Student/Create";
import EditStudent from "../Pages/Admin/Student/Edit";
import StudentIndex from "../Pages/Admin/Student/StudentIndex";
import CreateTransaction from "../Pages/Admin/Transaction/Create";
import EditTransaction from "../Pages/Admin/Transaction/Edit";
import Transaction from "../Pages/Admin/Transaction/TransactionIndex";
import CreateUser from "../Pages/Admin/UserList/Create";
import UserList from "../Pages/Admin/UserList/UserList";

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
      <Route exactpath="/Admin/Transaction/Edit/:id"element={<EditTransaction />}/>//#endregion
    </React.Fragment>
  );
  return userData.role !== "User" ? { AdminRoutes } : <></>;
}
