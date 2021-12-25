import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Footer";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforDoctor(id);
      //console.log("check data res", res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProp, sprevState, snapshot) {}
  render() {
    // // {this.props.isLoggedIn && <Header />}
    console.log("check state", this.state);
    // // console.log(this.props.match.params.id);
    let { language } = this.props;

    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShowbanner={false} />
        <div className="doctor-detail-container container">
          <div className="intro-doctor row mt-2">
            <div className="content-left col-2">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${
                    detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                  })`,
                }}
              ></div>
            </div>
            <div className="content-right col-10">
              <div className="up">
                {detailDoctor &&
                  detailDoctor.firstName &&
                  detailDoctor.lastName && (
                    <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                  )}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
