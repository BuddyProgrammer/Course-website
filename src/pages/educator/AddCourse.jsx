import React, { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false
  });

  // Quill Editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow"
      });
    }
  }, []);

  // Handle Chapters
  const handleChapter = (action, chapterId) => {

    if (action === "add") {

      const title = prompt("Enter Chapter Name");

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false
        };

        setChapters([...chapters, newChapter]);
      }
    }

    else if (action === "remove") {

      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );

    }

    else if (action === "toggle") {

      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );

    }
  };

  // Handle Lectures
  const handleLecture = (action, chapterId, lectureIndex) => {

    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }

    else if (action === "remove") {

      setChapters(
        chapters.map((chapter) => {

          if (chapter.chapterId === chapterId) {

            const updatedLectures =
              chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              );

            return { ...chapter, chapterContent: updatedLectures };
          }

          return chapter;

        })
      );

    }
  };

  // Add Lecture
  const addLecture = () => {

    setChapters(
      chapters.map((chapter) => {

        if (chapter.chapterId === currentChapterId) {

          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid()
          };

          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture]
          };
        }

        return chapter;

      })
    );

    setShowPopup(false);

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Submitted");
  };

  return (

    <div className="h-screen overflow-scroll p-8">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg text-gray-600"
      >

        {/* Course Title */}

        <div>
          <p>Course Title</p>

          <input
            type="text"
            placeholder="Type here"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>


        {/* Description */}

        <div>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>


        {/* Price and Thumbnail */}

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div className="flex flex-col">
            <p>Course Price</p>

            <input
              type="number"
              placeholder="0"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="border px-3 py-2 rounded w-28"
            />
          </div>


          <div className="flex items-center gap-3">

            <p>Thumbnail</p>

            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >

              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded"
                alt=""
              />

              <input
                type="file"
                id="thumbnailImage"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="h-10"
                  alt=""
                />
              )}

            </label>

          </div>

        </div>


        {/* Discount */}

        <div>

          <p>Discount %</p>

          <input
            type="number"
            value={discount}
            min={0}
            max={100}
            onChange={(e) => setDiscount(e.target.value)}
            className="border px-3 py-2 rounded w-28"
          />

        </div>


        {/* Chapters */}

        <div>

          {chapters.map((chapter, index) => (

            <div
              key={chapter.chapterId}
              className="border rounded mb-3 bg-white"
            >

              <div className="flex justify-between p-3 border-b">

                <div className="flex items-center gap-2">

                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`cursor-pointer ${chapter.collapsed && "-rotate-90"}`}
                    onClick={() =>
                      handleChapter("toggle", chapter.chapterId)
                    }
                  />

                  <p className="font-semibold">
                    {index + 1}. {chapter.chapterTitle}
                  </p>

                </div>

                <div className="flex gap-3 items-center">

                  <span>
                    {chapter.chapterContent.length} Lectures
                  </span>

                  <img
                    src={assets.cross_icon}
                    className="cursor-pointer"
                    alt=""
                    onClick={() =>
                      handleChapter("remove", chapter.chapterId)
                    }
                  />

                </div>

              </div>


              {!chapter.collapsed && (

                <div className="p-3">

                  {chapter.chapterContent.map((lecture, i) => (

                    <div
                      key={lecture.lectureId}
                      className="flex justify-between mb-2"
                    >

                      <span>

                        {i + 1}. {lecture.lectureTitle}
                        {" - "}
                        {lecture.lectureDuration} mins
                        {" - "}

                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          Link
                        </a>

                        {" - "}

                        {lecture.isPreviewFree
                          ? "Free Preview"
                          : "Paid"}

                      </span>

                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        alt=""
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            i
                          )
                        }
                      />

                    </div>

                  ))}

                  <div
                    className="bg-gray-100 p-2 rounded cursor-pointer inline-block mt-2"
                    onClick={() =>
                      handleLecture("add", chapter.chapterId)
                    }
                  >
                    + Add Lecture
                  </div>

                </div>

              )}

            </div>

          ))}


          <div
            className="bg-blue-100 p-2 text-center rounded cursor-pointer"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>

        </div>


        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded w-max cursor-pointer"
        >
          ADD
        </button>

      </form>


      {/* Lecture Popup */}

      {showPopup && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-5 rounded w-80 relative">

            <h2 className="text-lg font-semibold mb-3">
              Add Lecture
            </h2>


            <input
              type="text"
              placeholder="Lecture Title"
              className="border p-2 w-full mb-2"
              value={lectureDetails.lectureTitle}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureTitle: e.target.value
                })
              }
            />


            <input
              type="number"
              placeholder="Duration"
              className="border p-2 w-full mb-2"
              value={lectureDetails.lectureDuration}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureDuration: e.target.value
                })
              }
            />


            <input
              type="text"
              placeholder="Lecture URL"
              className="border p-2 w-full mb-2"
              value={lectureDetails.lectureUrl}
              onChange={(e) =>
                setLectureDetails({
                  ...lectureDetails,
                  lectureUrl: e.target.value
                })
              }
            />


            <div className="flex gap-2 items-center mb-3">

              <p>Free Preview</p>

              <input
                type="checkbox"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    isPreviewFree: e.target.checked
                  })
                }
              />

            </div>


            <button
              onClick={addLecture}
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Add Lecture
            </button>


            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-xl"
            >
              
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AddCourse;