import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { setCreatorCourseData } from "../../redux/courseSlice";
import img1 from "../../assets/empty.jpg";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/course/getcreatorcourses`,
          { withCredentials: true },
        );
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load courses");
      }
    };
    getCreatorData();
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-8 py-10">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/dashboard")}
        className="fixed top-8 left-8 bg-white shadow-lg rounded-full p-3 z-20">
        <FaArrowLeftLong />
      </motion.button>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/createcourses")}
          className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:bg-gray-800">
          + Create Course
        </motion.button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4">Course</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {creatorCourseData?.map((course, index) => (
              <motion.tr
                key={course._id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={course.thumbnail || img1}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <span className="font-medium">{course.title}</span>
                </td>

                <td className="px-6 py-4">
                  {course.price ? `₹${course.price}` : "₹ NA"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <FaEdit
                    className="text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => navigate(`/addcourses/${course._id}`)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <p className="text-center text-xs text-gray-400 py-6">
          A list of your created courses.
        </p>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 max-w-7xl mx-auto">
        {creatorCourseData?.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail || img1}
                alt=""
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-sm">{course.title}</h2>
                <p className="text-xs text-gray-500">
                  {course.price ? `₹${course.price}` : "₹ NA"}
                </p>
              </div>
              <FaEdit
                className="text-gray-600 cursor-pointer"
                onClick={() => navigate(`/addcourses/${course._id}`)}
              />
            </div>

            <span
              className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
                course.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}>
              {course.isPublished ? "Published" : "Draft"}
            </span>
          </motion.div>
        ))}

        <p className="text-center text-xs text-gray-400 pt-6">
          A list of your created courses.
        </p>
      </div>
    </motion.div>
  );
}

export default Courses;
