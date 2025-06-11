import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { userStore } from "../store/userStore";
import { role } from "../hooks/role"; 

export function restrictLoader() {
  const token = Cookies.get("token");

  if (!token) {
    return null; 
  }

  const { user } = userStore.getState();

  if (user && user.role && role[user.role]) {
    return redirect(role[user.role]);
  }

  return redirect("/"); 
}
