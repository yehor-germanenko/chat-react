import {authAPI} from "../api/api";

export default () => {
    authAPI.refresh().then(response => {
        console.log("refreshToken", response);
        localStorage.setItem("token", response.data.token);
        console.log("localStorage.getItem", localStorage.getItem("token"));
    });
}