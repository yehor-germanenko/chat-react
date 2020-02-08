import {authAPI} from "../api/api";

export default () => {
    authAPI.refresh().then(response => {
        localStorage.setItem("token", response.data.token);
    });
}