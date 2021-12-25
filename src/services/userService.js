import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (inputId) => {
  //   return axios.get(`/api/get-all-users?id = ${inputId}`);
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createUser = (data) => {
  //   return axios.get(`/api/get-all-users?id = ${inputId}`);
  //console.log("check data axios", data);
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  //console.log("check data axios", userId);
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (data) => {
  // console.log("check data axios", data);
  return axios.put(`/api/edit-user`, data);
};
const getAllcodeService = (inputType) => {
  // console.log("check data axios", data);
  return axios.get(`/api/get-allcode?type=${inputType}`);
};
const getTopDoctorHomeservice = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctor = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createUser,
  deleteUserService,
  editUserService,
  getAllcodeService,
  getTopDoctorHomeservice,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
};
