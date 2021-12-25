import React, { Component } from "react";
import { connect } from "react-redux";
import HomerHeader from "./HomeHeader";
import Speciality from "./Section/Speciality";
import Facility from "./Section/Facility";
import Footer from "./Footer";
import VideoFrame from "./Section/VideoFrame";
import Doctor from "./Section/Doctor";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomerHeader isShowbanner={true} />
        <Speciality />
        <Facility />
        <Doctor />
        <VideoFrame />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
