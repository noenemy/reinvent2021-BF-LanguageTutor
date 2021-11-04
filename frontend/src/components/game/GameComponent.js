import React from 'react';

const GameComponent = () => {
    // TODO: Migrate from the previous AngularJS project
    return(
        <div>
            <div className="row">
                <div class="col-2">
                </div>
                <div class="col-8">
                    <div id="section_2">
                    <br />
                    <h1 className="text-black">How to play game</h1>

                    <div className="card-group">
                        <div className="card mt-2 mr-4">
                            <img className="card-img-top" src="/assets/images/howto/play-step1.jpg" alt="Pick a card" />
                            <div className="card-body">
                                <h2 className="card-title">Step 1</h2>
                                <h4 className="card-text">Please pick a card that matches words on the screen.</h4>
                            </div>
                        </div>
                        <div className="card mt-2 mr-4">
                            <img className="card-img-top" src="/assets/images/howto/play-step2.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h2 className="card-title">Step 2</h2>
                                <h4 className="card-text">Place the card in front of camera within given time.</h4>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src="/assets/images/howto/play-step3.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h2 className="card-title">Step 3</h2>
                                <h4 className="card-text">Press “BIG ENTER” to take photo of the card.</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div><br /><br /><br /></div>
                <h3>Will be migrated soon.</h3>
                <div><br /><br /><br /></div>
            </div>
        </div>
      );
};

export default GameComponent;
