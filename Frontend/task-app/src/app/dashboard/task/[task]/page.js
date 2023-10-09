'use client'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/navbar";
import baseUrl from "@/app/baseUrl/baseUrl";

export default function TaskDetails({params}) {
  console.log(params.task)
  const id = params.task
  const router = useRouter();
  let [task,setTask] = useState({});
  useEffect(() => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTIyYTJjOWVmOTVkYTQ3ZjIzYTRkZDIiLCJpYXQiOjE2OTY4MzM5MTIsImV4cCI6MTY5Njg2MzkxMn0.rKD5-2sfRqoGwsfaXsC8ExrR9yMF4DJY6pRT1etXF1g"
    axios.get(`${baseUrl}/api/tasks/${params.task}`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    }).then(
        (res) => {
            console.log(res.data);
            setTask(res.data);
        }
    )
}, []);
const descriptionStyle = {
  whiteSpace: 'pre-wrap',
};
    return (
      <>
      <Navbar/>
      <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Task Details</h5>
          <div className="mb-3">
            <strong>Title:</strong> {task.title}
          </div>
          <div className="mb-3">
            <strong>Description:</strong>
            <span style={descriptionStyle}>{task.description}</span>
          </div>
          <Link href="/dashboard">
            Back to Tasks
          </Link>
          <Link href={`/dashboard/task/update/${id}`} class="btn btn-success active mx-4">
            update
          </Link>
        </div>
      </div>
    </div>
    </>
    )
  }
  