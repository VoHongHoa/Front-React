import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Footer";
import { getDetailClinicById } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import "./DetailClinic.scss";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicInfor: {},
      allDoctorBelongToClinic: [],
    };
  }
  async componentDidMount() {
    console.log(this.props.match.params);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.clinicID
    ) {
      let id = this.props.match.params.clinicID;
      // console.log(id);
      let res = await getDetailClinicById(id);
      console.log("check data res", res);
      if (res && res.errCode === 0) {
        this.setState({
          clinicInfor: res.data.dataClinic,
          allDoctorBelongToClinic:
            res.data.allDoctorBelongToClinic &&
            res.data.allDoctorBelongToClinic.length > 0
              ? res.data.allDoctorBelongToClinic
              : [],
        });
      }
    }
  }
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
  }

  render() {
    let { clinicInfor, allDoctorBelongToClinic } = this.state;
    let imageBase64 = "";
    if (clinicInfor && clinicInfor.image) {
      imageBase64 = new Buffer(clinicInfor.image, "base64").toString("binary");
    }
    return (
      <>
        <HomeHeader></HomeHeader>
        <div className="detail-clinic-container container">
          <div
            className=" detail-clinic-img"
            style={{
              backgroundImage: `url(${imageBase64})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="row clinic-title mt-3">
            <div className="col-8">
              <div
                style={{
                  height: "50px",
                  width: "80px",
                  backgroundImage: `url(${imageBase64})`,
                  backgroundRepeat: "none",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="clinic-infor">
                <span className="clinic-name">{clinicInfor.name}</span>
                <span className="clinic-address">
                  <i className="fas fa-map-marker-alt"></i>
                  {clinicInfor.address}
                </span>
              </div>
            </div>
            {/* <div className="col-4">
              <button className="btn btn-primaty">Xem thêm</button>
            </div> */}
          </div>
          <div className="detail-clinic mt-3">
            {clinicInfor && clinicInfor.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: clinicInfor.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="all-doctor-belong-to-clinic">
            {allDoctorBelongToClinic && allDoctorBelongToClinic.length > 0 ? (
              allDoctorBelongToClinic.map((item) => {
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
                Hiện không có bác sĩ nào công tác tại phòng khám này.
              </div>
            )}
          </div>
        </div>

        <Footer></Footer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
