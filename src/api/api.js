import * as axios from "axios";


const instance = axios.create({
    /*withCredentials: true,*/
    baseURL: 'https://animals-chat.herokuapp.com/',
    headers:     {
        "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9"
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
    
    updateData(name, email, password) {
        return instance.patch(`user/update`, {name, email, password});
    }
}

export const updateAPI = {
    
}