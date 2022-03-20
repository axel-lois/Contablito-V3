import { IValues } from "../components/login/Login";
import { INewValues } from "../components/signup/SignUp";
import { IProductErrors } from "../components/addProducts/AddProduct";
import { IProduct } from "../reducer/interfaces";
import { INewProduct } from "../components/addProducts/AddProduct";

export const validateLogin = (values: IValues): IValues => {
  let errors: IValues = {
    email: "",
    password: "",
  };
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email.trim()) {
    errors.email = "Please fill in the blank.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!values.password.trim()) {
    errors.password = "Please fill in the blank.";
  } else if (values.password.trim().length < 6) {
    errors.password = "Password length must be higher than 6.";
  }

  return errors;
};

export const validateSignup = (values: INewValues): INewValues => {
  let errors: INewValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email.trim()) {
    errors.email = "Please fill in the blank.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email.";
  }
  if (!values.username.trim()) {
    errors.username = "Please fill in the blank.";
  } else if (values.username.trim().length < 4) {
    errors.username = "Username must be 4 characters or longer.";
  }
  if (!values.password.trim()) {
    errors.password = "Please fill in the blank.";
  } else if (values.password.trim().length < 6) {
    errors.password = "Password must be 6 characters or longer.";
  }
  if (!values.passwordConfirm.trim()) {
    errors.passwordConfirm = "Please fill in the blank.";
  } else if (values.passwordConfirm.trim().length < 6) {
    errors.passwordConfirm = "Password must be 6 characters or longer.";
  }
  if (values.password.trim() !== values.passwordConfirm.trim()) {
    errors.password = "Password does not match.";
    errors.passwordConfirm = "Password does not match.";
  }

  return errors;
};

export const validateForm = (values: INewProduct): IProductErrors => {
  const errors: IProductErrors = {
    name: "",
    description: "",
    stock: "",
    minStock: "",
    price: "",
  };
  if (!values.name.trim()) {
    errors.name = "Please fill in the blank";
  } else if (values.name.trim().length < 4) {
    errors.name = "Name must be four characters or longer.";
  }
  if (!values.description.trim()) {
    errors.description = "Please fill in the blank.";
  } else if (values.description.trim().length < 4) {
    errors.description = "Description must be four characters or longer.";
  }
  if (!values.stock) {
    errors.stock = "Please enter a valid number.";
  } else if (values.stock < 1) {
    errors.stock = "Stock has to be one or higher.";
  }
  if (!values.minStock) {
    errors.minStock = "Please enter a valid number.";
  } else if (values.minStock < 1) {
    errors.minStock = "Minimum stock alert has to be one or higher.";
  }
  if (!values.price) {
    errors.price = "Please enter a valid number.";
  } else if (values.price < 1) {
    errors.price = "Price has to be one or higher.";
  }
  return errors;
};
