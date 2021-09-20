import { useContext } from "react";
import ImageContext from "../ImageContext/ImageContext";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertComponent = () => {
  const classes = useStyles();
  const { title, success } = useContext(ImageContext);

  return success[success.length - 1] === false && !!title ? (
    <div className={classes.root}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
          ></IconButton>
        }
      >
        {title}
      </Alert>
    </div>
  ) : null;
};

export default AlertComponent;
