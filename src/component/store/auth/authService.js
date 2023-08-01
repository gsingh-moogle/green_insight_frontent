import axios from "axios";
export const baseURL=process.env.REACT_APP_BASE_URL

const authLoginPost = async (userData) => {

    try {
        const response = await axios.post(
            baseURL + "login", userData
        );
        if(response.data?.message === "User Logged In Successfully."){         
          localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data))
        }
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const authLoginBucketPost = async (userData) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_BASE_URL_BLOB + "login", userData
        );
       
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const authPostOtp = async (userData) => {

    try {
        const response = await axios.post(
            baseURL + "verify-otp", userData
        );
        localStorage.setItem("loginDetails", JSON.stringify(response?.data?.data))
        return response?.data?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}
const authLogoutPost = async () => {

    localStorage.removeItem("user");

}

const getFiltersDate = async (token) => {

    try {
        const response = await axios.get(
            baseURL + "graph/filters/dates", token
        );
        return response?.data
    }
    catch (error) {
        console.err(error);
        throw (error)
    }
}

const authService = {
    authLoginPost,
    authLogoutPost,
    authPostOtp,
    getFiltersDate,
    authLoginBucketPost
}



export default authService;