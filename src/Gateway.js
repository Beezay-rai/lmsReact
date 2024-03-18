import { Route, Routes } from "react-router-dom";


import Login from "./Pages/auth/login";
import SignUp from "./Pages/auth/signUp";
import { PrivateRoute } from "./util/Utility";
import UserList from "./Pages/Admin/UserList/UserList"
import CreateUser from "./Pages/Admin/UserList/Create"
import CourseIndex from "./Pages/Admin/Course/CourseIndex";
import CreateCourse from "./Pages/Admin/Course/Create";
import EditCourse from "./Pages/Admin/Course/Edit";
import StudentIndex from "./Pages/Admin/Student/StudentIndex";
import CreateStudent from "./Pages/Admin/Student/Create";
import EditStudent from "./Pages/Admin/Student/Edit";
import CategoryIndex from "./Pages/Admin/Category/CategoryIndex";
import CreateCategory from "./Pages/Admin/Category/Create";
import EditCategory from "./Pages/Admin/Category/Edit";
import Book from "./Pages/Admin/Book/Book";
import CreateBook from "./Pages/Admin/Book/Create";
import EditBook from "./Pages/Admin/Book/Edit";
import CreateTransaction from "./Pages/Admin/Transaction/Create";
import Transaction from "./Pages/Admin/Transaction/TransactionIndex";
import EditTransaction from "./Pages/Admin/Transaction/Edit";
import Home from "./Pages/Admin/Home/Home";
import Error from "./Pages/shared/error";
import UserHome from "./Pages/User/Home";
import AppRoutes from "./util/Routes";


const testRoutes =[
    {
        path:"/",
        element:<Home />
    }
]







export default function Gateway() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Error" element={<Error />} />
            <Route exact path="/*" element={<Error/>} />

            <Route element={<PrivateRoute />}>
                {testRoutes.map(route=>{
                    return <Route exact path={route.path} element={route.element}/>
                })}
            </Route>
        </Routes>
    )
}