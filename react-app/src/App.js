import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Error from "./components/Error";
import GameStateProvider from "./context/GameState";
import AllEquipment from "./components/AllEquipment";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <GameStateProvider>
      <Navigation isLoaded={isLoaded} />
      <div id="main-content">
        {isLoaded && (
          <Switch>
            <Route path="/equipment/all">
              <AllEquipment />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </GameStateProvider>
  );
}

export default App;
