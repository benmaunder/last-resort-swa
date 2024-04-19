import React, { useState, useEffect } from "react";
import "../App.css";
import discoWhite from '../assets/disco/disco_white.gif'
import discoBlue from '../assets/disco/disco_blue.gif'
import discoGreen from '../assets/disco/disco_green.gif'
import discoRed from '../assets/disco/disco_red.gif'
import discoYellow from '../assets/disco/disco_yellow.gif'
import discoFabulous from '../assets/disco/disco_fabulous.gif'

const Disco = () => {
  const currentTime = new Date();
  const [color, setColor] = React.useState('white');
  const [changeTime, setChangeTime] = React.useState(currentTime);
  const [earlyMessage, setEarlyMessage] = React.useState('');

  const fetchLatestData = () => {
    return fetch("http://127.0.0.1:8000/get_data", {
        //mode: "no-cors",
        method: "POST",
        body: "{\"query\": \"get_current_disco_color\"}"
      }).then((response) => {
        return response.json()
      })
      .then((data) => {
        const allowedTime = new Date(data[0]['change_time']);
        allowedTime.setMinutes(allowedTime.getMinutes() + 5);
        console.log(data[0]['color'])
        setColor(data[0]['color']);
        setChangeTime(allowedTime);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const colorToDatabase = (newColor) => {
      return fetch("http://127.0.0.1:8000/run_query", {
        //mode: "no-cors",
        method: "POST",
        body: "{\"query\": \"insert_new_disco_color\", \"new_color\": \""+newColor+"\"}"
      }).then((response) => {
        return response.json()
      })
      .then((data) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDiscoColor = (newColor) => {
    return fetch("http://127.0.0.1:8000/change_disco_color", {
      //mode: "no-cors",
      method: "POST",
      body: "{\"color\": \""+newColor+"\"}"
    }).then((response) => {
      return response.json()
    })
    .then((data) => {
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const Circle = (props) => {
    const initialPos = parseInt(props.xPos);
    const [position, setPosition] = useState(initialPos);
    const [transition, setTransition] = useState("right 1s linear");
    
    useEffect(() => {
      const interval = setInterval(() => {
        setPosition(prevPosition => {
          const newPosition = (prevPosition + 10);
          if (newPosition > 140) {
            setTransition("right 0s linear")
            // If the circle reaches the end, reset its position to the initial position
            return -10;
          } else {
            setTransition("right 1s linear")
            return newPosition;
          }
        });
      }, 200);
      return () => clearInterval(interval);
    }, []);

    return <div className="circle" style={{ right: `${position}%`, backgroundColor: color, top: `${props.yPos}%`, transition: transition}} />;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime
  }

  function SelectBall(props) {
    const ballColor = props.color;
    if (ballColor === "white") {return <img src={discoWhite} alt="loading..." className='discoBall'/>;}
    if (ballColor === "blue") {return <img src={discoBlue} alt="loading..." className='discoBall'/>;}
    if (ballColor === "green") {return <img src={discoGreen} alt="loading..." className='discoBall'/>;}
    if (ballColor === "red") {return <img src={discoRed} alt="loading..." className='discoBall'/>;}
    if (ballColor === "yellow") {return <img src={discoYellow} alt="loading..." className='discoBall'/>;}
    if (ballColor === "pink") {return <img src={discoFabulous} alt="loading..." className='discoBall'/>;}
    return <img src={discoWhite} alt="loading..." className='discoBall'/>;
  }

  React.useEffect(() => {
    fetchLatestData();
    return () => {
    };
  }, []);

  return (
    <div>
      <Circle xPos="10" yPos="10"/>
      <Circle xPos="50" yPos="10"/>
      <Circle xPos="90" yPos="10"/>
      <Circle xPos="130" yPos="10"/>
      <Circle xPos="30" yPos="30"/>
      <Circle xPos="70" yPos="30"/>
      <Circle xPos="110" yPos="30"/>
      <Circle xPos="-10" yPos="30"/>
      <Circle xPos="10" yPos="50"/>
      <Circle xPos="50" yPos="50"/>
      <Circle xPos="90" yPos="50"/>
      <Circle xPos="130" yPos="50"/>
      <Circle xPos="30" yPos="70"/>
      <Circle xPos="70" yPos="70"/>
      <Circle xPos="110" yPos="70"/>
      <Circle xPos="-10" yPos="70"/>
      <Circle xPos="10" yPos="90"/>
      <Circle xPos="50" yPos="90"/>
      <Circle xPos="90" yPos="90"/>
      <Circle xPos="130" yPos="90"/>
      <div
        style={{
          alignItems: "center",
          justifyItems: "center",
          padding: "1rem 1rem",
          height: "100%"
        }}
      >
        <div style={{color: "white"}}>
          <select
            value={color}
            onChange={(e) => {
              const currentTime = getCurrentTime();
              if (changeTime < currentTime){
                colorToDatabase(e.target.value);
                fetchLatestData();
                setColor(e.target.value);
                changeDiscoColor(e.target.value);
                setEarlyMessage("");
              } else {
                fetchLatestData();
                const hours = String(changeTime.getHours()).padStart(2, '0');
                const minutes = String(changeTime.getMinutes()).padStart(2, '0');
                const seconds = String(changeTime.getSeconds()).padStart(2, '0');
                setEarlyMessage(` The ball was changed recently. Please wait until ${hours}:${minutes}:${seconds}`+
                ". This isn't a goddamn rave.");
              }
            }}
          >
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="pink">Fabulous</option>
          </select>
          {earlyMessage}
        </div>
      </div>
      <div className="titleHeader">
        <SelectBall color={color} />
      </div>
    </div>
  );
};

export default Disco;
