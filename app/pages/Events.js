import React, { useState, useEffect } from "react";
import "../App.css";

class EventRow extends React.Component {
  render() {
    return (
      <tr>
        <td style={{width:"60%"}}>
          <img src={this.props.event.pic_url} alt="loading..." className="slide" 
          style={{width:"90%", height:"auto", margin:"5%", maxWidth:"300px"}}/>
        </td>
        <td>
          {this.props.event.event_date} <br></br><br></br>
          <div style={{fontSize:"20px"}}> {this.props.event.event_name} </div> <br></br><br></br>
          {this.props.event.event_description} <br></br><br></br>
          {this.props.event.link}
        </td>
      </tr>
    );
  }
}

class EventTable extends React.Component {
  render() {

    const past = [];
    const future = [];

    this.props.events.forEach((event) => {
      if (event.past === "0") {
        future.push(
          <EventRow
            event={event}
            key={event.name}
          />
        );
      }
      if (event.past === "1") {
        past.push(
          <EventRow
            event={event}
            key={event.name}
          />
        );
      }
    });

    return (
      <table className="DataTable">
        <tbody>
        <tr>
          <td colSpan="2" className="tableSubHead">What's Coming Up?</td>
        </tr>
          {future}
        <tr>
          <td colSpan="2" className="tableSubHead">What's Been On?</td>
        </tr>
          {past}
        </tbody>
      </table>
    );
  }
}

const Events = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_data", {
      //mode: "no-cors",
      method: "POST",
      body: "{\"query\": \"get_events\"}"
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setEvents(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  
  return (<div>
      <div>
        <EventTable
          events={events}
        />
      </div>
    </div>
  );
  
}

export default Events;