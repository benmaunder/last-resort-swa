import React, { useState, useEffect } from "react";
import "../App.css";

const images = require.context('../assets/site_pictures', true);
const imageList = images.keys().map(image => images(image));

const delay = 10000;

function ImageRow(slideImage) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };
  if (dimensions.width > dimensions.height) {
    return <img src={slideImage} alt="loading..." height="300px" onLoad={handleImageLoad}/>;
  }
  return (
    <img src={slideImage} alt="loading..." width="300px" onLoad={handleImageLoad}/>
  );
}

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-((index-(imageList.length/2)) * 400)-200}px, 0, 0)` }}
        >
          {imageList.map((slideImage, index) => (
            <div
              className="slide"
              key={index}
              style={{
                overflow: "hidden"
              }}
            >
              {ImageRow(slideImage)}
            </div>
          ))}
        </div>
      </div>
      <div className="slideshowDots">
        {imageList.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

const Home = () => {

  const [review, setReview] = useState("I love this pub  -  Ben M");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_last_review", {
      //mode: "no-cors",
      method: "GET"
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setReview(data["review"]);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);


  return <div>
      <div className="titleHeader">
        <Slideshow/>
      </div>
      <div className="titleHeader2">
        <h2>{String.fromCharCode(9733,9733,9733,9733,9733)} {review}</h2>
      </div>
    </div>;
};

export default Home;