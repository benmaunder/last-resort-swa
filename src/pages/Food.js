import lasagna from '../assets/lasagna.gif'

const Food = () => {
  return <div
            style={{
                alignItems: "center",
                justifyItems: "center",
                padding: "0 1rem",
                height: "100%",
                marginTop: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }}
          >
            <img src={lasagna} alt="loading..." style={{
                alignItems: "center",marginLeft: "auto",
                marginRight: "auto"}}/>
          </div>;
};

export default Food;