import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./authentication.css";

class CompanyCreateAccount extends Component {
  state = {
    companyName: null,
    firstname: null,
    lastname: null,
    email: null,
    phoneNumber: null,
    password: null,
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

  onSubmit = e => {
    const {
      companyName,
      firstname,
      lastname,
      email,
      phoneNumber,
      password
    } = this.state;
    e.preventDefault();
    const postFormCompany = {
      companyName,
      firstname,
      lastname,
      email,
      phoneNumber,
      password
    };
    console.log(postFormCompany);
    axios.post("http://localhost:3001/company", postFormCompany).then(data =>
      this.setState({
        title: data.data.title,
        content: data.data.content,
        button: data.data.button,
        open: data.data.openDialog
      })
    );
  };

  render() {
    return (
      <div className="createForm">
        <form method="post" onSubmit={this.onSubmit}>
          <TextField
            type="text"
            className="textField"
            name="companyName"
            placeholder="Nom de l'entreprise"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            className="textField"
            name="firstname"
            placeholder="Prénom"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            className="textField"
            name="lastname"
            placeholder="Nom"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            type="email"
            className="textField"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            className="textField"
            name="phoneNumber"
            placeholder="Numéro de téléphone"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />

          <TextField
            type="password"
            className="textField"
            name="password"
            placeholder="Mot de passe"
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            variant="contained"
            className="buttonCreateForm"
            type="submit"
          >
            S'inscrire
          </Button>
        </form>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.state.button}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CompanyCreateAccount;
