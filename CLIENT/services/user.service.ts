import Router from "next/router";

export const userService = {
  logout,
};

function logout() {
  Router.push("/");
}
