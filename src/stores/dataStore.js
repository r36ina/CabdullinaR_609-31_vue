import { defineStore } from 'pinia';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        services: [],
        services_total: null,
        errorMessage: "",
        loading: false,
        medworkers: [],
        medworkers_total: null,
    }),
    actions: {
        async get_services(page = 0, perpage = 5) {
            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/services', {
                    params: { page: page, perpage: perpage }
                });
                this.services = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            } finally {
                this.loading = false;
            }
        },
        async get_services_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/services_total');
                this.services_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_medworkers(page = 0, perpage = 5) {
            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/medworkers', {
                    params: { page: page, perpage: perpage }
                });
                this.medworkers = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                } else if (error.request) {
                    this.errorMessage = error.message;
                } else {
                    console.log(error);
                }
            } finally {
                this.loading = false;
            }
        },
        async get_medworkers_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/medworkers_total');
                this.medworkers_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                } else if (error.request) {
                    this.errorMessage = error.message;
                } else {
                    console.log(error);
                }
            }
        },
    },
});