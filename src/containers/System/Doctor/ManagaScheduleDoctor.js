import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ManageScheduleDoctor.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import { saveBulkScheduleDoctor } from "../../../services/userService";
import _ from "lodash";
//import FormattedDate from "../../../components/Formating/FormattedDate";
class ManageScheduleDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      selectedDoctor: {},
      rangeTime: [],
      currentDate: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  buildDataInput = (inputData) => {
    let result = [];
    let language = this.props.lang;
    //console.log("language", language);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName}`;
        object.value = item.id;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, sprevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInput(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.lang !== this.props.lang) {
      let dataSelect = this.buildDataInput(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      let data = this.props.dataTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnchangeDatepicker = (date) => {
    //console.log("check date", value);
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickButtonTime = (time) => {
    //console.log(item);
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    this.setState({
      rangeTime: rangeTime,
    });
  };
  hadleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    //let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorID = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected Time!");
        return;
      }
      //console.log(selectedTime);
    }
    //console.log(result);
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorID: selectedDoctor.value,
      date: formatDate,
    });
    console.log("check res save bulk create", res);
  };
  render() {
    const { isLoggedIn } = this.props;
    let { allDoctors, rangeTime } = this.state;
    let language = this.props.lang;
    return (
      <React.Fragment>
        <div className="container manage-schedule-container">
          <div className="m-s-title row">
            <div className="title">
              <FormattedMessage id="manage-schedule.title" />
            </div>
          </div>
          <div className="row mt-3 m-s-input">
            <div className="col-6">
              <form className="form-group">
                <label>
                  <FormattedMessage id="manage-schedule.select-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={allDoctors}
                />
              </form>
            </div>
            <div className="col-6">
              <form className="form-group">
                <label>
                  <FormattedMessage id="manage-schedule.select-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatepicker}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={new Date()}
                />
              </form>
            </div>
            <div className="input-schedule-time mt-5">
              <h5 className="input-schedule-title">
                <FormattedMessage id="manage-schedule.select-time" />
              </h5>
              <div className=" col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === false
                            ? "btn m-s-grid-item"
                            : "btn m-s-grid-item active"
                        }
                        key={index}
                        onClick={() => this.handleClickButtonTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={() => this.hadleSaveSchedule()}
          >
            <FormattedMessage id="manage-schedule.save" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    lang: state.app.language,
    dataTime: state.admin.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageScheduleDoctor);
