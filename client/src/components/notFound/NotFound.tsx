import React from "react";
import { NavLink } from "react-router-dom";
import NotFoundImg from "../../img/404.png";
import Classes from "./NotFound.module.css";

const NotFound = (): JSX.Element => {
  return (
    <div className={`container ${Classes.contain}`}>
      <div className="row">
        <div className="d-flex flex-column justify-content-center align-items-center col-12 col-md-6">
          <img className={Classes.img} src={NotFoundImg} />
        </div>
        <div
          className={`d-flex flex-column justify-content-center align-items-center col-12 col-md-6 ${Classes.aside}`}
        >
          <h1 className="text-center mb-4" style={{ color: "#c5dc50" }}>
            Sorry!
          </h1>
          <h4 className="fw-bold">
            Either you aren't cool enough to visit this page or it does'nt
            exist...{" "}
          </h4>
          <NavLink to='/'>
          <button className="mt-4 btn btn-success w-100 text-center fs-5">
            {" "}
            Go back home
          </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
