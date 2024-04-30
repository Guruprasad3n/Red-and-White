import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";

import "./App.css";
import Navigation from "./Components/Navbar";
import Categories from "./Components/Catrgories";
import Products from "./Components/Products";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <Toaster position="bottom-center" />
      <Navigation />
      <Products />
    </>
  );
}

export default App;
