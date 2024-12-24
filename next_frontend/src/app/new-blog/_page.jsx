"use client"; // Mark the component as client-side

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { useRouter } from 'next/compat/router'

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  content: yup.string().required("Content is required").min(10, "Content must be at least 10 characters"),
  file: yup
    .mixed()
    .test("fileRequired", "Image is required", (value) => value && value.length > 0)
    .test("fileType", "Unsupported file type", (value) =>
      value && value[0] && ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    )
    .test("fileSize", "File size must be less than 2MB", (value) => value && value[0] && value[0].size <= 2 * 1024 * 1024),
});

const NewBlogPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [preview, setPreview] = useState(null);
  const router = useRouter(); // Initialize useRouter here to use client-side navigation

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("file", data.file[0]);

    try {
      const response = await axios.post("http://localhost:8080/blog/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset the form and preview
      reset();
      setPreview(null);
     // alert("Blog post submitted successfully!");

      // Redirect to /blog
    router.push("/blog");
    } catch (error) {
      console.error("Error submitting blog post:", error);
      alert("Failed to submit the blog post. Please try again.");
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            {...register("title")}
            className={`input input-bordered w-full ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            {...register("content")}
            rows="6"
            className={`textarea textarea-bordered w-full ${errors.content ? "border-red-500" : ""}`}
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            {...register("file")}
            className={`file-input w-full ${errors.image ? "border-red-500" : ""}`}
            accept="image/*"
            onChange={(e) => {
              register("file").onChange(e); // Register form's onChange
              handleImagePreview(e); // Set preview
            }}
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Image Preview:</p>
            <img src={preview} alt="Preview" className="max-w-full h-auto rounded-md shadow" />
          </div>
        )}

        {/* Submit */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPage;