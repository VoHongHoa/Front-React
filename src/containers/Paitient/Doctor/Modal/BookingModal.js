import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import _, { size } from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import { LANGUAGES } from "../../../../utils/constant";
import localization from "moment/locale/vi";
import moment from "moment";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { postPatientBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      reason: "",
      birthday: "",

      doctorID: "",

      genders: "",
      selectedGender: "",
      timeType: "",
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
    this.setState({
      doctorID: this.props.dataBookingModal.doctorID,
    });
  }
  buildDatagender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
      this.setState({
        genders: this.buildDatagender(this.props.genderRedux),
      });
    }
    if (prevProp.genderRedux !== this.props.genderRedux) {
      this.setState({
        genders: this.buildDatagender(this.props.genderRedux),
      });
    }
    if (prevProp.dataBookingModal !== this.props.dataBookingModal) {
      if (
        this.props.dataBookingModal &&
        !_.isEmpty(this.props.dataBookingModal)
      ) {
        this.setState({
          doctorID: this.props.dataBookingModal.doctorID,
          timeType: this.props.dataBookingModal.timeType,
        });
      }
    }
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  getTimeBooking = (dataBookingModal) => {
    let dateVi = "",
      dateEn = "",
      timeVi = "",
      timeEn = "",
      timeBooking = {};

    if (dataBookingModal && dataBookingModal.timeTypeData) {
      timeVi = dataBookingModal.timeTypeData.valueVi;
      timeEn = dataBookingModal.timeTypeData.valueEn;
    }
    if (dataBookingModal && dataBookingModal.date) {
      dateVi = moment
        .unix(+dataBookingModal.date / 1000)
        .format("dddd - DD/MM/YYYY");
      dateEn = moment
        .unix(+dataBookingModal.date / 1000)
        .locale("en")
        .format("ddd - DD/MM/YYYY");
    }
    timeBooking.timeBookingVi =
      timeVi + ", " + this.capitalizeFirstLetter(dateVi);
    timeBooking.timeBookingEn = timeEn + ", " + dateEn;
    return timeBooking;
  };
  handleonchangeInput = (event, name) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[name] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatepicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  buildDoctorname = (dataBookingModal) => {
    let nameVi = "",
      nameEn = "",
      doctorName = {};

    if (
      dataBookingModal &&
      dataBookingModal.doctorData &&
      dataBookingModal.doctorData.firstName &&
      dataBookingModal.doctorData.lastName
    ) {
      nameVi =
        dataBookingModal.doctorData.firstName +
        " " +
        dataBookingModal.doctorData.lastName;
      nameEn =
        dataBookingModal.doctorData.lastName +
        "  " +
        dataBookingModal.doctorData.firstName;
    }
    doctorName.doctorNameVi = nameVi;

    doctorName.doctorNameEn = nameEn;
    return doctorName;
  };
  handleConfirmBooking = async () => {
    //console.log("confirm", this.state);
    //validate input
    let date = new Date(+this.state.birthday).getTime();
    let timeBooking = this.getTimeBooking(this.props.dataBookingModal);
    let res = await postPatientBooking({
      fullName: this.state.fullName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      doctorID: this.state.doctorID,
      doctorName: this.buildDoctorname(this.props.dataBookingModal),
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeBooking: timeBooking,
    });
    if (res && res.errCode === 0) {
      toast.success("Đã đặt lịch thành công");
      this.props.isCloseModal();
    } else {
      toast.error("Đặt lịch lỗi. Vui lòng đặt lại");
    }
  };
  render() {
    let { isOpenModal, isCloseModal, dataBookingModal, language } = this.props;
    let {
      fullName,
      email,
      phoneNumber,
      address,
      reason,
      birthday,
      genders,
      doctorID,
      selectedGender,
    } = this.state;
    //console.log("Check state ", dataBookingModal);
    let doctorIDFromparent = "";
    if (dataBookingModal && !_.isEmpty(dataBookingModal)) {
      doctorIDFromparent = dataBookingModal.doctorID;
    }

    return (
      <Modal
        isOpen={isOpenModal}
        //toggle={}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={isCloseModal}>
              <i class="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body container mt-2">
            {/* {JSON.stringify(dataBookingModal)} */}
            <div className="doctor_infor">
              <ProfileDoctor doctorIDFromparent={doctorIDFromparent} />
            </div>

            <div className="row input-data">
              <div className="col-12 mb-2">
                <h3>Thông tin bệnh nhân</h3>
              </div>
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={fullName}
                  onChange={(event) =>
                    this.handleonchangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) =>
                    this.handleonchangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(event) => this.handleonchangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  value={address}
                  onChange={(event) =>
                    this.handleonchangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-12 form-group">
                <label>Lý do khám</label>
                <input
                  className="form-control"
                  value={reason}
                  onChange={(event) =>
                    this.handleonchangeInput(event, "reason")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Ngày sinh</label>
                <DatePicker
                  onChange={this.handleOnchangeDatepicker}
                  className="form-control"
                  value={birthday}
                  // minDate={yesterday}
                />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <Select
                  value={selectedGender}
                  onChange={this.handleChangeSelect}
                  options={genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer mt-3">
            <div className="note">
              Thời gian khám bệnh:{" "}
              {language === LANGUAGES.VI
                ? this.getTimeBooking(dataBookingModal).timeBookingVi
                : this.getTimeBooking(dataBookingModal).timeBookingEn}
            </div>
            <div className="action">
              <button
                className="btn btn-primary"
                onClick={() => this.handleConfirmBooking()}
              >
                Xác nhận
              </button>
              <button className="btn btn-dark" onClick={isCloseModal}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getGenderStart: () => dispatch(actions.fetchGenderStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
