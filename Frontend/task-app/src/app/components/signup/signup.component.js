import { useState,useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import baseUrl from "@/app/baseUrl/baseUrl";

export default function Signup({toggleLogin}) {
    function handleChange() {
        toggleLogin();
      }
    
      const router = useRouter();
      const formRef = useRef(null);
      const [user, setUser] = useState({});
      const [formErrors, setFormErrors] = useState({});
      let isSubmit = true;
    
      function isSentenceValid(sentence) {
        const words = sentence.split(" ");
        return words.some((word) => /\d/.test(word));
      }
    
      // Define an event handler for the input change
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      function handleSubmit(event) {
        event.preventDefault();
        console.log(user);
        isSubmit = true;
        setFormErrors(validate(user));
        if (isSubmit) {
          console.log("success");
          console.log(user)
          // addTask(task)
            axios.post(`${baseUrl}/api/users`,user,
                ).then(
                (res) => {
                  if(res.data.message=="User with given email already Exist!"){
                    Swal.fire("Sorry!", res.data.message, "error");

                  }else{
                    Swal.fire("Success!", "Account created successfully!", "success");

                  }
                  formRef.current.reset();
                }
                
            ).catch((err) =>{
              console.log(err);
            })
          
        }
      }
    
      const validate = (values) => {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = {};
        if (!values.name) {
          isSubmit = false;
          errors.name = "Name is required!";
        }
        if(isSentenceValid(values.name)){
          isSubmit = false;
            errors.name = "*Number not allowed";
        }
        if (!values.email.match(emailformat)) {
          isSubmit = false;
          errors.email = "Email is not valid!";
        }
        if (!values.password) {
          isSubmit = false;
          errors.password = "Password is required";
        }
        return errors;
      };
      const buttonStyle = {
        cursor: "pointer", // Change cursor to pointer on hover
        textDecoration: "underline", // Underline the text
        color: "blue", // Change text color
      };
    return (
      <div>
         <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Sign Up</h5>
              <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleInputChange}
                    required
                  />
                   <h6 style={{color:'red'}}>{formErrors.name}</h6>
                </div>
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
                   <h6 style={{color:'red'}}>{formErrors.email}</h6>
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
                   <h6 style={{color:'red'}}>{formErrors.password}</h6>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <p className="text-center">
                Already have an Account{" "}
                <span style={buttonStyle} onClick={handleChange}>
                  Login
                </span>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    )
  }