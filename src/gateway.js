import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signUp";
import { PrivateRoute } from "./util/Utility";
import UserList from "./pages/admin/user-list/UserList";
import CreateUser from "./pages/admin/user-list/Create";
import CourseIndex from "./pages/admin/course/CourseIndex";
import CreateCourse from "./pages/admin/course/Create";
import EditCourse from "./pages/admin/course/Edit";
import StudentIndex from "./pages/admin/student/StudentIndex";
import CreateStudent from "./pages/admin/student/Create";
import EditStudent from "./pages/admin/student/Edit";
import CategoryIndex from "./pages/admin/category/CategoryIndex";
import CreateCategory from "./pages/admin/category/Create";
import EditCategory from "./pages/admin/category/Edit";
import CreateBook from "./pages/admin/book/Create";
import EditBook from "./pages/admin/book/Edit"
import CreateTransaction from "./pages/admin/transaction/Create";
import Transaction from "./pages/admin/transaction/TransactionIndex";
import EditTransaction from "./pages/admin/transaction/Edit";
import Home from "./pages/admin/home/Home";
import Error from "./pages/shared/error";
import BookIndex from "./pages/admin/book/BookIndex";

export default function Gateway() {
  return (
    <Routes>
      <Route exact path="/*" element={<Error />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
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
        <Route
          exact
          path="/Admin/Category/Create"
          element={<CreateCategory />}
        />
        <Route
          exact
          path="/Admin/Category/Edit/:id"
          element={<EditCategory />}
        />

        {/* Book */}
        <Route exact path="/Admin/Book" element={<BookIndex />} />
        <Route exact path="/Admin/Book/Create" element={<CreateBook />} />
        <Route exact path="/Admin/Book/Edit/:id" element={<EditBook />} />

        {/* Transaction */}
        <Route exact path="/Admin/Transaction" element={<Transaction />} />
        <Route
          exact
          path="/Admin/Transaction/Create"
          element={<CreateTransaction />}
        />
        <Route
          exact
          path="/Admin/Transaction/Edit/:id"
          element={<EditTransaction />}
        />
      </Route>
    </Routes>
  );
}
