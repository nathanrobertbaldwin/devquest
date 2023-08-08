import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import GameWin from "./components/GameWin";
import GameLoss from "./components/GameLoss";
import Footer from "./components/Footer";
import Error from "./components/Error";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/win">
            <GameWin />
          </Route>
          <Route path="/loss">
            <GameLoss />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
