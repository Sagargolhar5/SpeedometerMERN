import { useState } from "react";
import axios from "axios"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Speedometer.css"
import { useEffect } from "react";


const Speedometer = () =>{
  const [speed, setSpeed] = useState(0);

  // fetching data from server in every 3 seconds
  const fetchSpeed = async () =>{
    try{
      const response = await axios.get("http://localhost:5000/api/speed")
      setSpeed(response.data.speed)
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(() =>{
    fetchSpeed();
    const interval = setInterval(fetchSpeed, 3000);
    return () => clearInterval(interval)
  }, [])

  return(
    <div className="speedometer-container">
      <div className="speedometer-card">
        <h1 className="speedometer-title">Speedometer</h1>
        <div className="speedometer-progress">
          <CircularProgressbar 
          value={speed}
          maxValue={200}
          text={`${speed} km/h`}
          styles={buildStyles({
            pathColor: speed<60 ? "green" : speed <120 ? "yello" : "red" ,
            textColor:"#000000",
            textSize:"18px",
            pathTransitionDuration:"0.5"
          })} />
          <p className="current-speed">Current Speed</p>
        </div>
      </div>
    </div>
  )
}

export default Speedometer;