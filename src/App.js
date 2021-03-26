import "./App.css";
import Tag from "./Components/Tag";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faBuilding,
  faHome,
  faUniversity,
  faMoneyBillWave,
  faClock,
  faLaptopHouse,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faBuilding, faHome, faUniversity, faMoneyBillWave, faClock, faLaptopHouse);

function App() {
  return (
    <div className='App'>
      <Tag icon={"money-bill-wave"} match={true}>
        Salary
      </Tag>
    </div>
  );
}

export default App;
