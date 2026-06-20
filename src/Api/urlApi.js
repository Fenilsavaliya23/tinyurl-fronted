import axios from "./axiosConfig";

const BASE_URL = "http://localhost:8080/api/v1/url";

export const shortenUrl = async (requestData) => {

  const response = await axios.post(`${BASE_URL}/shorten`, requestData);

  return response.data;
};

export const getUrlStats = async (shortCode) => {

  const response = await axios.get(`${BASE_URL}/stats/${shortCode}`);

  return response.data;
};

export const getMyUrls = async () => {
    
  const response = await axios.get(`${BASE_URL}/my-urls`);

  return response.data;
};

export const deleteUrl = async (shortCode) => {

  const response = await axios.delete(`${BASE_URL}/${shortCode}`);

  return response.data;
} 

export const updateAlias = async (shortCode, newAlias) => {

  const response = await axios.patch(`${BASE_URL}/${shortCode}/alias`, { newAlias });

  return response.data;
}

export const getDashboardStats = async () => {

  const response = await axios.get(`${BASE_URL}/dashboard`);

  return response.data;
}

export const getQrCodeUrl = async (shortCode) => {

  return `${BASE_URL}/${shortCode}/qr`;

}

export const getQrCode = async (shortCode) => {
    const response = await axios.get(`${BASE_URL}/${shortCode}/qr`, { responseType: 'blob' });
    
    return response.data;
}  