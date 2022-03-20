import React from "react";
import Nav from "../nav/Nav";
import Classes from "./Home.module.css";

const Home = (): JSX.Element => {
  return (
    <div className={`d-flex flex-column flex-md-row ${Classes.container}`}>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center col-md-12">
            <div
              className={`card text-white bg-success mt-5 ${Classes.cardWidth}`}
              style={{ maxWidth: "800px" }}
            >
              <div className="card-header text-center">Welcome!</div>
              <div className="card-body">
                <h4 className="card-title text-center">
                  Hi, I am delighted to welcome you to this project.{" "}
                </h4>
                <p className="card-text text-center mt-3 fs-5">
                  This little Crud-app started as a joke in Jovenes a Programar
                  (a programming course that I took), and, in it's moment, it
                  was made using nothing but HTML + Javascript. <br />
                  Over time, I have been learning new technologies, and decided
                  to remake it, but applying my latest knowledge.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center col-md-12">
            <div
              className={`card text-white bg-primary mt-5 mb-5 ${Classes.cardWidth}`}
              style={{ maxWidth: "800px" }}
            >
              <div className="card-header text-center">Even more</div>
              <div className="card-body">
                <h4 className="card-title text-center">Project features. </h4>
                <p className=" card-text text-center mt-3 fs-5">
                  Previously, this project was made using localStorage for
                  storing the data. Nowadays, I have been able to use MongoDB to
                  save the data securely. I also added authentication using JWT.{" "}
                  <br />
                </p>
                <p className="text-center fs-5">
                  Next, all the project features listed below:
                </p>
                <ul
                  className={`text-decoration-none text-center fs-5 ${Classes.ul}`}
                >
                  <li>- Sort by criteria</li>
                  <li>- Add product</li>
                  <li>- Delete product</li>
                  <li>- Update product</li>
                  <li>
                    - Have a warning when your minimum stock is higher than your
                    stock. (dark)
                  </li>
                  <li>- Control your stock safely.</li>
                  <li>- Log in and Log out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
