import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import Classes from "./AddProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IState } from "../../reducer/interfaces";
import { validateForm } from "../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  getSingleProduct,
  postProduct,
  putProduct,
} from "../../actions/actions";
import Swal from "sweetalert2";

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
  const { id } = useParams();
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

  const [touched, setTouched] = useState<
    Partial<Record<keyof INewProduct, boolean>>
  >({});

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product.length === 1 && id) {
      setFormState(product[0]);
      setErrors(validateForm(product[0]));
    }
  }, [product, id]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const parsedValue = ["stock", "minStock", "price"].includes(name)
      ? parseInt(value) || 0
      : value;

    setFormState((prev) => ({ ...prev, [name]: parsedValue }));
    setTouched((prev) => ({ ...prev, [name]: true })); // Marcar campo como tocado
    setErrors(validateForm({ ...formState, [name]: parsedValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTouched({
      name: true,
      description: true,
      stock: true,
      minStock: true,
      price: true,
    });

    const validationErrors = validateForm(formState);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) return;

    if (id) {
      dispatch(putProduct(id, formState));
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "Your product has been updated.",
        confirmButtonColor: "#18bc9c",
      }).then(() => navigate("/products"));
    } else {
      dispatch(postProduct(formState));
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "Your product has been created.",
        confirmButtonColor: "#18bc9c",
      }).then(() => navigate("/products"));
    }
  };

  return (
    <div className={`d-flex flex-column flex-md-row ${Classes.cont}`}>
      <Nav />
      <div className={`mt-5 ${Classes.contain}`}>
        <form onSubmit={submitHandler} className={Classes.formContainer}>
          <h3 className="text-center fw-bold">
            {id ? "Edit Product" : "New Product"}
          </h3>

          {/* Product Name */}
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              value={formState.name}
              onChange={changeHandler}
              onBlur={handleBlur}
              name="name"
              id="productName"
              placeholder="Enter name..."
              className={`form-control ${
                touched.name && errors.name ? "is-invalid" : ""
              }`}
              type="text"
            />
            {touched.name && errors.name && (
              <p className={Classes.error}>{errors.name}</p>
            )}
          </div>

          {/* Product Description */}
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productDescription" className="form-label">
              Product Description
            </label>
            <input
              value={formState.description}
              onChange={changeHandler}
              onBlur={handleBlur}
              name="description"
              type="text"
              id="productDescription"
              placeholder="Enter description..."
              className={`form-control ${
                touched.description && errors.description ? "is-invalid" : ""
              }`}
            />
            {touched.description && errors.description && (
              <p className={Classes.error}>{errors.description}</p>
            )}
          </div>

          {/* Stock */}
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="productStock" className="form-label">
              Stock
            </label>
            <input
              value={formState.stock}
              onChange={changeHandler}
              onBlur={handleBlur}
              name="stock"
              type="number"
              id="productStock"
              placeholder="Enter stock..."
              className={`form-control ${
                touched.stock && errors.stock ? "is-invalid" : ""
              }`}
            />
            {touched.stock && errors.stock && (
              <p className={Classes.error}>{errors.stock}</p>
            )}
          </div>

          {/* Minimum Stock */}
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="minStock" className="form-label">
              Minimum Stock
            </label>
            <input
              value={formState.minStock}
              onChange={changeHandler}
              onBlur={handleBlur}
              name="minStock"
              type="number"
              id="minStock"
              placeholder="Enter minimum stock..."
              className={`form-control ${
                touched.minStock && errors.minStock ? "is-invalid" : ""
              }`}
            />
            {touched.minStock && errors.minStock && (
              <p className={Classes.error}>{errors.minStock}</p>
            )}
          </div>

          {/* Price */}
          <div className={`form-group ${Classes.formContainerChild}`}>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              value={formState.price}
              onChange={changeHandler}
              onBlur={handleBlur}
              name="price"
              type="number"
              id="price"
              placeholder="Enter price..."
              className={`form-control ${
                touched.price && errors.price ? "is-invalid" : ""
              }`}
            />
            {touched.price && errors.price && (
              <p className={Classes.error}>{errors.price}</p>
            )}
          </div>

          <div className={`mb-3 ${Classes.formContainerChild}`}>
            <button type="submit" className="btn btn-success">
              {id ? "Update Product " : "Add Product "}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
