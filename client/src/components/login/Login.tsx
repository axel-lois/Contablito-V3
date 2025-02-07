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
  const [touched, setTouched] = useState<
    Partial<Record<keyof IValues, boolean>>
  >({});

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value.trim() }));
    setTouched((prev) => ({ ...prev, [name]: true })); // Marcar el campo como tocado al escribir
    setErrors(validateLogin({ ...values, [name]: value.trim() }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true })); // Marcar como tocado al perder el foco
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Marcar todos los campos como tocados al intentar enviar el formulario
    setTouched({
      email: true,
      password: true,
    });

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);

    // Si hay errores, detener el envío
    if (Object.values(validationErrors).some((error) => error)) return;

    try {
      const response: AxiosResponse = await axios.post(
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
    } catch (error: any) {
      const e = error.response?.data?.errorMsg || "Invalid login credentials.";
      setErrors({ email: e, password: e });

      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: e,
        confirmButtonColor: "#18bc9c",
      });
    }
  };

  return (
    <div className="col-12 col-md-12 col-lg-10 mb-4">
      <form onSubmit={submitHandler}>
        <h3 className="fw-bold">Sign in</h3>
        <p className={`mb-4 text-muted ${Classes.paragraph}`}>
          Sign in to start viewing your products.
        </p>

        {/* Email Input */}
        <div className={`form-group first ${Classes.inputDivTop}`}>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            type="email"
            className={`form-control shadow-none ${Classes.input} ${
              touched.email && errors.email ? "is-invalid" : ""
            }`}
            id="email"
            autoComplete="on"
          />
        </div>

        {/* Password Input */}
        <div className={`form-group last ${Classes.inputDivBot}`}>
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            type="password"
            className={`form-control shadow-none ${Classes.input} ${
              touched.password && errors.password ? "is-invalid" : ""
            }`}
            id="password"
            autoComplete="on"
          />
        </div>

        <div className="mb-2">
          <NavLink className={`${Classes.create}`} to={"/signUp"}>
            <span className="text-muted">
              Don't have an account? Create one.
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
