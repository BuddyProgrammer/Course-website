import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const MyEnrollments = () => {

  const { enrolledCourses = [], calculateCourseDuration } = useContext(AppContext);

  return (
    <div className="md:px-36 px-8 pt-10">

      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      {enrolledCourses.length === 0 ? (
        <p className="mt-6 text-gray-500">No enrolled courses found.</p>
      ) : (

        <table className="md:table-auto table-fixed w-full border mt-10">

          <thead className="text-gray-900 border-b border-gray-300 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            {enrolledCourses.map((course, index) => (

              <tr key={index} className="border-b border-gray-500/20">

                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center gap-4 space-x-3">

                  <img
                    src={course.courseThumbnail}
                    alt="course"
                    className="w-20 rounded"
                  />
                  <div className="flex-1">
                    <p className="mb-1 mx-sm:text-sm">
                    {course.courseTitle}
                  </p>
                  </div>
                  

                </td>

                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration
                    ? calculateCourseDuration(course)
                    : "N/A"}
                </td>

                <td className="px-4 py-3 max-sm:hidden">
                  4 / 10 <span className="text-gray-500">Lectures</span>
                </td>

                <td className="px-4 py-3 max-sm:text-right">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    On Going
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default MyEnrollments;
