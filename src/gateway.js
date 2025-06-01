import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import CreateBookCategory from "./pages/admin/book-category/Create";
import CreateBook from "./pages/admin/book/Create";
import EditBook from "./pages/admin/book/Edit";
import Home from "./pages/admin/home/Home";
import Error from "./pages/shared/Error";
import BookIndex from "./pages/admin/book/BookIndex";
import NotFound from "./pages/shared/NotFound";
import RentBookIndex from "./pages/admin/rent-book/RentBookIndex";
import CreateRentBook from "./pages/admin/rent-book/Create";
import EditRentBook from "./pages/admin/rent-book/Edit";
import { store } from "./redux/store";
import MySpinner from "./components/ui/MySpinner";
import { useSelector } from "react-redux";
import BookCategoryIndex from "./pages/admin/book-category/BookCategoryIndex";
import EditBookCategory from "./pages/admin/book-category/Edit";

export default function Gateway() {

  return (
    <Routes>
      <Route exact path="/error" element={<Error />} />
      <Route exact path="/*" element={<NotFound />} />
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
        <Route exact path="/Admin/Book-Category" element={<BookCategoryIndex />} />
        <Route
          exact
          path="/Admin/Book-Category/Create"
          element={<CreateBookCategory />}
        />
        <Route
          exact
          path="/Admin/Book-Category/Edit/:id"
          element={<EditBookCategory />}
        />

        {/* Book */}
        <Route exact path="/Admin/Book" element={<BookIndex />} />
        <Route exact path="/Admin/Book/Create" element={<CreateBook />} />
        <Route exact path="/Admin/Book/Edit/:id" element={<EditBook />} />

        {/* Transaction */}
        <Route exact path="/Admin/Rent-Book" element={<RentBookIndex />} />
        <Route
          exact
          path="/Admin/Rent-book/Create"
          element={<CreateRentBook />}
        />
        <Route
          exact
          path="/Admin/Rent-Book/Edit/:id"
          element={<EditRentBook />}
        />
      </Route>
    </Routes>
  );
}
