import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const hospitalAPI = {
  getAll: () => API.get("/hospitals"),
  getByCity: (city: string) => API.get(`/hospitals/city/${city}`),
  getEmergencies: () => API.get("/emergency"),

  addDoctor: (hospitalId: string, doctor: any) =>
    API.post(`/hospitals/${hospitalId}/doctors`, doctor),

  updateDoctor: (hospitalId: string, index: number, data: any) =>
    API.put(`/hospitals/${hospitalId}/doctors/${index}`, data),

  deleteDoctor: (hospitalId: string, index: number) =>
    API.delete(`/hospitals/${hospitalId}/doctors/${index}`),

  updateHospital: (id: string, data: any) =>
    API.patch(`/hospitals/${id}`, data),

  updateHospitalBeds: (id: string, data: any) =>
    API.put(`/hospitals/${id}`, data),

  update: (id: string, data: any) =>
  API.put(`/hospitals/${id}`, data),

};
