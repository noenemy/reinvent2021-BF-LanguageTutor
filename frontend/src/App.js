import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomeComponent from './components/home/HomeComponent';
import LearningComponent from './components/learning/LearningComponent';
import ClassroomComponent from './components/learning/Classroom';
import GameComponent from './components/game/GameComponent';
import LeaderboardComponent from './components/leaderboard/LeaderBoardComponent';
import DemoComponent from './components/demo/DemoComponent';
import DebugComponent from './components/debug/DebugComponent';
import SumerianComponent from './components/layout/SumerianComponent';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  const showContentOnly = window.location.pathname === "/sumerian";
  return (
    <header>
      <Router>
          { showContentOnly ? null :
            (<Navbar title="1:1 Language Tutor using AWS AI/ML" />)
          }

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/classroom">
              <Classroom />
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
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/sumerian">
              <Sumerian />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

          { showContentOnly ? null : (<Footer />) }

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

function Classroom(){
  return(
    <ClassroomComponent />
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

function Demo(){

  return(
    <DemoComponent />
  )
}

function Sumerian(){

  return(
    <SumerianComponent />
  )
}

export default App;
