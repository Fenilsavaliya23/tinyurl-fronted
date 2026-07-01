import axiosInstance from "./axiosConfig";

const BASE_URL = "/api/admin";

export const getAdminDashboard = async () => {
    
    const response = await axiosInstance.get(`${BASE_URL}/dashboard`);

    return response.data;
}    

export const getAllUsers = async () => {

    const response = await axiosInstance.get(`${BASE_URL}/users`);

    return response.data;
}

export const getAllUrls = async () => {

    const response = await axiosInstance.get(`${BASE_URL}/urls`);

    return response.data;
}

export const getTopUsers = async () => {

    const response = await axiosInstance.get(`${BASE_URL}/top-users`);

    return response.data;
};

export const getTopUrls = async () => {

    const response = await axiosInstance.get(`${BASE_URL}/top-urls`);

    return response.data;
};

export const promoteUser = async (userId) => {

    const response = await axiosInstance.patch(
        `${BASE_URL}/users/${userId}/promote`
    );

    return response.data;
};

export const demoteUser = async (userId) => {

    const response = await axiosInstance.patch(
        `${BASE_URL}/users/${userId}/demote`
    );

    return response.data;
};

export const deleteUser = async (userId) => {

    const response = await axiosInstance.delete(
        `${BASE_URL}/users/${userId}`
    );

    return response.data;
};

export const deleteAdminUrl = async (urlId) => {

    const response = await axiosInstance.delete(
        `${BASE_URL}/urls/${urlId}`
    );

    return response.data;
};