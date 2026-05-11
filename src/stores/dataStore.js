import { defineStore } from 'pinia';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        services: [],
        categories: [],
        services_total: null,
        errorMessage: "",
        errorCode: "",
        loading: false,
        medworkers: [],
        medworkers_total: null,
        search: ""
    }),
    actions: {
        async get_services(page = 0, perpage = 3, search = "") {
            this.loading = true;
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/services', {
                    params: { page: page, perpage: perpage, search: search }
                });
                this.services = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 1;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 2;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 3;
                    console.log(error);
                }
            } finally {
                this.loading = false;
            }
        },
        async get_services_total(search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/services_total', {
                    params: { search: search }
                });
                this.services_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 1;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 2;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 3;
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
        async create_service(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backendUrl + '/service', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async get_categories() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/categories');
                this.categories = response.data;
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
        async delete_service(id) {
            this.errorMessage = "";
            this.errorCode = 0;
            try {
                const response = await axios.delete(backendUrl + '/service/' + id, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }

            }
        },
        async update_service(formData, id) {
            this.errorMessage = "";
            this.errorCode = 0;
            try {
                console.log(formData);
                const response = await axios.post(backendUrl + '/service/' + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
    },
});