import ImageCapture from "../../Components/ImageCapture/ImageCapture";
import ImageInstruction from "../../Components/Instructions/ImageInstruction";
import "./FeaturesPage.css";
import ImageScreen from "../../Components/ImageScreen/ImageScreen";
import { useState, useEffect } from "react";
import { ImageProvider } from "../../Components/ImageContext/ImageContext";
import AlertComponent from "../../Components/AlertComponent/AlertComponent";
import DialogComponent from "../../Components/DialogComponent/DialogComponent";

const FeaturesPage = () => {
  const [image, setImage] = useState([]);
  const [success, setSuccess] = useState([]);
  const [title, setTitle] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event.data && event.data.sender === "userid") {
        setReceivedMessage(event.data.message);
      } else {
        alert("id not loaded");
      }
    });
  }, [receivedMessage]);

  return (
    <div className="page-columns">
      <ImageProvider
        value={{
          image,
          setImage,
          success,
          setSuccess,
          title,
          setTitle,
          receivedMessage,
          setReceivedMessage,
        }}
      >
        {" "}
        <div className="page-rows">
          <div className="image-side">
            <ImageScreen />
          </div>
          <div className="image-side">
            <AlertComponent
              className="image-side"
              success={success[success.length - 1]}
              title={title}
            />
          </div>
          <DialogComponent />
          <div className="instruction-side">
            <ImageInstruction />
          </div>
        </div>
        <div className="camera-side">
          <ImageCapture />
        </div>
      </ImageProvider>
    </div>
  );
};

export default FeaturesPage;
