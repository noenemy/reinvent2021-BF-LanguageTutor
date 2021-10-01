import React, { Component } from 'react'
import Logo from '../../assets/images/tutti-logo.png'

export class Navbar extends Component {
    static defaultProps = {
        title: 'Hello There',
        icon: 'fab fa-github'
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} height="50px" alt="Logo" />
                        <i className={this.props.icon} /> {this.props.title}
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/learning">Learning</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/game">Game</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/leaderboard">Leaderboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/debug">Debug</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/demo">Demo</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
