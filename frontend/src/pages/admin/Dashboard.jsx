import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      lectures: course.lectures.length || 0,
    })) || [];

  const enrollData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

  const totalEarnings =
    creatorCourseData?.reduce((sum, course) => {
      const count = course.enrolledStudents?.length || 0;
      return sum + (course.price ? course.price * count : 0);
    }, 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition">
        <FaArrowLeftLong className="w-5 h-5" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Profile / Welcome Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src={userData?.photoUrl || img}
            alt="Educator"
            className="w-32 h-32 rounded-full object-cover border-4 border-black"
          />

          <div className="flex-1 space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>

            <p className="text-gray-600 max-w-xl">
              {userData?.description ||
                "Start creating amazing courses for your students!"}
            </p>

            <div className="mt-4 flex items-center justify-center md:justify-start gap-6">
              <div className=" text-black px-6 py-3 rounded-xl shadow-md">
                <p className="text-sm opacity-80">Total Earnings</p>
                <p className="text-2xl font-semibold">
                  ₹{totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/createcourses")}
                className="px-6 py-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-800">
                Create Course
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/courses")}
                className="px-6 py-3 bg-white border border-black rounded-xl shadow-sm hover:bg-gray-50">
                View My Courses
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Course Progress (Lectures)
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Bar dataKey="enrolled" fill="black" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
