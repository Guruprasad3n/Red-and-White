import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Navigation from "./Components/Navbar";
import Products from "./Components/Products";
import { Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";

function App() {

  return (
    <>
      <Toaster position="bottom-center" />
      <Navigation />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
