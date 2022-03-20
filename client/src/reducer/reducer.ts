import { sortByCriteria } from "../utils/sort";
import { IState } from "./interfaces";

const initialState: IState = {
  username: "",
  products: [],
  productsCopy: [],
  errors: [],
};

const rootReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case "GET_USERNAME":
      return {
        ...state,
        errors: [],
        username: action.payload,
      };
    case "GET_USERNAME_ERROR":
      return {
        ...state,
        errors: [action.payload],
      };
    case "USER_LOGOUT":
      return {
        ...state,
        username: action.payload, //nothing basically
        products: [],
        productsCopy: [],
        errors: [],
      };
    case "USER_LOGOUT_ERROR":
      return {
        ...state,
        errors: [action.payload],
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        productsCopy: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        errors: [],
      };
    case "DELETE_ERROR":
      return { ...state, errors: [action.payload] };
    case "GET_SINGLE_PRODUCT":
      return {
        ...state,
        productsCopy: [action.payload],
        errors: [],
      };
    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        errors: [action.payload],
      };
    case "PUT_PRODUCT":
      return { ...state, errors: [] };
    case "PUT_ERROR":
      return {
        ...state,
        errors: [action.payload],
      };
    case "SORT_PRODUCTS":
      return {
        ...state,
        productsCopy: sortByCriteria(action.payload, state.products),
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
