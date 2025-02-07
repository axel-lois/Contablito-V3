import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Classes from "./SignUp.module.css";
import { validateSignup } from "../../utils/validate";
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
  const [touched, setTouched] = useState<
    Partial<Record<keyof INewValues, boolean>>
  >({});

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value.trim() }));
    setTouched((prev) => ({ ...prev, [name]: true })); // Marca como tocado al escribir
    setErrors(validateSignup({ ...values, [name]: value.trim() }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Marcar todos los campos como tocados al intentar enviar el formulario
    setTouched({
      username: true,
      email: true,
      password: true,
      passwordConfirm: true,
    });

    const validationErrors = validateSignup(values);
    setErrors(validationErrors);

    // Si hay errores, no continuar
    if (Object.values(validationErrors).some((error) => error)) return;

    try {
      const newUser: INewUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      const response: AxiosResponse = await axios.post(
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
    } catch (error: any) {
      console.log(error);
      const e = error.response?.data?.errorMsg;
      if (e === "Username already exists.") {
        setErrors((prev) => ({ ...prev, username: e }));
      }
      if (e === "Email already exists.") {
        setErrors((prev) => ({ ...prev, email: e }));
      }
    }
  };

  return (
    <div className={`container ${Classes.contain}`}>
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="col-12 col-md-12 col-lg-8 col-xl-6 mb-4">
          <form
            onSubmit={submitHandler}
            className={`d-flex flex-column align-items-center justify-content-center ${Classes.form}`}
          >
            <div className="mb-4 w-100">
              <h3 className="fw-bold">Sign Up</h3>
              <p className="text-muted">
                Please fill in this form to create an account.
              </p>
              <hr />
            </div>

            {/* Username Input */}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                placeholder="Enter username"
                className={`form-control shadow-none ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
                autoComplete="on"
              />
            </div>
            {touched.username && errors.username && (
              <p className={Classes.error}>{errors.username}</p>
            )}

            {/* Email Input */}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                placeholder="Enter email"
                className={`form-control shadow-none ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                autoComplete="on"
              />
            </div>
            {touched.email && errors.email && (
              <p className={Classes.error}>{errors.email}</p>
            )}
            {/* Password Input */}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Enter password"
                className={`form-control shadow-none ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                autoComplete="on"
              />
            </div>
            {touched.password && errors.password && (
              <p className={Classes.error}>{errors.password}</p>
            )}

            {/* Confirm Password Input */}
            <div
              className={`form-group mb-2 w-100 text-center fs-5 ${Classes.inputDiv}`}
            >
              <input
                name="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Confirm password"
                className={`form-control shadow-none ${
                  touched.passwordConfirm && errors.passwordConfirm
                    ? "is-invalid"
                    : ""
                }`}
                autoComplete="on"
              />
            </div>
            {touched.passwordConfirm && errors.passwordConfirm && (
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
