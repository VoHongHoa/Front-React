import actionTypes from "./actionTypes";
import {
  getAllcodeService,
  createUser,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeservice,
  getAllDoctors,
  saveDetailDoctor,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllcodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchGenderStart", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});
//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAIDLED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUser(data);
      if (res && res.message.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(`${res.message.errMessage}`);
        dispatch(saveUserFailded());
      }
    } catch (e) {
      dispatch(saveUserFailded());
    }
  };
};
export const saveUserFailded = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeservice(3);
      console.log("check res api top doctor", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("fetch all user error!");

        dispatch(fetchAllUserFailded());
      }
    } catch (e) {
      dispatch(fetchAllUserFailded());
    }
  };
};
export const fetchAllUserFailded = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIDLED,
});
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.message.errCode === 0) {
        toast.success("Delete a new user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete a new user error!");
        dispatch(deleteUserFailded());
      }
    } catch (e) {
      dispatch(deleteUserFailded());
    }
  };
};
export const deleteUserFailded = () => ({
  type: actionTypes.DELETE_USER_FAIDLED,
});
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const editUser = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Edit a user error!");
        dispatch(editUserFailded());
      }
    } catch (e) {
      toast.error("Edit a user error!");
      dispatch(editUserFailded());
    }
  };
};
export const editUserFailded = () => ({
  type: actionTypes.EDIT_USER_FAIDLED,
});
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const fetchTopDoctor = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeservice("");
      //console.log("check doctor", res);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.doctors));
      } else {
        dispatch(fetchTopDoctorFailded());
      }
    } catch (e) {
      dispatch(fetchTopDoctorFailded());
    }
  };
};
export const fetchTopDoctorFailded = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAIDLED,
});
export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  topDoctors: data,
});

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      //console.log("check doctor", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFailded());
      }
    } catch (e) {
      dispatch(fetchAllDoctorFailded());
    }
  };
};
export const fetchAllDoctorFailded = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIDLED,
});
export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  allDoctors: data,
});

export const actionSaveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save info doctor succeed");
        dispatch(actionSaveDoctorSuccess());
      } else {
        toast.error("Save info a doctor error!");
        dispatch(actionSaveDoctorFailded());
      }
    } catch (e) {
      toast.error("Save info a doctor error!");
      dispatch(actionSaveDoctorFailded());
    }
  };
};
export const actionSaveDoctorFailded = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAIDLED,
});
export const actionSaveDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("TIME");
      if (res && res.errCode === 0) {
        //toast.success("Save info doctor succeed");
        dispatch(fetchAllScheduleTimeSuccess(res.data));
      } else {
        //toast.error("Save info a doctor error!");
        dispatch(fetchAllScheduleTimeFailded());
      }
    } catch (e) {
      //toast.error("Save info a doctor error!");
      dispatch(fetchAllScheduleTimeFailded());
    }
  };
};
export const fetchAllScheduleTimeFailded = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDLED,
});
export const fetchAllScheduleTimeSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  time: data,
});

export const getDoctorPrice = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("PRICE");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorPriceSuccess(res.data));
      } else {
        dispatch(fetchDoctorPriceFailed());
      }
    } catch (e) {
      dispatch(fetchDoctorPriceFailed());
    }
  };
};
export const fetchDoctorPriceSuccess = (doctorPriceData) => ({
  type: actionTypes.FETCH_DOCTOR_PRICE_SUCCESS,
  doctorPriceData: doctorPriceData,
});
export const fetchDoctorPriceFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_PRICE_FAILDED,
});

export const getDoctorPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorPaymentSuccess(res.data));
      } else {
        dispatch(fetchDoctorPaymentFailed());
      }
    } catch (e) {
      dispatch(fetchDoctorPaymentFailed());
    }
  };
};
export const fetchDoctorPaymentSuccess = (doctorPaymentData) => ({
  type: actionTypes.FETCH_DOCTOR_PAYMENT_SUCCESS,
  doctorPaymentData: doctorPaymentData,
});
export const fetchDoctorPaymentFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_PAYMENT_FAILDED,
});

export const getDoctorProvince = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeService("PROVINCE");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorProvinceSuccess(res.data));
      } else {
        dispatch(fetchDoctorProvinceFailed());
      }
    } catch (e) {
      dispatch(fetchDoctorProvinceFailed());
    }
  };
};
export const fetchDoctorProvinceSuccess = (doctorProvinceData) => ({
  type: actionTypes.FETCH_DOCTOR_PROVINCE_SUCCESS,
  doctorProvinceData: doctorProvinceData,
});
export const fetchDoctorProvinceFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_PROVINCE_FAILDED,
});

export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      //console.log(res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtySuccess(res.data));
      } else {
        dispatch(fetchAllSpecialtyFailed());
      }
    } catch (e) {
      dispatch(fetchAllSpecialtyFailed());
    }
  };
};
export const fetchAllSpecialtySuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  allSpecialty: data,
});
export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILDED,
});

export const fetchAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();
      //console.log(res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllClinicSuccess(res.data));
      } else {
        dispatch(fetchAllClinicFailed());
      }
    } catch (e) {
      dispatch(fetchAllClinicFailed());
    }
  };
};
export const fetchAllClinicSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  allClinic: data,
});
export const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILDED,
});
