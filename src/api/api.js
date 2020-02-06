import * as axios from "axios";

//const token = localStorage.token;

let createInstance = (token) =>{
    return axios.create({
        baseURL: 'https://animals-chat.herokuapp.com/',
        headers:     {
            "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9",
            "Authorization" : "Bearer " + token
        }
    });
}

const instanceWithoutToken = axios.create({
    baseURL: 'https://animals-chat.herokuapp.com/',
    headers:     {
        "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9"
    }
});

export const authAPI = {
    me() {
        console.log("auth/me");
        return createInstance(localStorage.token).get(`auth/me`);
    },

    login(email, password, rememberMe) {
        return instanceWithoutToken.post(`auth/login`, { email, password, rememberMe});
    },
    
    logout() {
        return createInstance(localStorage.token).delete(`auth/login`);
    },

    register(name, email, password){
        return instanceWithoutToken.post(`users/create`, {name, email, password});
    },

    deleteUser() {
        return createInstance(localStorage.token).delete(`users/delete`);
    },

    refresh(){
        console.log("localStorage.token", localStorage.token)
        return createInstance(localStorage.token).post(`refresh`);
    }
}

export const userAPI = {
    getProfile() {
        return createInstance(localStorage.token).get(`profile`);
    },

    updateProfile(name, email, password, newPassword = null) {
        return createInstance(localStorage.token).patch(`profile/update`, {name, email, password, newPassword});
    }
}


export const chatAPI = {
    addRoom(name) {
        return createInstance(localStorage.token).post(`rooms`, {name});
    },

    addMessage(id, message) {
        return createInstance(localStorage.token).post(`rooms/${id}/messages`, {message});
    },

    addUserToRoom(id, name) {
        return createInstance(localStorage.token).post(`rooms/${id}/users/add`, {name});
    },

    RemoveUserFromRoom(id, name) {
        return createInstance(localStorage.token).post(`/rooms/${id}/users/remove`, {name});
    },
    // New requests
    getRooms() {
        return createInstance(localStorage.token).get(`/rooms`);
    },

    getMessages(id){
        return createInstance(localStorage.token).get(`/rooms/${id}/messages`);
    },

    /*deleteRoom(id){
        return createInstance(localStorage.token).delete(`/rooms/${id}/delete`);
    }*/
}

/*const instance = axios.create({
    baseURL: 'https://animals-chat.herokuapp.com/',
    headers:     {
        "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9",
        "Authorization" : "Bearer " + token
    }
});*/