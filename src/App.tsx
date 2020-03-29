import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NavBar from "./components/NavBar";
import history from "./history";
import { Router, Switch, Route } from "react-router";
import { StoreState } from "./common/state";
import { useSelector } from "react-redux";
import ErrorModal from "./components/ErrorModal";
import { AppState, ThemeColors } from "./common/types";
import Progress from "rsup-progress";

const App = () => {
  const { theme, appState } = useSelector((state: StoreState) => state);
  const currTheme = theme === ThemeColors.Light ? "" : ThemeColors.Dark;
  const [progress] = useState(new Progress());

  if (appState === AppState.Init || appState === AppState.Loading) {
    progress.start();
  } else {
    progress.end();
  }

  return (
    <div className={`app-container ${currTheme}`}>
      <ErrorModal state={appState} />
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/Favorites" component={FavoritesPage} exact />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
