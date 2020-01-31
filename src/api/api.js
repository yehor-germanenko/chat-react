import * as axios from "axios";

const token = localStorage.token;

const instance = axios.create({
    /*withCredentials: true,*/
    baseURL: 'https://animals-chat.herokuapp.com/',
    headers:     {
        "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9",
        "Authorization" : token
    }
});


export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },

    login(email, password) {
        return instance.post(`auth/login`, { email, password });
    },
    
    logout() {
        return instance.delete(`auth/login`);
    },

    register(name, email, password){
        return instance.post(`users/create`, {name, email, password});
    },

    deleteUser() {
        return instance.delete(`users/delete`);
    }
}

export const userAPI = {
    getProfile() {
        return instance.get(`profile`);
    },

    updateProfile(name, email, password, newPassword = null) {
        return instance.patch(`profile/update`, {name, email, password, newPassword});
    }
}