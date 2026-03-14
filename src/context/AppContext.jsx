import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = "₹";
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setisEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // ✅ NEW: user login state
    const [user, setUser] = useState(null);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    const calculateRating = (course) => {

        if (!course?.courseRatings || course.courseRatings.length === 0) {
            return 0;
        }

        let totalRating = 0;

        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating;
        });

        return totalRating / course.courseRatings.length;
    };

    const calculateChapterTime = (chapter) => {

        let time = 0;

        chapter?.chapterContent?.forEach((lecture) => {
            time += lecture.lectureDuration;
        });

        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    const calculateCourseDuration = (course) => {

        let time = 0;

        course?.courseContent?.forEach((chapter) => {

            chapter?.chapterContent?.forEach((lecture) => {
                time += lecture.lectureDuration;
            });

        });

        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    const calculateNoOfLectures = (course) => {

        let totalLectures = 0;

        course?.courseContent?.forEach((chapter) => {

            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }

        });

        return totalLectures;
    };

    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    };

    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses();
    }, []);

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setisEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,

        // ✅ expose auth state
        user,
        setUser
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};