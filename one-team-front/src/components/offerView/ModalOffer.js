import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { AwesomeButton } from "react-awesome-button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import OfferView from "./OfferView";
import { FULL } from "./constants";

const DialogTitle = withStyles(theme => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
class ModalOffer extends Component {
  state = {
    open: false,
    missionId: null
  };

  componentDidMount() {
    const { missionId } = this.props;
    this.setState({
      missionId
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClickApplicate = () => {
    const { missionId } = this.state;
    const { traineeId } = this.props;
    this.setState({ open: false });
    axios
      .post("http://localhost:3001/application", {
        missionId,
        traineeId
      })
      .then(res => console.log(res));
  };

  render() {
    const { open } = this.state;
    const { size, titleMission, missionId } = this.props;
    return (
      <div className="ModalOffer">
        <OfferView
          key={`${missionId}-${titleMission}`}
          {...this.props}
          size={size}
        />
        <AwesomeButton
          type="primary"
          className="aws-btn remove"
          action={this.handleOpen}
        >
          {size === "SMALL" ? "Consulter" : "En savoir plus"}
        </AwesomeButton>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleClose}
          />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <OfferView
                key={`${missionId}-${titleMission}`}
                {...this.props}
                size={FULL}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {size === "SMALL" ? (
              <Button disabled color="primary">
                postuler
              </Button>
            ) : (
              <Button onClick={this.handleClickApplicate} color="primary">
                postuler
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id_student: state.student.id
});
export default connect(mapStateToProps)(ModalOffer);