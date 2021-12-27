import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  time: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      //console.log("fetch gender start;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.isLoadingGender = false;
      state.genders = [];
      //console.log("fetch gender faided;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      state.positions = [];
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIDLED:
      state.roles = [];
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAIDLED:
      state.roles = [];
      //console.log("fetch gender success;", action);
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.topDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIDLED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.allDoctors;
      //console.log(action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIDLED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.time = action.time;
      //console.log(action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIDLED:
      state.time = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
