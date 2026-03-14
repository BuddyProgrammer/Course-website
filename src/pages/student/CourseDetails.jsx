import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footers from "../../components/student/Footers";
import YouTube from "react-youtube";
import { useUser } from "@clerk/clerk-react";

const CourseDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const { isSignedIn } = useUser();

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    currency
  } = useContext(AppContext);

  const fetchCourseData = () => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // ENROLL BUTTON
  const handleEnroll = () => {

    if (!isSignedIn) {
      navigate("/sign-in", {
        state: { from: `/course/${id}` }
      });
      return;
    }

    alert("Enrolled Successfully!");

  };

  // Extract YouTube ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-24 pt-20 text-left">

        <div className="absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/70"></div>

        {/* LEFT SIDE */}
        <div className="flex-1">

          <h1 className="md:text-4xl text-3xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>

          <p
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription?.slice(0, 200) || ""
            }}
            className="pt-4 md:text-base text-sm"
          />

          {/* Rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">

            <p>{calculateRating(courseData)}</p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>

            <p className="text-blue-600">
              ({courseData.courseRatings?.length || 0} ratings)
            </p>

            <p>
              {courseData.enrolledStudents?.length || 0} students
            </p>

          </div>

          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Nagasai</span>
          </p>

          {/* COURSE STRUCTURE */}
          <div className="pt-8 text-gray-800">

            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">

              {courseData.courseContent?.map((chapter, index) => (

                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">

                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >

                    <div className="flex items-center gap-2">

                      <img
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow"
                      />

                      <p className="font-medium">
                        {chapter.chapterTitle}
                      </p>

                    </div>

                    <p>
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>

                  </div>

                  {openSection[index] && (

                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t">

                      {chapter.chapterContent.map((lecture, i) => (

                        <li key={i} className="flex items-start gap-2 py-1">

                          <img
                            src={assets.play_icon}
                            alt="play"
                            className="w-4 h-4 mt-1"
                          />

                          <div className="flex items-center justify-between w-full text-xs md:text-sm">

                            <p>{lecture.lectureTitle}</p>

                            <div className="flex gap-3">

                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: getYoutubeId(lecture.lectureUrl)
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}

                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>

                            </div>

                          </div>

                        </li>

                      ))}

                    </ul>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="py-20 text-sm">

            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>

            <div
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
              className="pt-3 rich-text"
            />

          </div>

        </div>

        {/* RIGHT SIDE CARD */}
        <div className="max-w-course-card shadow rounded bg-white min-w-[300px] sm:min-w-[420px] sticky top-24">

          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="thumbnail"
              className="w-full h-[220px] object-cover"
            />
          )}

          <div className="p-5">

            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="clock"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            {/* PRICE */}
            <div className="flex gap-3 items-center pt-3">

              <p className="text-gray-800 text-3xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="text-gray-500 line-through">
                {currency}{courseData.coursePrice}
              </p>

              <p className="text-gray-500">
                {courseData.discount}% off
              </p>

            </div>

            {/* ENROLL BUTTON */}
            <button
              onClick={handleEnroll}
              className="mt-6 w-full py-3 rounded bg-blue-600 text-white font-medium"
            >
              Enroll Now
            </button>

            {/* COURSE FEATURES */}
            <div className="pt-6">

              <p className="text-lg font-medium text-gray-800">
                What's in the course?
              </p>

              <ul className="ml-4 pt-2 list-disc text-gray-500 text-sm">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step project guidance.</li>
                <li>Downloadable resources.</li>
                <li>Quizzes to test knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>

            </div>

          </div>

        </div>

      </div>

      <Footers />

    </>
  ) : (
    <Loading />
  );

};

export default CourseDetails;