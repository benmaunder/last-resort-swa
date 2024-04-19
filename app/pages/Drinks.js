import React, { useState, useEffect } from "react";
import "../App.css";
import useForm from "../UseForm";

const FORM_ENDPOINT = "http://127.0.0.1:8000/push_data"; // TODO - update to the correct endpoint

const Form = () => {
  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useForm({
    additionalData,
  });

  if (status === "success") {
    return (
      <>
        <div>Thank you!</div>
        <div>{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="requestHeader">
        Request-a-Drink
      </div>
      <div className="requestBox">
        <input
          type="text"
          placeholder="Beer"
          name="request"
        />
        <input
          type="text"
          placeholder="Brewery / Supplier"
          name="request_supplier"
        />
      </div>
      <div className="requestText">
        Want to get the credit? ~~~~ Want to get a heads up if it comes on? ~~~~ Leave us your name and email (optional)
      </div>
      <div className="requestBox">
        <input
          type="text"
          placeholder="Your name (optional)"
          name="requester"
        />
        <input
          type="text"
          placeholder="Your email (optional)"
          name="requester_email"
        />
      </div>
      <div className="requestBox">
        {status !== "loading" && (
            <button type="submit">
              Submit
            </button>
        )}
      </div>
    </form>
  );
};


class BeerRow extends React.Component {
  render() {
    // var rowname = "kegrow"
    // if (this.props.beer.cask == "1") {
    //   rowname = "caskrow"
    // }
    return (
      <tr>
        <td>{this.props.beer.line_num}</td>
        <td>{this.props.beer.name}</td>
        <td>{this.props.beer.brewery}</td>
        <td>{this.props.beer.beer_type}</td>
        <td>{this.props.beer.abv}%</td>
        <td>£{this.props.beer.price}</td>
      </tr>
    );
  }
}

class BeerTable extends React.Component {
  render() {

    const kegs = [];
    const casks = [];

    this.props.beers.forEach((beer) => {
      if (beer.cask === "1") {
        casks.push(
          <BeerRow
            beer={beer}
            key={beer.name}
          />
        );
      }
      if (beer.cask === "0") {
        kegs.push(
          <BeerRow
            beer={beer}
            key={beer.name}
          />
        );
      }
    });

    return (
      <table className="DataTable">
        <thead>
          <tr>
            <th>Line</th>
            <th>Name</th>
            <th>Brewery</th>
            <th>Type</th>
            <th>ABV</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan="6" className="tableSubHead">Cask</td>
        </tr>
          {casks}
        <tr>
          <td colSpan="6" className="tableSubHead">Keg</td>
        </tr>
          {kegs}
        </tbody>
      </table>
    );
  }
}

const Drinks = () => {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_data", {
      //mode: "no-cors",
      method: "POST",
      body: "{\"query\": \"list_current_beers\"}"
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setBeers(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  
  return (<div>
      <div>
        <BeerTable
          beers={beers}
        />
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
  
}

export default Drinks;