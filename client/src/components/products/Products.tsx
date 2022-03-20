import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteProduct,
  getProducts,
  sortProducts,
} from "../../actions/actions";
import { IProduct, IState } from "../../reducer/interfaces";
import Nav from "../nav/Nav";
import Classes from "./Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

const Products = (): JSX.Element => {
  const dispatch = useDispatch();
  const products = useSelector((state: IState) => state.productsCopy);
  const navigate = useNavigate();
  const [fakeState, setFakeState] = useState<boolean>(false);

  const handleSort = (e: React.FormEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(sortProducts(e.currentTarget.id));
    setFakeState(!fakeState);
  };

  const updateOrNot = (id: string): void => {
    Swal.fire({
      title: "Are you sure you want to update this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#18bc9c",
      cancelButtonColor: "#c44133",
      confirmButtonText: "Yes, I'm sure.",
      cancelButtonText: "No, I'm not",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/updateProduct/${id}`);
      }
    });
  };
  const deleteHandler = (id: string): void => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#18bc9c",
      cancelButtonColor: "#c44133",
      confirmButtonText: "Yes, I'm sure.",
      cancelButtonText: "No, I'm not",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
        }).then(() => window.location.reload());
      }
    });
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={`d-flex flex-column flex-md-row ${Classes.cont}`}>
      <Nav />
      <div className={`${Classes.contain}`}>
        <div className="table-responsive">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Product name</th>
                <th scope="col">Description</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                products.map((product: IProduct) => {
                  return (
                    <tr
                      key={product._id}
                      className={`table-active ${
                        product.minStock > product.stock && "table-dark"
                      }`}
                    >
                      <th scope="row">{product.name}</th>
                      <td>{product.description}</td>
                      <td>{product.stock} Un.</td>
                      <td>${product.price}</td>
                      <td>
                        {/* <NavLink to={`/updateProduct/${product._id}`}> */}
                        <button
                          onClick={() => updateOrNot(product._id)}
                          className="btn btn-success me-1"
                        >
                          Update
                        </button>
                        {/* </NavLink> */}
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={Classes.filterButtons}>
          <div className="btn-group dropup ">
            <button
              type="button"
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faArrowUpWideShort} /> Sort Asc.
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  onClick={handleSort}
                  id="ascName"
                  className="dropdown-item"
                  href="#"
                >
                  Product name
                </a>
              </li>
              <li>
                <a
                  onClick={handleSort}
                  id="ascStock"
                  className="dropdown-item"
                  href="#"
                >
                  Stock
                </a>
              </li>
              <li>
                <a
                  onClick={handleSort}
                  id="ascPrice"
                  className="dropdown-item"
                  href="#"
                >
                  Price
                </a>
              </li>
            </ul>
          </div>

          <div className="btn-group dropup">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faArrowDownWideShort} /> Sort Desc.
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  onClick={handleSort}
                  id="descName"
                  className="dropdown-item"
                  href="#"
                >
                  Product name
                </a>
              </li>
              <li>
                <a
                  onClick={handleSort}
                  id="descStock"
                  className="dropdown-item"
                  href="#"
                >
                  Stock
                </a>
              </li>
              <li>
                <a
                  onClick={handleSort}
                  id="descPrice"
                  className="dropdown-item"
                  href="#"
                >
                  Price
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
