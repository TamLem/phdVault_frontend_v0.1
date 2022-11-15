import { defineStore } from "pinia";
import authService from "../services/auth-service";
import { useRouter } from "vue-router";

const router = useRouter();

export const useStore = defineStore({
    id: "main",
    state: () => ({
        user: null,
        role: null,
        tokens: null,
    }),
    actions: {
        setTokens(tokens) {
            this.tokens = tokens;
            localStorage.setItem("tokens", JSON.stringify(tokens));
        },
        setUser(profile) {
            this.user = profile;
            localStorage.setItem("user", JSON.stringify(profile));
        },
        setRoles(roles) {
            this.role = roles;
            localStorage.setItem("role", JSON.stringify(roles));
        },
        clear() {
            this.tokens = this.user = this.role = null;
            // TODO: Delete token and data from storage
            localStorage.removeItem("tokens");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
        },

        async login(user) {
            try {
                let res = await authService.login(user);
                this.setUser(res.user);
                this.setTokens(res.tokens);
                // push to home after this
                //router.replace({ name: '/' });
            } catch (error) {
                throw new Error(error.message)
            }
        },
        logout() {
            this.clear();
        },
        async register(user) {
            try {
                let res = await authService.register(user)
                this.setUser(res.user);
                this.setTokens(res.tokens)
                    // push to home after this
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    getters: {
        isLoggedIn: (state) => {
            return state.user !== null;
        },
        getTokens(state) {
            if (!state.tokens) {
                state.tokens = storage.get("tokens");
            }
            return state.tokens;
        },
        getUser(state) {
            if (!state.user) {
                state.user = storage.get("user");
            }
            return state.user;
        },
        getRole(state) {
            if (!state.role) {
                state.role = storage.get("role");
            }
            return state.role;
        },
    },
});

export default useStore;