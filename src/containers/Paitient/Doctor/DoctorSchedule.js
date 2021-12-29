import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import moment from "moment";

import localization from "moment/locale/vi";
import { getScheduleByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      allAvailbleTime: [],
    };
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  setSelectedDate = () => {
    let { language } = this.props;
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let label = moment(new Date()).add(i, "day").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(label);

        //object.value = moment(new Date()).add(i, "day").startOf("day").valueOf();
      } else {
        object.label = moment(new Date())
          .add(i, "day")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "day").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };
  async componentDidMount() {
    let arrDay = this.setSelectedDate();
    //console.log(arrDay);
    if (arrDay && arrDay.length > 0) {
      this.setState({
        allDay: arrDay,
      });
    }
  }
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
      let arrDay = this.setSelectedDate();
      this.setState({
        allDay: arrDay,
      });
    }
    if (prevProp.doctorID !== this.props.doctorID) {
      let arrDay = this.setSelectedDate();
      let res = await getScheduleByDate(this.props.doctorID, arrDay[0].value);

      this.setState({
        allAvailbleTime: res.data ? res.data : [],
      });
    }
  }
  handelOnchangeSelect = async (event) => {
    if (this.props.doctorID && this.props.doctorID !== -1) {
      let date = event.target.value;
      let doctorID = this.props.doctorID;
      let res = await getScheduleByDate(doctorID, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailbleTime: res.data ? res.data : [],
        });
      }
      //console.log("check res", res);
    }
  };
  render() {
    let { allDay, allAvailbleTime } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-schedule-container">
        <div className="all-availble-date mb-2">
          <select
            className="select-date"
            onChange={(event) => this.handelOnchangeSelect(event)}
          >
            {allDay &&
              allDay.length > 0 &&
              allDay.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-availble-time">
          <div className="text-calendar">
            <span className="mb-2">
              <i class="fas fa-calendar"></i>
              <FormattedMessage id="menu.doctor.schedule" />
            </span>
            <div className="time-content">
              {allAvailbleTime && allAvailbleTime.length > 0 ? (
                allAvailbleTime.map((item, index) => {
                  let timeEn = item.timeTypeData.valueEn;
                  let timeVi = item.timeTypeData.valueVi;
                  return (
                    <button className="time-content-item" key={index}>
                      {language === LANGUAGES.VI ? timeVi : timeEn}
                    </button>
                  );
                })
              ) : (
                <span className="notice">Không có dữ liệu</span>
              )}
            </div>
            <div className="book-free mt-2">
              {allAvailbleTime && allAvailbleTime.length > 0 && (
                <span>
                  Xem và đặt lịch <i class="far fa-hand-point-up"></i> (miễn
                  phí)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
