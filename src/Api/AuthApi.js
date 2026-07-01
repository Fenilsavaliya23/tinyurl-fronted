import React from 'react'
import Axios from './axiosConfig'

const BASE_URL = "/api/auth";

export const signupUser = async (userData) => {
    const response = await Axios.post(`${BASE_URL}/signup`, userData);

    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await Axios.post(`${BASE_URL}/login`, credentials);

    return response.data;
};