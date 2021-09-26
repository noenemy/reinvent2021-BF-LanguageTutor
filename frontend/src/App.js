import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import Navbar from './components/layout/Navbar';
import HomeComponent from './components/home/HomeComponent';
import LearningComponent from './components/learning/LearningComponent';
import GameComponent from './components/game/GameComponent';
import LeaderboardComponent from './components/leaderboard/LeaderBoardComponent';
import TestComponent from './components/test/TestComponent';
import DebugComponent from './components/debug/DebugComponent';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  return (
    <header>
      <Router>
          <Navbar title="1:1 Language Tutor using AWS AI/ML" />

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/learning">
              <Learning />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/debug">
              <Debug />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    </header>
  );
}

function Home(){
  return(
    <HomeComponent />
  )
}

function Learning(){
  return(
    <LearningComponent />
  )
}

function Game(){
  return(
    <GameComponent />
  )
}

function Leaderboard(){
  return(
      <LeaderboardComponent />
  )
}

function Debug(){
  return(
    <DebugComponent />
  )
}

function Test(){

  return(
    <TestComponent />
  )
}

export default App;
