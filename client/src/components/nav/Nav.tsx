import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getUsername, logOut } from "../../actions/actions";
import { IState } from "../../reducer/interfaces";
import Classes from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faAddressCard,
  faBox,
  faSquarePlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Nav = (): JSX.Element => {
  const navigate = useNavigate();
  const username = useSelector((state: IState) => state.username);
  const error = useSelector((state: IState) => state.errors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsername());
  }, []);

  useEffect(() => {
    error.length > 0 && navigate("/");
  }, [error]);

  const onLogout = (): void => {
    Swal.fire({
      icon: "question",
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonColor: "#18bc9c",
      cancelButtonColor: "#c44133",
      confirmButtonText: "Yes, I'm sure.",
      cancelButtonText: "No, I'm not",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
        navigate("/");
      }
    });
  };

  return (
    <div
      className={` d-flex flex-column justify-content-around align-items-center ${Classes.nav}`}
    >
      <div
        className={` d-flex flex-column justify-content-evenly ${Classes.descriptionContainer}`}
      >
        <h3 className="text-center">Contablito V3</h3>
        <p className="text-center">Easiest way to control your stock.</p>
        <p className="mt-md-5 text-center">
          Hi,
          <span style={{ color: "black", fontWeight: "600" }}>
            {" "}
            {username}
          </span>{" "}
          let's manage your products!
        </p>
      </div>
      <div
        className={`d-flex flex-column w-100 text-center  justify-content-around ${Classes.buttonContainer}`}
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? `${Classes.active}` : `${Classes.button}`
          }
          to="/home"
        >
          <FontAwesomeIcon icon={faHouseUser} /> Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${Classes.active}` : `${Classes.button}`
          }
          to="/products"
        >
          <FontAwesomeIcon icon={faBox} /> Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${Classes.active}` : `${Classes.button}`
          }
          to="/addProduct"
        >
          <FontAwesomeIcon icon={faSquarePlus} /> Add products
        </NavLink>
        <a onClick={onLogout} className={Classes.button}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
        </a>
      </div>
    </div>
  );
};

export default Nav;
