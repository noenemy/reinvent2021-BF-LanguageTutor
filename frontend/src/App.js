import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import Navbar from './components/layout/Navbar';
import HomeComponent from './components/home/HomeComponent';
import LearningComponent from './components/learning/LearningComponent';
import ClassroomComponent from './components/learning/ClassroomComponent';
import GameComponent from './components/game/GameComponent';
import LeaderboardComponent from './components/leaderboard/LeaderBoardComponent';
import DemoComponent from './components/demo/DemoComponent';
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

export default App;
