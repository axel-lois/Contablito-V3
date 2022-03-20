import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import Classes from "./AddProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IProduct, IState } from "../../reducer/interfaces";
import { validateForm } from "../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getSingleProduct,
  postProduct,
  putProduct,
} from "../../actions/actions";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export interface IProductErrors {
  name: string;
  description: string;
  stock: string;
  minStock: string;
  price: string;
}

export interface INewProduct {
  name: string;
  description: string;
  stock: number;
  minStock: number;
  price: number;
}

const AddProduct = (): JSX.Element => {
  const product = useSelector((state: IState) => state.productsCopy);
  const id = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<INewProduct>({
    name: "",
    description: "",
    stock: 0,
    minStock: 0,
    price: 0,
  });
  const [errors, setErrors] = useState<IProductErrors>({
    name: "",
    description: "",
    stock: "",
    minStock: "",
    price: "",
  });

  const changeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    if (
      e.currentTarget.name === "stock" ||
      e.currentTarget.name === "minStock" ||
      e.currentTarget.name === "price"
    ) {
      setFormState({
        ...formState,
        [e.currentTarget.name]: parseInt(e.currentTarget.value),
      });
      setErrors(
        validateForm({
          ...formState,
          [e.currentTarget.name]: parseInt(e.currentTarget.value),
        })
      );
    } else {
      setFormState({
        ...formState,
        [e.currentTarget.name]: e.currentTarget.value,
      });
      setErrors(
        validateForm({
          ...formState,
          [e.currentTarget.name]: e.currentTarget.value,
        })
      );
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setErrors(validateForm(formState));
    if (
      !errors.name &&
      !errors.description &&
      !errors.stock &&
      !errors.minStock &&
      !errors.price
    ) {
      if (id.id) {
        dispatch(putProduct(id.id, formState));
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "Your product has been updated.",
          confirmButtonColor: "#18bc9c",
        }).then(() => {
          navigate("/products");
        });
      } else {
        dispatch(postProduct(formState));
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "Your product has been created.",
          confirmButtonColor: "#18bc9c",
        }).then(() => {
          navigate("/products");
        });
      }
    }
  };

  useEffect(() => {
    setErrors(validateForm(formState));
  }, []);

  useEffect(() => {
    if (product.length === 1 && Object.keys(id).length !== 0) {
      setFormState({
        name: product[0].name,
        description: product[0].description,
        stock: product[0].stock,
        minStock: product[0].minStock,
        price: product[0].price,
      });
      setErrors(
        validateForm({
          ...formState,
          name: product[0].name,
          description: product[0].description,
          stock: product[0].stock,
          minStock: product[0].minStock,
          price: product[0].price,
        })
      );
    }
  }, [product]);

  useEffect(() => {
    //get product and put it into form
    if (Object.keys(id).length !== 0) {
      dispatch(getSingleProduct(id.id));
    }
  }, [id]);
  return (
    <div className={`d-flex flex-column flex-md-row ${Classes.cont}`}>
      <Nav />
      <div className={`mt-5 ${Classes.contain}`}>
        <form onSubmit={submitHandler} className={Classes.formContainer}>
          <h3 className="text-center fw-bold">New product</h3>
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productName" className="form-label">
              Product name
            </label>
            <input
              value={formState.name}
              onChange={changeHandler}
              name="name"
              id="productName"
              placeholder="Enter name..."
              className={`form-control ${
                errors.name ? "is-invalid" : "is-valid"
              }`}
              type="text"
            />
            {errors.name && <p className={Classes.error}>{errors.name}</p>}
          </div>
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productDescription" className="form-label">
              Product description
            </label>
            <input
              value={formState.description}
              onChange={changeHandler}
              name="description"
              type="text"
              id="productDescription"
              placeholder="Enter description..."
              className={`form-control ${
                errors.description ? "is-invalid" : "is-valid"
              }`}
            />
            {errors.description && (
              <p className={Classes.error}>{errors.description}</p>
            )}
          </div>
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productStock" className="form-label">
              Stock
            </label>
            <input
              value={formState.stock}
              onChange={changeHandler}
              name="stock"
              min="1"
              type="number"
              id="productStock"
              placeholder="Enter stock..."
              className={`form-control ${
                errors.stock ? "is-invalid" : "is-valid"
              }`}
            />
            {errors.stock && <p className={Classes.error}>{errors.stock}</p>}
          </div>
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="minStock" className="form-label">
              Minimum stock
            </label>
            <input
              value={formState.minStock}
              onChange={changeHandler}
              name="minStock"
              min="1"
              type="number"
              id="minStock"
              placeholder="Enter minimum stock alert..."
              className={`form-control ${
                errors.minStock ? "is-invalid" : "is-valid"
              }`}
            />
            {errors.minStock && (
              <p className={Classes.error}>{errors.minStock}</p>
            )}
          </div>
          <div className={`mb-3 form-group ${Classes.formContainerChild}`}>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              value={formState.price}
              onChange={changeHandler}
              name="price"
              min="1"
              type="number"
              id="price"
              placeholder="Enter price..."
              className={`form-control ${
                errors.price ? "is-invalid" : "is-valid"
              }`}
            />
            {errors.price && <p className={Classes.error}>{errors.price}</p>}
          </div>
          <div className={`mb-3 ${Classes.formContainerChild}`}>
            <button type="submit" className="btn btn-success">
              {" "}
              {id.id ? "Update product " : "Add product "}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
