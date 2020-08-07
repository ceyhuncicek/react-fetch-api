import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState();
  const [search, setSearch] = useState("vodka");

  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://the-cocktail-db.p.rapidapi.com/search.php?i=${search}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "4e5a9c6606msh0502fd0ee10632fp1394b0jsna7cfb4ba39c1"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setResult(result);
          console.log(search);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {console.log(result)}
        <div className="resultContainer">
          {result?.ingredients?.map(ingredients => (
            <div className="result__listItem" key={ingredients?.idIngredient}>
              <p>
                <b>Name:</b>
                {ingredients?.strIngredient}
              </p>
              <p>
                <b>Description: </b>
                {ingredients?.strDescription}
              </p>
            </div>
          ))}
        </div>
      </ul>
    );
  }
}

export default App;
