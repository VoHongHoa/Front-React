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
const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleByDate = (doctorID, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorID) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorID=${doctorID}`);
};
const getProfileDoctorById = (doctorID) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorID=${doctorID}`);
};

const postPatientBooking = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVefifyBookAppontment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?specialtyID=${data.specialtyID}&provinceID=${data.provinceID}`
  );
};
const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinicById = (id) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorID=${data.doctorID}&date=${data.date}`
  );
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
  saveBulkScheduleDoctor,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBooking,
  postVefifyBookAppontment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
};
