
import { useState } from "react";
import axios from "axios";
import {doLogin} from "@/app/auth/loginAuth"
import { useRouter } from "next/navigation";
import baseUrl from "@/app/baseUrl/baseUrl";

export default function Login({ toggleLogin }) {
  const router = useRouter()
  const [user, setUser] = useState({});
  
  const [formErrors, setFormErrors] = useState('');
  function handleChange() {
    toggleLogin();
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors("")
    await axios.post(`${baseUrl}/api/users/auth`, user).then(
      (response) => {
        console.log(response);
        if(response.data.message==="Invalid Email or Password"){
          setFormErrors("invalid email and password");
        }
        else if(response.data.message==="logged in successfully"){
          console.log(response.data.data);
          doLogin(response.data.data);
          router.push('/dashboard')

        }
      }
    ).catch((err)=>{
      console.log(err)
    })
  };
  const buttonStyle = {
    cursor: "pointer", // Change cursor to pointer on hover
    textDecoration: "underline", // Underline the text
    color: "blue", // Change text color
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                    required
                  />
                   <h6 style={{color:'red'}}>{formErrors}</h6>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <p className="text-center">
                Don't have an account{" "}
                <span style={buttonStyle} onClick={handleChange}>
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
