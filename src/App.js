import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
const url =
  "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20";

const App = () => {
  // state setup
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [person, setPerson] = useState([]);
  const [value, setValue] = useState(0);

  // fetching data from the web API
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setList(results);
    setPerson(results[0]);
    setLoading(false);
  };

  // single data traversing
  const singleData = (id) => {
    const singlePerson = list.find((item) => item === list[id]);
    setPerson(singlePerson);
  };

  // for initial render useEffect call the function
  useEffect(() => {
    fetchData();
  }, []);

  // render loading
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <section>
      <Navigation />
      <div className="container">
        {/* single user information start */}
        <div className="header">
          <div className="hero">
            <img
              src={person.picture.large}
              className="image"
              height="120"
              width="120"
            />
          </div>

          <div className="hero-detail">
            <h1>
              <u>{`${person.name.title} ${person.name.first} ${person.name.last}`}</u>
            </h1>
            {/* address section start */}
            <p>
              <span
                style={{ color: "#a259ff" }}
              >{`${person.location.street.number}`}</span>
              {` ${person.location.street.name}`}, Born,{" "}
              <b>{person.location.city}</b>,{person.location.postcode}
            </p>
            <p>
              {`${person.location.timezone.offset} - ${person.location.timezone.description}, `}
              <u>{person.location.state}</u>,<i> {person.location.country}</i>
            </p>
            <p>
              <span style={{ color: "#8a8a8a" }}> Male</span>
            </p>

            {/* address section ends */}
          </div>
        </div>

        {/* single user information end */}

        {/* users list start */}
        <div className="box-container">
          {/* looping data over the array */}
          {list.map((item, index) => {
            const { gender, nat, name, email, id } = item;
            const { title, first, last } = name;
            return (
              <div
                key={index}
                onClick={() => {
                  singleData(index);
                  setValue(index);
                }}
                className={`box ${index === value && "active"}`}
              >
                <p>
                  {gender}-{nat}
                </p>
                <h2>{`${title} ${first} ${last}`}</h2>
                <a>{email}</a>
              </div>
            );
          })}
        </div>

        {/* users list end */}
      </div>
    </section>
  );
};

export default App;
