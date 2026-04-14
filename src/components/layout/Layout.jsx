import React from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";

export default function Layout({ cartCount }){
  return(
    <>
    <ScrollToTop />
      <Header cartCount={cartCount}/>
      <Outlet />
      <Footer />
    </>
  )
}