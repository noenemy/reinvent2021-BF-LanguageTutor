import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <header>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
              <i fa name="home"></i> 1:1 Language Tutor using AWS AI/ML
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/game">Game</Nav.Link>
                  <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                  <Nav.Link href="/debug">Debug</Nav.Link>
                  <Nav.Link href="/test">Test</Nav.Link>
                  <Nav.Link href="#home"><FontAwesomeIcon icon={["fal", "coffee"]} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
          
          <Switch>
            <Route path="/home">
              <Home />
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
      <h1>Home</h1>
  )
}

function Game(){
  return(
      <h1>Game</h1>
  )
}

function Leaderboard(){
  return(
      <h1>Leaderbord</h1>
  )
}

function Debug(){
  return(
      <h1>Debug</h1>
  )
}

function Test(){
  return(
      <h1>Test</h1>
  )
}

export default App;
