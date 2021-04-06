import "./App.css";
import React from "react";
import Container from "./Components/Container";
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
  faThumbsUp,
  faThumbsDown,
  faHistory,
  faShare,
  faUser,
  faCircleNotch,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

library.add(
  faCheck,
  faBuilding,
  faHome,
  faUniversity,
  faMoneyBillWave,
  faClock,
  faLaptopHouse,
  faThumbsUp,
  faThumbsDown,
  faHistory,
  faShare,
  faUser,
  faCircleNotch,
  faLayerGroup,
  faCommentAlt
);

function App() {
  return (
    <div className='App'>
      <Container />
      <Tag icon={"money-bill-wave"} match={true}>
        Salary
      </Tag>
    </div>
  );
}

export default App;
