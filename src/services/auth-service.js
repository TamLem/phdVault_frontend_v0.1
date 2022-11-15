import axios from "axios";

const API_URL = "http://localhost:3000/v1/auth/";

class AuthService {
    async login(user) {
        let res;
        await axios
            .post(API_URL + "login", {
                email: user.email,
                password: user.password,
            })
            .then((response) => {
                res = response.data;
            })
            .catch((error) => {
                if (error.response.data.status === 404)
                    throw new Error("Server Error");
                throw new Error(error.response.data.message);
            });
        return res;
    }

    logout() {
        localStorage.removeItem("user");
    }

    async register(user) {
        let res;
        await axios
            .post(API_URL + "register", {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            })
            .then((response) => {
                res = response.data;
            })
            .catch((error) => {
                throw new Error(error.response.data.message);
            });
        return res;
    }
}

export default new AuthService();