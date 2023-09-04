import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import InputForm from "./components/InputForm/InputForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import { pat } from "./constants/apiKeys";

function App() {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("landing");

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

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
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onButtonSubmit = () => {
    const PAT = { pat };
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
        displayFaceBox(calculateFaceLocation(data));
        if (data) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevUser) => ({ ...prevUser, entries: count }));
            });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={80} bg={true} />
      <Navigation onRouteChange={setRoute} route={route} />
      {route === "landing" ? (
        <LandingPage onRouteChange={setRoute} />
      ) : route === "signin" ? (
        <SignIn onRouteChange={setRoute} loadUser={loadUser} />
      ) : route === "register" ? (
        <Register onRouteChange={setRoute} loadUser={loadUser} />
      ) : (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <InputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={input} box={box} />
        </>
      )}
    </div>
  );
}

export default App;
