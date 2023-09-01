import React, { useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import InputForm from "./components/InputForm/InputForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

function App() {
  const [input, setInput] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");

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

  const onButtonSubmit = () => {
    // Send the input image URL to your back-end
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayFaceBox(data);
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
      {route === "signin" ? (
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
