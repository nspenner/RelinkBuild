import logo from "./logo.svg";
import "./App.css";
import SigilList from "./components/SigilList";
import data from "./data/sigils.json";
import SigilApp from "./components/SigilApp/SigilApp";

function App() {
  return (
    <div>
      <SigilApp></SigilApp>
      {/* <SigilList sigils={data}></SigilList> */}
    </div>
  );
}

export default App;
