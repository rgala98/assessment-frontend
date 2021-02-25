import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import PrimeNumberPage from "./pages/PrimeNumberPage";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentDatabasePage from "./pages/StudentDatabasePage";
import SudokuGamePage from "./pages/SudokuGamePage";

function App() {
  return (
    <div className="app">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/prime" />
          </Route>
          <Route path="/prime" exact component={PrimeNumberPage} />
          <Route path="/student" exact component={StudentDatabasePage} />
          <Route path="/sudoku" exact component={SudokuGamePage} />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
