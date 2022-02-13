import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import "./Facility.scss";
class Facility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinic: [],
    };
  }
  handelViewDetailClinic = (clinic) => {
    console.log(clinic);
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  async componentDidMount() {
    this.props.fetchAllClinic();
  }
  componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.allClinic !== this.props.allClinic) {
      // console.log(this.props.arrSpecialty);
      let arrClinic = this.props.allClinic;
      if (arrClinic && arrClinic.length > 0) {
        this.setState({
          arrClinic: arrClinic,
        });
      } else {
        this.setState({
          arrClinic: [],
        });
      }
    }
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    // console.log("check arrclinic:", this.state.arrClinic);
    let { arrClinic } = this.state;
    return (
      <div className="section-facility">
        <div className="section-header">
          <h1>Cơ sở y tế nổi bậc</h1>
          <button>Tìm kiếm</button>
        </div>

        <div className="facility-content">
          <Slider {...settings}>
            {arrClinic &&
              arrClinic.length > 0 &&
              arrClinic.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div
                    className="customize"
                    onClick={() => this.handelViewDetailClinic(item)}
                  >
                    <div
                      className="img-customize"
                      style={{
                        backgroundImage: `url(${imageBase64})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <p>{item.name}</p>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    allClinic: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchAllClinic: () => dispatch(actions.fetchAllClinic()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Facility)
);
