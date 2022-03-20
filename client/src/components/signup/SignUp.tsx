import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Classes from "./SignUp.module.css";
import { validateSignup } from "../../utils/validate";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export interface INewValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface INewUser {
  username: string;
  email: string;
  password: string;
}

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState<INewValues>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<INewValues>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
    setErrors(
      validateSignup({
        ...values,
        [e.currentTarget.name]: e.currentTarget.value.trim(),
      })
    );
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrors(validateSignup(values));

    try {
      if (
        !errors.email &&
        !errors.username &&
        !errors.password &&
        !errors.passwordConfirm
      ) {
        const newUser: INewUser = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        let response: AxiosResponse = await axios.post(
          "/api/auth/signup",
          newUser
        );
        localStorage.setItem(
          "sessionToken",
          JSON.stringify(response.headers["auth-token"])
        );
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "Your account has been created.",
          confirmButtonColor: "#18bc9c",
        }).then(() => {
          navigate("/home");
        });
      }
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      if(e === 'Username already exists.') {
        setErrors({ email: '', username: e, password: '', passwordConfirm: '' });
      }
      if(e === 'Email already exists.') {
        setErrors({ email: e, username: '', password: '', passwordConfirm: '' })
      }
    }
  };

  useEffect(() => {
    setErrors(validateSignup(values));
    if (localStorage.getItem("sessionToken")) {
      navigate("/home");
    }
  }, []);

  return (
    <div className={`container ${Classes.contain}`}>
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="col-12 col-md-12 col-lg-8 col-xl-6 mb-4">
          <form
            onSubmit={submitHandler}
            className={` d-flex flex-column align-items-center justify-content-center ${Classes.form}`}
          >
            <div className="mb-4 w-100">
              <h3 className="fw-bold">Sign Up</h3>
              <p className="text-muted">
                Please fill in this form to create an account.
              </p>
              <hr />
            </div>
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="username"
                onChange={handleChange}
                type="text"
                id="username"
                placeholder="Enter username"
                className={`form-control shadow-none ${
                  errors.username ? "is-invalid" : "is-valid"
                }`}
                autoComplete="on"
              />
            </div>
            {errors.username && (
              <p className={Classes.error}>{errors.username}</p>
            )}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="email"
                onChange={handleChange}
                type="email"
                id="createEmail"
                placeholder="Enter email"
                className={`form-control shadow-none ${
                  errors.email ? "is-invalid" : "is-valid"
                }`}
                autoComplete="on"
              />
            </div>
            {errors.email && <p className={Classes.error}>{errors.email}</p>}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                id="createPassword"
                className={`form-control shadow-none ${
                  errors.password ? "is-invalid" : "is-valid"
                }`}
                autoComplete="on"
              />
            </div>
            {errors.password && (
              <p className={Classes.error}>{errors.password}</p>
            )}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="passwordConfirm"
                onChange={handleChange}
                placeholder="Confirm password"
                type="password"
                className={`form-control shadow-none ${
                  errors.passwordConfirm ? "is-invalid" : "is-valid"
                }`}
                autoComplete="on"
              />
            </div>
            {errors.passwordConfirm && (
              <p className={Classes.error}>{errors.passwordConfirm}</p>
            )}
            <button
              type="submit"
              className="btn btn-success w-100 mb-2 fw-bold fs-5"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="col-md-6 text-center">
          <span className="fs-6">
            Already have an account? <NavLink to="/"> Login here. </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
