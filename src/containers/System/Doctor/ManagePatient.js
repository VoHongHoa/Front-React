import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";

class ManagePattient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModal: false,
      dataModal: {},
    };
  }
  async componentDidMount() {
    let { userInfo } = this.props;
    //console.log(this.state);
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    //console.log(formatedDate);
    this.getDataPatient(userInfo, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatientForDoctor({
      doctorID: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
    if (sprevState.dataPatient !== this.state.dataPatient) {
      this.setState({
        dataPatient: this.state.dataPatient,
      });
    }
  }
  handleOnchangeDatepicker = (date) => {
    //console.log("check date", value);
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { userInfo } = this.props;
        //console.log(this.state);
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        //console.log(formatedDate);
        this.getDataPatient(userInfo, formatedDate);
      }
    );
  };
  handelConfirm = (item) => {
    //console.log(item);
    let data = {
      doctorID: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
    };
    //console.log(data);
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenModal: false,
      dataModal: {},
    });
  };
  render() {
    //console.log(this.state);
    let { dataPatient } = this.state;
    // console.log(dataPatient);
    return (
      <>
        <div className="manage-patient-container">
          <div className="title">Quản lý Bệnh nhân</div>
          <div className="manage-patient-body row mx-3">
            <div className="col-6 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnchangeDatepicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="manage-patient-table mt-3">
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Email</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.genderData.valueVi}</td>
                          <td>{item.patientData.address}</td>
                          <td>{item.timeTypeDataBooking.valueVi}</td>
                          <td>
                            <div>
                              <button onClick={() => this.handelConfirm(item)}>
                                Xác nhận
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="no-data-table" colSpan={8}>
                        Không có bệnh nhân vào ngày này
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <RemedyModal
              isOpenModal={this.state.isOpenModal}
              dataModal={this.state.dataModal}
              isCloseModal={this.closeModal}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePattient);
