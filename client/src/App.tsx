import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import AddProduct from "./components/addProducts/AddProduct";
import NotFound from "./components/notFound/NotFound";

const App = (): JSX.Element => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
