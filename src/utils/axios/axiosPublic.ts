import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: "https://tigerxclasses.vercel.app/api",
});

export default axiosPublic;