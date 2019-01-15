import React from "react";
import "./CompanyCreateOffers.css";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const API_ENDPOINT_MISSION = "http://localhost:3001/mission/";

const CompanyCreateOffers = class extends React.Component {
  state = this.defaultState();

  componentDidMount() {
    Axios.get("http://localhost:3001/paradata/levelstudies").then(res => {
      this.setState({ idLoaded: true, levelstudies: res.data });
    });
    const { modifMission } = this.props;
    // console.log(">>>CompanyCreateOffers", modifMission);
    if (modifMission && modifMission.id) {
      this.setState({ mission: modifMission, isEditMode: true });
    }
  }

  handlerOnChange = event => {
    const { name, value } = event.target;
    this.setState(previousState => ({
      mission: {
        ...previousState.mission,
        [name]: value
      }
    }));
  };

  handlerOnChangeLevelStudy = event => {
    const { value } = event.target;
    this.setState(previousState => ({
      mission: {
        ...previousState.mission,
        LevelStudyId: value
      }
    }));
  };

  // handlerOnSubmit = event => {
  //   event.preventDefault();
  saveMission = () => {
    const { mission, isEditMode } = this.state;
    const postFormMission = {
      titleMission: mission.titleMission,
      dateStart: mission.dateStart,
      dateEnd: mission.dateEnd,
      description: mission.description,
      town: mission.town,
      intro: mission.intro,
      CompanyId: mission.CompanyId,
      LevelStudyId: Number(mission.LevelStudyId)
    };
    // console.log(">>>", this.state.mission);
    // console.log("postFormMission", postFormMission);

    if (!isEditMode) {
      Axios.post(API_ENDPOINT_MISSION, postFormMission).then(res => {
        // window.alert("Ajout ok");
        // console.log(">>>", res.data);
        this.props.handlerCreateMission(res.data);
        this.props.onClose();
      });
    } else {
      Axios.put(`${API_ENDPOINT_MISSION}${mission.id}`, postFormMission).then(
        res => {
          // window.alert("Modification ok");
          // console.log(">>>", res.data);
          this.props.handlerUpdateMission(res.data);
          this.props.onClose();
        }
      );
    }
  };

  defaultState() {
    const idCompany = sessionStorage.getItem("token");

    return {
      mission: {
        titleMission: "",
        dateStart: new Date().toLocaleDateString(),
        dateEnd: new Date().toLocaleDateString(),
        description: "",
        town: "",
        intro: "",
        CompanyId: idCompany,
        LevelStudyId: 1
      },
      isEditMode: false,
      idLoaded: false
    };
  }

  render() {
    const { mission, isEditMode, idLoaded, levelstudies } = this.state;
    const { onClose, ...other } = this.props;
    return (
      <Dialog
        // onClose={onClose}
        {...other}
      >
        <DialogTitle>
          {isEditMode ? "Je modifie une mission" : "Je crée une mission"}
        </DialogTitle>
        <div className="CompanyCreateOffers">
          <form className="container">
            <input
              placeholder="Titre de la mission de stage"
              name="titleMission"
              value={mission.titleMission}
              onChange={this.handlerOnChange}
              required
            />
            <input
              placeholder="Date de début"
              name="dateStart"
              value={mission.dateStart}
              onChange={this.handlerOnChange}
              required
            />
            <input
              placeholder="Date de fin"
              name="dateEnd"
              value={mission.dateEnd}
              onChange={this.handlerOnChange}
              required
            />
            <input
              placeholder="Ville"
              name="town"
              value={mission.town}
              onChange={this.handlerOnChange}
              required
            />
            <textarea
              placeholder="Introduction"
              name="intro"
              value={mission.intro}
              onChange={this.handlerOnChange}
              required
            />
            <textarea
              placeholder="Description"
              name="description"
              value={mission.description}
              onChange={this.handlerOnChange}
              required
            />
            <select
              name="LevelStudyId"
              required
              value={mission.LevelStudyId}
              onChange={this.handlerOnChangeLevelStudy}
            >
              {idLoaded
                ? levelstudies.map(element => (
                    <option key={element.id} value={element.id}>
                      {element.label}
                    </option>
                  ))
                : "loading..."}
            </select>
          </form>
          <p>{isEditMode ? "" : "Cette offre sera publiée après validation"}</p>
        </div>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annuler
          </Button>
          <Button onClick={this.saveMission} color="primary" autoFocus>
            {isEditMode ? "Modifier" : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default CompanyCreateOffers;
