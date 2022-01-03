import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailSpecialtyById } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import Footer from "../../HomePage/Footer";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialInfor: "",
      allDoctocFromSpecialty: [],
      doctorProvinceData: [],
    };
  }
  async componentDidMount() {
    this.props.getDoctorProvince();
    // if (this.props.location && this.props.location.search) {
    //   const urlSearch = new URLSearchParams(this.props.location.search);
    //   let specialtyID = urlSearch.get("specialtyID");
    //   let provinceID = urlSearch.get("provinceID");
    //   console.log(provinceID);
    //   //console.log(specialtyID, provinceID);
    //   let res = await getDetailSpecialtyById({
    //     specialtyID: specialtyID,
    //     provinceID: "PRO2",
    //   });
    //   console.log("check data res", res);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       specialInfor: res.data.specialInfor,
    //       allDoctocFromSpecialty:
    //         res.data.allDoctocFromSpecialty &&
    //         res.data.allDoctocFromSpecialty.length > 0
    //           ? res.data.allDoctocFromSpecialty
    //           : [],
    //     });
    //   }
    // }

    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.specialtyID
    ) {
      let specialtyID = this.props.match.params.specialtyID;
      let res = await getDetailSpecialtyById({
        specialtyID: specialtyID,
        provinceID: "ALL",
      });
      //console.log("check data res", res);
      if (res && res.errCode === 0) {
        this.setState({
          specialInfor: res.data.specialInfor,
          allDoctocFromSpecialty:
            res.data.allDoctocFromSpecialty &&
            res.data.allDoctocFromSpecialty.length > 0
              ? res.data.allDoctocFromSpecialty
              : [],
        });
      }
    }
  }
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
    if (prevProp.doctorProvinceData !== this.props.doctorProvinceData) {
      let doctorProvinceData = this.props.doctorProvinceData;
      this.setState({
        doctorProvinceData: doctorProvinceData,
      });
    }
  }
  handelOnchangeSelect = async (event) => {
    console.log(event.target.value);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.specialtyID
    ) {
      let specialtyID = this.props.match.params.specialtyID;
      let res = await getDetailSpecialtyById({
        specialtyID: specialtyID,
        provinceID: event.target.value,
      });
      //console.log("check data res", res);
      if (res && res.errCode === 0) {
        this.setState({
          specialInfor: res.data.specialInfor,
          allDoctocFromSpecialty:
            res.data.allDoctocFromSpecialty &&
            res.data.allDoctocFromSpecialty.length > 0
              ? res.data.allDoctocFromSpecialty
              : [],
        });
      }
    }
  };
  render() {
    //console.log("check-state", this.state);
    let { allDoctocFromSpecialty, specialInfor, doctorProvinceData } =
      this.state;
    console.log(doctorProvinceData);
    return (
      <>
        <HomeHeader />
        <div className="detailspecialty-container">
          <div className="detailspecialty-up">
            {specialInfor && specialInfor.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: specialInfor.contentHTML,
                }}
              ></div>
            )}
          </div>

          <div className="detailspecialty-down container">
            <div className="row">
              <div className="col-3">
                <select onChange={(event) => this.handelOnchangeSelect(event)}>
                  <option value="ALL">Toàn quốc</option>
                  {doctorProvinceData &&
                    doctorProvinceData.length > 0 &&
                    doctorProvinceData.map((item, index) => {
                      return (
                        <option value={item.keyMap} key={index}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {allDoctocFromSpecialty && allDoctocFromSpecialty.length > 0 ? (
              allDoctocFromSpecialty.map((item) => {
                return (
                  <div className="detail-doctor row">
                    <div className="doctor-infor col-8">
                      <ProfileDoctor doctorIDFromparent={item.doctorID} />
                      <DoctorExtraInfor doctorID={item.doctorID} />
                    </div>
                    <div className="doctor-schedule col-4">
                      <DoctorSchedule doctorID={item.doctorID} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-data">
                Hiện không có bác sĩ nào công tác tại chuyên khoa này.
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorProvinceData: state.admin.doctorProvinceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getDoctorProvince: () => dispatch(actions.getDoctorProvince()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
