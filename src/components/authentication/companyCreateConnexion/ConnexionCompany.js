import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Axios from "axios";
import { MakeCompletedUrl } from "../../../tools";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../authentication.css";
import { selectCompany } from "../../../actions/getIdAction";

class ConnexionCompany extends Component {
  state = {
    showPassword: false,
    passwordVerified: false,
    title: "",
    content: "",
    button: "",
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { props } = this;
    const { email, password } = this.state;
    const postDataLogin = {
      email,
      password
    };

    Axios.post(MakeCompletedUrl("company/login"), postDataLogin)
      .then(result => {
        props.selectCompany(result.data.id);
        sessionStorage.setItem("token", result.data.id);
        props.history.push("/company");
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.setState({
            open: true,
            title: `Cet utilisateur n'existe pas`,
            content: `Cette adresse mail n'est pas reconnue, essayer de nouveau ou bien crééz votre compte :)`,
            button: `Fermer`
          });
        } else if (error.response.status === 401) {
          this.setState({
            open: true,
            title: `Mauvais mot de passe`,
            content: `Erreur lors de la saisie du mot de passe`,
            button: `Fermer`
          });
        } else {
          this.setState({
            open: true,
            title: "Erreur inconnue",
            content: `Une erreur s'est produite, veuillez recommencez s'il-vous-plait`,
            button: `Fermer`
          });
        }
      });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { open, title, content, button } = this.state;
    const { showPassword } = this.state;
    return (
      <div className="createForm">
        <form method="post" onSubmit={this.handleOnSubmit}>
          <TextField
            type="email"
            className="textField"
            name="email"
            label="Email"
            onChange={this.onChange}
            // margin="normal"
            variant="outlined"
            required
          />
          <TextField
            className="textField"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            margin="normal"
            onChange={this.onChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            className="buttonCreateForm classic_button_orange"
            type="submit"
          >
            Se connecter
          </Button>
        </form>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {button}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectCompany
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(ConnexionCompany);
