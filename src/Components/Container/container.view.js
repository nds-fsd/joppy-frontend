import styles from "./container.module.css";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { OFFER_PAGE, PROFILE_PAGE, CHALLENGES_PAGE, CONVERSATIONS_PAGE } from "../../Routers/routers";
import NavBar from "../NavBar";
import ButtonsBar from "../ButtonsBar";

const Container = () => {


    return(
      <Router>
        <div className={styles.container}>
            <NavBar />
            <div className={styles.main}>
              <Switch>
                  <Route exact path={OFFER_PAGE}>

                  </Route>
                  <Route path={PROFILE_PAGE}>

                  </Route>
                  <Route path={CHALLENGES_PAGE}>

                  </Route>
                  <Route path={CONVERSATIONS_PAGE}>

                  </Route>
              </Switch>

            </div>
            <ButtonsBar />
        </div>
      </Router>
    )
}

export default Container;