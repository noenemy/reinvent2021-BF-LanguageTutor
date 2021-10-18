import "./LoadScreen.css" 

const LoadScreen = () => {
    return (
      <div id="loadScreen">
        <div style={{width: window.innerWidth, height: window.innerHeight}}></div>
        <div id="loader"></div>
      </div>
    )
  }
  
  export default LoadScreen;