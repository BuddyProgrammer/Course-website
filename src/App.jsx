import { Routes, Route, useMatch } from "react-router-dom";

import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/player";
import Loading from "./components/student/Loading";


import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

import Navbar from "./components/student/Navbar";

import SignInPage from "./pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "quill/dist/quill.snow.css";
import TokenLogger from "./components/TokenLogger";

const App = () => {

  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">

      {!isEducatorRoute && <Navbar />}

      <TokenLogger />

      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/sign-in" element={<SignInPage />} />

        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Home />} />

        {/* COURSE LIST */}
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />

        {/* COURSE DETAILS (LOGIN REQUIRED ONLY WHEN ENROLL CLICKED) */}
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/my-enrollments"
          element={
            <ProtectedRoute>
              <MyEnrollments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/player/:courseId"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loading/:path"
          element={<Loading />}
        />

        {/* EDUCATOR ROUTES */}

        <Route
          path="/educator"
          element={
            <ProtectedRoute>
              <Educator />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>

      </Routes>

    </div>
  );
};

export default App;