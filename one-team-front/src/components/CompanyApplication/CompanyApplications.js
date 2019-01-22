import React, { Component } from "react";
import CompanyApplicationsList from "./CompanyApplicationsList";
import { FULL_RESTRICTED } from "./studentConstant";
import "./CompanyApplications.css";

const mode = "APPLICATION";
const modeSelect = "SELECT";
const modeRefuse = "REFUSE";

class CompanyApplications extends Component {
  render() {
    return (
      <div>
        <div className="companyAppliBackground">
          <div className="companyAppliTitle general_margin">
            <h1 className="companyAppliText1">Candidatures</h1>
            <h2 className="companyAppliText2">
              Ajoutez des candidats à votre mission de stage, ou refusez-les.
            </h2>
          </div>
        </div>
        <CompanyApplicationsList
          mode={mode}
          modeSelect={modeSelect}
          modeRefuse={modeRefuse}
          size={FULL_RESTRICTED}
        />
      </div>
    );
  }
}

export default CompanyApplications;
