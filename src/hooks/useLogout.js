import Router from "next/router";


export const logoutAuth = () => {
   Router.replace("/login");
  };