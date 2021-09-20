import { useContext, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import ImageContext from "../ImageContext/ImageContext";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const imageStyle = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "14px",
  marginBottom: "14px",
  width: "50%",
  borderRadius: "20%",
  boxShadow: "5px 10px #888888",
};

const progressStyle = {
  width: "100%",
};
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogComponent = () => {
  const [open, setOpen] = useState(false);
  const { success, image, setSuccess, setTitle, receivedMessage } =
    useContext(ImageContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(success[success.length - 1]);
  }, [success]);

  const handleClose = () => {
    setOpen(false);
    const newSs = [...success];
    newSs[newSs.length - 1] = false;
    setSuccess(newSs);
    setTitle("");
  };

  const handleSubmit = () => {
    setLoading(true);
    fetch("api/image/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: image[image.length - 1],
        id: receivedMessage,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data["data"] === "Valid") {
          setLoading(false);
          setOpen(false);
          window.parent.postMessage(
            { message: "yes" },
            "https://sna.learning/local/staffmanager/"
          );
        }
      })
      .catch(function () {
        alert("there is some error");
      });
  };

  return success[success.length - 1] ? (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Valider la photo
        </DialogTitle>
        <DialogContent dividers>
          {" "}
          <Typography>
            Voulez vous choisir cette photo comme référence ? A noter que chaque
            tentative de fausser la reconnaissance sera sanctionnée.
          </Typography>
          <img alt={""}style={imageStyle} src={image[image.length - 1]} />
        </DialogContent>
        <DialogActions>
          {loading === true ? (
            <div style={progressStyle}>
              <LinearProgress />
              <LinearProgress color="secondary" />
            </div>
          ) : null}
          <Button
            autoFocus
            onClick={handleSubmit}
            disabled={loading}
            color="primary"
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
};

export default DialogComponent;
