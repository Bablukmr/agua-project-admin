"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./componets/header";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validation
    if (!title || !description || !url) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: JSON.stringify({ title, description, url }),
      });

      const data = await response.json();
      console.log(data);

      // Show an alert upon successful submission
      alert("Form submitted successfully!");

      // Clear all fields after successful submission
      setTitle("");
      setDescription("");
      setUrl("");
      setFormError(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      setFormError("Error submitting data. Please try again.");
    }
  };

  const handleImageinlocal = (e) => {
    let file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      setUrl(fileURL);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className="w-full h-full mt-6 flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold my-4">Add Banner Details</h1>
        <form
          onSubmit={handleSubmit}
          className="w-[80%] md:w-[50%] xl:w-[30%] flex gap-4 flex-col items-center justify-center"
        >
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            required
            multiline
            minRows={4}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleImageinlocal}
          />
          {formError && <p className="text-red-500">{formError}</p>}
          <div className="w-full mt-4">
            <Button
              className="bg-green-900 hover:bg-green-600 text-white w-full"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
