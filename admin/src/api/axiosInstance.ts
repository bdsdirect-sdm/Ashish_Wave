import axios from "axios";
// import { Local } from "../environment/env";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export default api;