import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import InputForm from "./components/InputForm";

function App() {
  return (
    <div className="App">
      <>
        <ParticlesBg type="cobweb" num={80} bg={true} />
      </>
      <Navigation />
      <Logo />
      <Rank />
      <InputForm />
      {/* {<FaceRecognition />} */}
    </div>
  );
}

export default App;
