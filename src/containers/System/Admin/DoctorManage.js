import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DoctorManage.scss";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { getDetailInforDoctor } from "../../../services/userService";
import Select from "react-select";
import { CRUD_ACTIONS } from "../../../utils/constant";

const mdParser = new MarkdownIt();

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      allDoctors: [],
      hasOldData: false,

      //save to doctor-info table

      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getDoctorPrice();
    this.props.getDoctorPayment();
    this.props.getDoctorProvince();
  }
  buildDataInput = (inputData) => {
    let result = [];
    // console.log(inputData);
    let language = this.props.lang;
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
    //console.log(result);
    return result;
  };
  buildDoctorInforInput = (inputData, name) => {
    let result = [];
    // console.log(inputData);
    let language = this.props.lang;
    if (inputData && inputData.length > 0) {
      if (name && name === "Price") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn} USA`;
          let labelVi = `${item.valueVi} VND`;
          object.value = item.keyMap;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          result.push(object);
        });
      }
      if (name && name === "Payment") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn}`;
          let labelVi = `${item.valueVi}`;
          object.value = item.keyMap;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          result.push(object);
        });
      }
      if (name && name === "Province") {
        inputData.map((item, index) => {
          let object = {};
          let labelEn = `${item.valueEn}`;
          let labelVi = `${item.valueVi}`;
          object.value = item.keyMap;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          result.push(object);
        });
      }
    }
    //console.log(result);
    return result;
  };
  componentDidUpdate(prevProps, sprevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInput(this.props.allDoctors);
      this.setState({
        allDoctors: dataSelect,
      });
    }
    if (prevProps.doctorPriceData !== this.props.doctorPriceData) {
      let dataSelectPrice = this.buildDoctorInforInput(
        this.props.doctorPriceData,
        "Price"
      );
      this.setState({
        listPrice: dataSelectPrice,
      });
    }
    if (prevProps.doctorPaymentData !== this.props.doctorPaymentData) {
      let dataSelectPayment = this.buildDoctorInforInput(
        this.props.doctorPaymentData,
        "Payment"
      );
      this.setState({
        listPayment: dataSelectPayment,
      });
    }
    if (prevProps.doctorProvinceData !== this.props.doctorProvinceData) {
      let dataSelectProvince = this.buildDoctorInforInput(
        this.props.doctorProvinceData,
        "Province"
      );
      this.setState({
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.lang !== this.props.lang) {
      let dataSelect = this.buildDataInput(this.props.allDoctors);
      let dataSelectPrice = this.buildDoctorInforInput(
        this.props.doctorPriceData,
        "Price"
      );
      let dataSelectPayment = this.buildDoctorInforInput(
        this.props.doctorPaymentData,
        "Payment"
      );
      let dataSelectProvince = this.buildDoctorInforInput(
        this.props.doctorProvinceData,
        "Province"
      );
      this.setState({
        allDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.actionSaveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,

      priceID: this.state.selectedPrice.value,
      provinceID: this.state.selectedProvince.value,
      paymentID: this.state.selectedPayment.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };
  handleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    //console.log(`Option selected:`, res);
  };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    // if (stateName) {
    // }
    //console.log("check onchange", selectedOption, stateName);
  };
  render() {
    let { allDoctors, hasOldData, listPrice, listPayment, listProvince } =
      this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="manage-doctor-container mx-4">
          <div className="title text-center col-12 mb-3">
            <FormattedMessage id="menu.doctor.manage-doctor" />
          </div>
          <div className="more-info row">
            <div className="content-left col-4">
              <label>
                <FormattedMessage id="manage-schedule.select-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={allDoctors}
                placeholder={
                  <FormattedMessage id="manage-schedule.select-doctor" />
                }
                name={"selectedOption"}
              />
            </div>
            <div className="content-right form-group col-8">
              <label className="text-center">
                <FormattedMessage id="menu.doctor.infor" />
              </label>
              <textarea
                className=" text-area form-control mb-3"
                onChange={(event) =>
                  this.handleOnchangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra mb-3">
            <div className="row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.price" />
                </label>
                <Select
                  value={this.state.selectedPrice}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={listPrice}
                  placeholder={<FormattedMessage id="menu.doctor.price" />}
                  name={"selectedPrice"}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.payment" />
                </label>
                <Select
                  value={this.state.selectedPayment}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={listPayment}
                  placeholder={<FormattedMessage id="menu.doctor.payment" />}
                  name={"selectedPayment"}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.province" />
                </label>
                <Select
                  value={this.state.selectedProvince}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={listProvince}
                  placeholder={<FormattedMessage id="menu.doctor.province" />}
                  name={"selectedProvince"}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.clinic-name" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeText(event, "nameClinic")
                  }
                  value={this.state.nameClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.clinic-address" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeText(event, "addressClinic")
                  }
                  value={this.state.addressClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="menu.doctor.note" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnchangeText(event, "note")}
                  value={this.state.note}
                />
              </div>
            </div>
          </div>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />

          <button
            className={
              hasOldData === true
                ? "save-change-content-doctor"
                : "save-content-doctor"
            }
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData === true ? "Lưu thông tin" : "Create Markdown"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    lang: state.app.language,
    doctorPriceData: state.admin.doctorPriceData,
    doctorPaymentData: state.admin.doctorPaymentData,
    doctorProvinceData: state.admin.doctorProvinceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getDoctorPrice: () => dispatch(actions.getDoctorPrice()),
    getDoctorPayment: () => dispatch(actions.getDoctorPayment()),
    getDoctorProvince: () => dispatch(actions.getDoctorProvince()),
    actionSaveDetailDoctor: (data) =>
      dispatch(actions.actionSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
