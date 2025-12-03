import axios from "axios";

const axiosProtected = axios.create({
    // baseURL: "http://localhost:3000/api/protected",
    baseURL: "https://tigerxclasses.vercel.app/api/protected",
});

export default axiosProtected;