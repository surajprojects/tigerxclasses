import axios from "axios";

const axiosProtected = axios.create({
    baseURL: "http://localhost:3000/api/protected",
});

export default axiosProtected;