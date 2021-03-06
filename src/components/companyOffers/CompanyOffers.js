import React, { Component } from "react";
// import Modal from "./Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CompanyOfferManage from "./CompanyOfferManage";
import CompanyCreateOffers from "./CompanyCreateOffers";
import "./companyOffers.css";
import "../pages.css";

class CompanyOffers extends Component {
  state = {
    show: false,
    missions: [],
    company: null
  };

  componentDidMount() {
    const { missions, company } = this.props;
    this.setState({
      missions,
      company
    });
  }

  showModal = () => {
    const { show } = this.state;
    this.setState({
      ...this.state,
      show: !show
    });
  };

  handlerCreateMission = newMission => {
    // console.log("ajouter mission", newMission);
    this.setState({ missions: [...this.state.missions, newMission] });
  };

  handlerUpdateMission = updateMission => {
    // console.log("modif mission", updateMission);
    this.setState({
      missions: [
        ...this.state.missions.filter(e => e.id !== updateMission.id),
        updateMission
      ].sort((a, b) => a.id - b.id)
    });
  };

  handlerDeleteMission = idMission => {
    this.setState({
      missions: [...this.state.missions.filter(e => e.id !== idMission)]
    });
  };

  render() {
    const { missions, company } = this.state;
    // console.log("company", company);

    return (
      <div className="mesMissions">
        <div className="home-company">
          <div className="compnay-overlay">
            <div className="block-company">
              <h1 className="page_title">
                Ici, créer et gérer vos missions de stages
              </h1>
              <h2 className="page_subtitle">
                Nombre de missions en cours : {missions.length}
              </h2>
              <div className="btn-add-offers">
                <Fab
                  className="classic_button_orange"
                  // color="primary"
                  size="large"
                  aria-label="Add"
                  variant="round"
                  onClick={this.showModal}
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          </div>
        </div>

        <CompanyCreateOffers
          open={this.state.show}
          onClose={this.showModal}
          handlerCreateMission={this.handlerCreateMission}
        />
        <div className="company-offer-manage">
          {missions.map((e, index) => (
            <CompanyOfferManage
              key={index}
              modifMission={e}
              titleMission={e.titleMission}
              dateStart={new Date(e.dateStart).toLocaleDateString()}
              dateEnd={new Date(e.dateEnd).toLocaleDateString()}
              description={e.description}
              idMission={e.id}
              isFull={e.isFull}
              intro={e.intro}
              companyName={company.companyName}
              town={e.town}
              LevelStudy={e.LevelStudy.label}
              handlerUpdateMission={this.handlerUpdateMission}
              handlerDeleteMission={this.handlerDeleteMission}
              {...this.props}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CompanyOffers;
