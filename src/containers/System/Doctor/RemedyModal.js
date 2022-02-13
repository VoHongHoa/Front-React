import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import _, { size } from "lodash";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.dataModal.email,
      imgBase64: "",
    };
  }
  componentDidMount() {}

  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
    if (prevProp.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleCloseModal = () => {
    this.setState({
      isOpenModal: !this.props.isOpenModal,
    });
  };
  handleOnchangeEmail = (event) => {
    // console.log(event);
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeFile = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //console.log(base64);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    console.log("check state", this.state);
  };
  render() {
    let { dataModal } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <ModalHeader>Gửi hóa đơn khám bệnh</ModalHeader>
        <ModalBody>
          <div className="modalBody-user-container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn file đơn thuốc</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => this.handleOnchangeFile(event)}
                  //value={dataModal.email}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSendRemedy()}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={this.props.isCloseModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  //return { getGenderStart: () => dispatch(actions.fetchGenderStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
