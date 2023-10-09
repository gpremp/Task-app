"use client";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { currentUserDetail } from "@/app/auth/loginAuth";
import Navbar from "../components/navbar/navbar";
import baseUrl from "../baseUrl/baseUrl";

export default function Dashboard() {
  const router = useRouter();
  let token;
  // token = currentUserDetail();
  const [tasks, settasks] = useState([]);
  useEffect(() => {
    token = currentUserDetail();
    axios
      .get(`${baseUrl}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        settasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deletePerson = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          token = currentUserDetail();
          axios
            .delete(`${baseUrl}/api/tasks/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              settasks(
                tasks.filter((obj) => {
                  return obj._id !== id;
                })
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  const selectTask = (task) => {
    router.push(`/dashboard/task/${task._id}`);
  };
  const columns = [
    {
      name: "SNo.",
      cell: (row, index) => {
        return index + 1;
      },
      width: "80px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "auto",
      center: true,
    },
    // {
    //     name: 'Description',
    //     selector: row => row.description,
    // },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            onClick={() => selectTask(row)}
            class="btn btn-success btn-sm mx-2"
          >
            Select
          </button>
          <button
            onClick={() => deletePerson(row._id)}
            class="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </>
      ),
      width: "180px",
    },
  ];

  const tableStyle = {
    headRow: {
      style: {
        fontSize: "20px",
        minHeight: "30px",
        borderBottomWidth: "1px",
        borderBottomColor: "black",
        borderBottomStyle: "solid",
      },
    },
  };
  return (
    <div>
      <Navbar />
      <div className="container" style={{ overflow: "auto" }}>
        <div className="d-flex my-4 justify-content-end">
          <button
            onClick={() => router.push("/dashboard/task/create")}
            className="btn btn-success active"
          >
            Add Task
          </button>
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div class="card-header text-center">
              <h5>All Task</h5>
            </div>
            <DataTable
              columns={columns}
              data={tasks}
              customStyles={tableStyle}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}
