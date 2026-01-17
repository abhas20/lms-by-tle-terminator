import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/empty.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import { setCourseData } from "../../redux/courseSlice";
import SelectField from "../../components/SelectField";
import InputField from "../../components/InputField";


function AddCourses() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const thumbRef = useRef();

  const [loading, setLoading] = useState(false);
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    isPublished: false,
  });

  /* -------------------- Fetch Course -------------------- */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/getcourse/${courseId}`,
          { withCredentials: true },
        );

        setForm(res.data);
        setFrontendImage(res.data.thumbnail || img);
      } catch (err) {
        toast.error("Failed to load course");
      }
    };

    fetchCourse();
  }, [courseId]);

  /* -------------------- Handlers -------------------- */
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (backendImage) formData.append("thumbnail", backendImage);

    try {
      const res = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true },
      );

      const updated = res.data;
      const updatedCourses = courseData.map((c) =>
        c._id === updated._id ? updated : c,
      );

      dispatch(setCourseData(updatedCourses));
      toast.success("Course updated");
      navigate("/courses");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async () => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/course/removecourse/${courseId}`, {
        withCredentials: true,
      });

      dispatch(setCourseData(courseData.filter((c) => c._id !== courseId)));
      toast.success("Course deleted");
      navigate("/courses");
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <FaArrowLeftLong
          className="cursor-pointer"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold">Edit Course</h2>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={() => navigate(`/createlecture/${courseId}`)}>
          Go to Lectures
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            form.isPublished
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
          onClick={() => setForm({ ...form, isPublished: !form.isPublished })}>
          {form.isPublished ? "Unpublish" : "Publish"}
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={removeCourse}
          disabled={loading}>
          {loading ? <ClipLoader size={20} color="white" /> : "Remove"}
        </button>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <InputField
          label="Title"
          value={form.title}
          onChange={handleChange("title")}
          placeholder="Course title"
        />

        <InputField
          label="Subtitle"
          value={form.subTitle}
          onChange={handleChange("subTitle")}
          placeholder="Short subtitle"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={handleChange("description")}
            className="w-full border rounded-md px-4 py-2 h-24"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField
            label="Category"
            value={form.category}
            onChange={handleChange("category")}
            options={[
              "Web Development",
              "AI/ML",
              "Data Science",
              "UI UX Designing",
              "Ethical Hacking",
              "Others",
            ]}
          />

          <SelectField
            label="Level"
            value={form.level}
            onChange={handleChange("level")}
            options={["Beginner", "Intermediate", "Advanced"]}
          />

          <InputField
            label="Price (₹)"
            type="number"
            value={form.price}
            onChange={handleChange("price")}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <input
            ref={thumbRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleThumbnail}
          />
          <div className="relative w-[300px] h-[170px] cursor-pointer">
            <img
              src={frontendImage}
              alt=""
              className="w-full h-full rounded-md object-cover border"
              onClick={() => thumbRef.current.click()}
            />
            <MdEdit className="absolute top-2 right-2 text-white" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="border px-4 py-2 rounded-md"
            onClick={() => navigate("/courses")}>
            Cancel
          </button>
          <button
            className="bg-black text-white px-6 py-2 rounded-md"
            onClick={handleSave}
            disabled={loading}>
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourses;
