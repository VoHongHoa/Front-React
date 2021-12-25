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
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      allDoctors: [],
      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
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
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    // alert("click luu thong tin");

    //console.log("checl state", this.state);
  };
  handleOnchangeDesc = (event) => {
    this.setState({
      description: event.target.value,
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
    console.log(`Option selected:`, res);
  };
  render() {
    let { allDoctors, hasOldData } = this.state;
    //console.log(allDoctors);
    return (
      <React.Fragment>
        <div className="manage-doctor-container mx-2">
          <div className="title text-center col-12 mb-3">Manage Doctor</div>
          <div className="more-info row">
            <div className="content-left col-4">
              <label>Chọn bác sĩ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={allDoctors}
              />
            </div>
            <div className="content-right form-group col-8">
              <label className="text-center">Thông tin giới thiệu</label>
              <textarea
                className=" text-area form-control mb-3"
                onChange={(event) => this.handleOnchangeDesc(event)}
                value={this.state.description}
              >
                jfdsf
              </textarea>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    actionSaveDetailDoctor: (data) =>
      dispatch(actions.actionSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
