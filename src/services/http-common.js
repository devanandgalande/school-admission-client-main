import axios from "axios";

export default axios.create({
  baseURL: "https://weak-erin-alligator-vest.cyclic.app/api",
  // baseURL: process.env.SERVER_URL,
  headers: {
    "Content-type": "application/json"
  }
});