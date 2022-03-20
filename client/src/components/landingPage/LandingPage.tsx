import React from "react";
import Classes from "./LandingPage.module.css";
import Hero from "../../img/hero.svg";
import Login from "../login/Login";

const LandingPage = (): JSX.Element => {
  return (
    <div className={`container ${Classes.contain}`}>
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="text-center text-success fw-bold">Contablito</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <img className={Classes.img} src={Hero} />
        </div>
        <div className="col-12 ms-md-4 col-md-5">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
