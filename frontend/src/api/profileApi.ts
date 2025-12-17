import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getProfiles = () => axios.get(`${API_URL}/profiles`);
export const getProfileTypes = () => axios.get(`${API_URL}/profileTypes`);

// Corrected: removed headers so Axios can set multipart boundary
export const createProfile = (formData: FormData) =>
    axios.post(`${API_URL}/profiles`, formData);

export const updateProfile = (id: number, data: any) =>
    axios.patch(`${API_URL}/profiles/${id}`, data);

export const deleteProfile = (id: number) =>
    axios.delete(`${API_URL}/profiles/${id}`);
