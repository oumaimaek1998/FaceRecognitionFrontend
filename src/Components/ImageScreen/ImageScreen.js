import "./ImageScreen.css";
import ImageContext from "../ImageContext/ImageContext";
import { useContext } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: "50px",
    marginTop: "15px",
    marginLeft: "20px",
  },
  buttonError: { fontSize: "4pc" },
  buttonError2: {
    fontSize: "4pc",
    marginLeft: "12px",
    marginTop: "7px",
  },
}));

const ImageScreen = () => {
  const { image, success } = useContext(ImageContext);
  const classes = useStyles();

  return (
    <div className="image-flex">
      {image.length !== 0 ? (
        image.map((item, index) =>
          item ? (
            <div key={index} className="image-container">
              <div>
                <img alt={""}className="inner-image" src={item.toString()} />
                <div className="inner-inner-image">
                  {success[index] === false ? (
                    <ClearIcon className={classes.buttonError} />
                  ) : success[index] === true ? (
                    <CheckIcon className={classes.buttonError} />
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="image-container">
              <div>
                {" "}
                <WarningIcon className={classes.buttonError2} />
              </div>
            </div>
          )
        )
      ) : (
        <div className="image-container">
          <PersonIcon className={classes.root} />
        </div>
      )}
    </div>
  );
};

export default ImageScreen;
