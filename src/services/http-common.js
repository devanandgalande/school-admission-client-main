import axios from "axios";

export default axios.create({
  baseURL: "https://school-admission-server-main.onrender.com/api",
  // baseURL: process.env.SERVER_URL,
  headers: {
    "Content-type": "application/json"
  }
});