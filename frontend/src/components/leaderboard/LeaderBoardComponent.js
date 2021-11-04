import React, { Component } from 'react';
import Trophy from '../../assets/images/trophy.jpeg';
// TODO: Need to change the footer image
import LeaderboardFooter from '../../assets/images/leaderboard-footer.jpg';

class LeaderBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankings: null
        }
    }

    render() {
        return(
            <div>
                <br />
                <h1 className="text-secondary text-center">Leaderboard</h1>
                <br />
            
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 text-right mr-2">
                            <img src={Trophy} alt="trophy" />
                        </div>
                
                        <div className="col-7 mt-3">
                        <div className="row">
                            <table className="table">
                            <tr className="thead-light h4">
                                <th className="text-center">Ranking</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Found Cards</th>
                                <th className="text-center">Total Playtime</th>
                                <th className="text-center">Total Score</th>
                            </tr>
                            {this.state.rankings && this.state.rankings.map((ranking, index) => {
                                return (
                                    <tr key={index} className="h4">
                                        <td className="text-center"><kbd>{{ ranking }}</kbd></td>
                                        <td>{{ ranking }}</td>
                                        <td className="text-center">{{ ranking }}</td>
                                        <td className="text-center">{{ ranking }}"</td>
                                        <td className="text-center">{{ ranking }}</td>
                                    </tr>
                                );
                            })}
                            </table>
                        </div>
                    </div>
                </div>
            
                <br />
                
                <div id="footer" className="footer container navbar-fixed-bottom text-right">
                    <img src={LeaderboardFooter} alt="footer" height="150" width="800" />
                </div>
            </div>
        </div>
      );
    }
};

export default LeaderBoardComponent;
