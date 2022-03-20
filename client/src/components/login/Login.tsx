import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Classes from "./Login.module.css";
import { validateLogin } from "../../utils/validate";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export interface IValues {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [values, setValues] = useState<IValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<IValues>({
    email: "",
    password: "",
  });
  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrors(validateLogin(values));
    try {
      if (errors.email.length === 0 && errors.password.length === 0) {
        let response: AxiosResponse = await axios.post(
          "/api/auth/signin",
          values
        );
        localStorage.setItem(
          "sessionToken",
          JSON.stringify(response.headers["auth-token"])
        );
        Swal.fire({
          icon: "success",
          title: "You logged in successfully.",
          confirmButtonColor: "#18bc9c",
        }).then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Errors:",
          text: `${
            errors.email === errors.password ? errors.email : errors.email
          } ${errors.email !== errors.password ? errors.password : ""}`,
          confirmButtonColor: "#18bc9c",
        });
      }
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      setErrors({
        email: e,
        password: e,
      });
      Swal.fire({
        icon: "error",
        title: "Errors:",
        text: `${e}`,
        confirmButtonColor: "#18bc9c",
      });
    }
  };
  useEffect(() => {
    setErrors(validateLogin(values));
    if (localStorage.getItem("sessionToken")) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
    setErrors(
      validateLogin({
        ...values,
        [e.currentTarget.name]: e.currentTarget.value.trim(),
      })
    );
  };
  return (
    <div className="col-12 col-md-12 col-lg-10 mb-4">
      <form onSubmit={submitHandler}>
        <h3 className="fw-bold">Sign in</h3>
        <p className={`mb-4 text-muted ${Classes.paragraph}`}>
          Sign in to start viewing your products.
        </p>
        <div className={`form-group first ${Classes.inputDivTop}`}>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className={`form-control shadow-none ${Classes.input} ${
              errors.email && "is-invalid"
            }`}
            id="email"
            autoComplete="on"
          />
        </div>
        <div className={`form-group last mb-3 ${Classes.inputDivBot}`}>
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="password"
            type="password"
            className={`form-control shadow-none ${Classes.input} ${
              errors.password && "is-invalid"
            }`}
            id="password"
            autoComplete="on"
          />
        </div>
        <div className="mb-4">
          <NavLink className={`${Classes.create}`} to={"/signUp"}>
            <span className={`text-muted`}>
              Dont' have an account? Create one.
            </span>
          </NavLink>
        </div>
        <input
          type="submit"
          value="Log In"
          style={{ height: "50px" }}
          className={`btn btn-success w-100 fw-bold`}
        />
      </form>
    </div>
  );
};

export default Login;
