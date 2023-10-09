"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { currentUserDetail } from "@/app/auth/loginAuth";
import Navbar from "@/app/components/navbar/navbar";
import baseUrl from "@/app/baseUrl/baseUrl";

export default function CreateTask() {
  const router = useRouter();
  const [task, setTask] = useState({});
  const [formErrors, setFormErrors] = useState({});
  let isSubmit = true;
  let token;

  function isSentenceValid(sentence) {
    const words = sentence.split(" ");
    return words.some((word) => /\d/.test(word));
  }

  // Define an event handler for the input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(task);
    isSubmit = true;
    setFormErrors(validate(task));
    if (isSubmit) {
      token = currentUserDetail();
      axios
        .post(`${baseUrl}/api/tasks`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire("Success!", "Task saved successfully!", "success");
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const validate = (values) => {
    const errors = {};
    if (isSentenceValid(values.title)) {
      isSubmit = false;
      errors.name = "*Number not allowed";
    }
    if (!(values.description)) {
      isSubmit = false;
      errors.description = "*description cannot be empty";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <main className="container my-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
              required
            />
            <h6 style={{ color: "red" }}>{formErrors.name}</h6>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter description"
              style={{ height: "150px" }}
              name="description"
              onChange={handleChange}
            ></textarea>
            <h6 style={{ color: "red" }}>{formErrors.description}</h6>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/dashboard");
            }}
            className="btn btn-primary mx-2"
          >
            Back
          </button>
        </form>
      </main>
    </>
  );
}
