import axios, { Axios, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { IProduct } from "../reducer/interfaces";
import { INewProduct } from "../components/addProducts/AddProduct";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const getUsername = (): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.get("/api/auth/profile", {
        headers: {
          "auth-token": token,
        },
      });
      dispatch({ type: "GET_USERNAME", payload: response.data.username });
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      dispatch({ type: "GET_USERNAME_ERROR", payload: e });
    }
  };
};

export const logOut = (): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.delete("/api/auth/logout", {
        headers: {
          "auth-token": token,
        },
      });
      localStorage.removeItem("sessionToken");
      dispatch({ type: "USER_LOGOUT", payload: "" });
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      dispatch({ type: "USER_LOGOUT_ERROR", payload: e });
    }
  };
};

export const getProducts = (): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.get("/products/getProducts", {
        headers: {
          "auth-token": token,
        },
      });
      dispatch({ type: "GET_PRODUCTS", payload: response.data });
    } catch (error: any) {
      //Nothing to do, if there are no products, conditional renderization.
    }
  };
};

export const postProduct = (product: INewProduct): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.post(
        "/products/createProduct",
        product,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({ type: "POST_PRODUCT", payload: response.data });
    } catch (error: any) {
      //No errors possible, form control does all the needed.
    }
  };
};

export const deleteProduct = (id: string): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.delete(
        `/products/deleteProduct/${id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({ type: "DELETE_PRODUCT", payload: response.data });
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      dispatch({ type: "DELETE_ERROR", payload: e });
    }
  };
};

export const getSingleProduct = (id: any): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.get(
        `/products/getProduct/${id}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({ type: "GET_SINGLE_PRODUCT", payload: response.data.product });
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      dispatch({ type: "GET_PRODUCT_ERROR", payload: e });
    }
  };
};

export const putProduct = (id: any, product: INewProduct): any => {
  return async function (dispatch: Dispatch) {
    try {
      const token: string = JSON.parse(
        localStorage.getItem("sessionToken") || "{}"
      );
      const response: AxiosResponse = await axios.put(
        `/products/putProduct/${id}`,
        product,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      dispatch({ type: "PUT_PRODUCT", payload: "" }); //no payload needed
    } catch (error: any) {
      const e = error.response.data.errorMsg;
      dispatch({ type: "PUT_ERROR", payload: e });
    }
  };
};

export const sortProducts  = (criteria: string): any => {
  return {type: 'SORT_PRODUCTS', payload: criteria}
}