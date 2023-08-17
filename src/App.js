import React, { useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import InputForm from "./components/InputForm";
import FaceRecognition from "./components/FaceRecognition";

function App() {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  };
  
  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onButtonSubmit = () => {
    console.log("click");
    const PAT = "10d1fe63eafb47ebbeb106d6850c9ef5";
    const USER_ID = "taniatos";
    const APP_ID = "visio-quest-app";
    const MODEL_ID = "face-detection";

    const returnClarifaiRequestOptions = (imageUrl) => {
      const IMAGE_URL = imageUrl;

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
          },
          inputs: [
            {
              data: {
                image: {
                  url: IMAGE_URL,
                },
              },
            },
          ],
        }),
      };

      return requestOptions;
    };

    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      returnClarifaiRequestOptions(input)
    )
      .then((response) => response.json()) 
      .then((data) => {
        console.log(data); 
        displayFaceBox(calculateFaceLocation(data));
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={80} bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <InputForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={input} box={box} />
    </div>
  );
}

export default App;
