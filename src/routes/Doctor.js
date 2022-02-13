import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManagaScheduleDoctor from "../containers/System/Doctor/ManagaScheduleDoctor";
import ManagPatient from "../containers/System/Doctor/ManagePatient";
import Header from "../containers/Header/Header";
class Doctor extends Component {
  render() {
    // {this.props.isLoggedIn && <Header />}
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {this.props.isLoggedIn && <Header />}
        <div className="Doctor-container">
          <div className="Doctor-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ManagaScheduleDoctor}
              />
              <Route path="/doctor/manage-patient" component={ManagPatient} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorMenuPath: state.app.DoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
