import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Deal from "./pages/Deal";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Cart from "./features/cart/Cart";
import Checkout from "./features/checkout/Checkout";
import RequireAuth from "./features/auth/RequireAuth";
import Signup from "./features/auth/Signup";
import Signin from "./features/auth/Signin"
import ProductDetail from "./features/product/ProductDetail";
import { homeLoader } from "./loaders/homeloader";
import { shopLoader } from "./loaders/shoploader";
import { productLoader } from "./loaders/productloader";
import { dealLoader } from "./loaders/dealloader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "shop",
        element: <Shop />,
        loader: shopLoader,                     
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
        loader: productLoader,                   
      },
      { path: "cart", 
        element: (
         <RequireAuth>
            <Cart /> 
          </RequireAuth>
          ) },
      { path: "about", element: <About /> },
      { path: "*",     element: <NotFound /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "checkout", element: <Checkout /> },
      { path: "deals", 
        element: <Deal />,
        loader: dealLoader,
       },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;