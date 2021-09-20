import { useState, useRef, useCallback, useContext } from "react";
import Webcam from "react-webcam";
import "./ImageCapture.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Tooltip from "@material-ui/core/Tooltip";
import ImageContext from "../ImageContext/ImageContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  customTooltip: {
    margin: "auto",
    padding: "2px",
    color: "#f44336",
    position: "absolute",
    backgroundColor: "#ffebee",
    fontSize: "1em",
    userSelect: "none",
    fontFamily: "Poppins",
    minWidth: "200px",
    borderLeft: "8px solid #f44336",
    borderRadius: "4px",
    top: "-30px",
    left: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "break-word",
  },
  buttonError: { color: red[500], cursor: "pointer" },
  fabProgress: {
    color: "#f44336",
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));

const ImageCapture = () => {
  const webcamRef = useRef(null);
  const [resp, setReceivedData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setImage, success, setSuccess, title, setTitle, receivedMessage } =
    useContext(ImageContext);

  const classes = useStyles();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage((prev) => [...prev, imageSrc]);
    setLoading(true);
    handleImageSubmit(imageSrc);
  }, [webcamRef,setImage]);

  const handleImageSubmit = (image) => {
    fetch("api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: image,
        id: receivedMessage,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data["data"];
        setReceivedData(data);
        if (data === "Success") {
          setSuccess((prev) => [...prev, true]);
          setError(false);
        } else {
          setSuccess((prev) => [...prev, false]);
          setError(true);
        }
        setLoading(false);
      })
      .catch(function () {
        setSuccess((prev) => [...prev, false]);
        setLoading(false);
        alert("server error");
      });
  };

  const showTitle = () => {
    if (resp === 0) {
      setTitle(`Aucun visase détecté, Veuillez reprendre la photo`);
    } else if (resp === "Failure") {
      setTitle(`Yeux non ouverts, Veuillez adresser vos yeux vers la caméra`);
    } else if (resp === "Error") {
      setTitle(`Erreur dans la caméra, Veuillez vérifier votre caméra`);
    } else if (resp > 1) {
      setTitle(`Plusieurs personnes sont présentes dans la photo`);
    }
    return title;
  };

  return (
    <div className="image-screen">
      {" "}
      <input
        type="hidden"
        id="inputname22"
        name="name"
        value={receivedMessage}
        required
      />
      <Webcam
        className="webcamCapture"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {}
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Fab
            aria-label="save"
            color="primary"
            onClick={capture}
            disabled={success[success.length - 1]}
          >
            {success[success.length - 1] ? <CheckIcon /> : <CameraAltIcon />}
          </Fab>
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
          {error && (
            <Tooltip
              title={showTitle()}
              classes={{
                tooltip: classes.customTooltip,
              }}
            >
              <span>
                <ErrorOutlineIcon className={classes.buttonError}>
                  {" "}
                </ErrorOutlineIcon>
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCapture;
