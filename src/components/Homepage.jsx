import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Source } from "../App";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { localToken, setLocalToken, active, setActive } = useContext(Source);
  const navigate = useNavigate();
  const [essayScore, setEssayScore] = useState("");
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async function call() {
      try {
        await axios
          .get("/auth/verify", {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          })
          .then(() => {
            axios
              .get("/card/reveal", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                setCards(res.data.cards);
              });
          })
          .catch(() => {
            if (localStorage.getItem("admin")) localStorage.removeItem("admin");
            localStorage.removeItem("token");
            setLocalToken("");
            navigate("/register");
          });
      } catch (error) {
        if (localStorage.getItem("admin")) localStorage.removeItem("admin");
        localStorage.removeItem("token");
        setLocalToken("");
        navigate("/register");
      }
    })();
  }, []);

  function handleClick() {
    setActive((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "/card/add",
          {
            title,
            essayScore,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          axios
            .get("/card/reveal", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              setCards(res.data.cards);
            });
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }

    setActive((prev) => !prev);
  };

  return (
    <div className="homepage-parent">
      <div className="wrapper1">
        <button
          className="logout"
          onClick={() => {
            if (localStorage.getItem("admin")) localStorage.removeItem("admin");
            localStorage.removeItem("token");
            setLocalToken("");
            navigate("/");
          }}
        >
          Log Out
        </button>
        <div className="center">
          {!active && (
            <button onClick={handleClick} className="add-card-btn">
              add new card
            </button>
          )}
        </div>

        <ul className="list">
          {cards.map((item, index) => {
            const currentScore = cards[index].essayScore;
            const prevCard = cards[index - 1];
            let improvement = 0;
            let color = "gray";

            if (prevCard !== undefined) {
              const prevScore = prevCard.essayScore;
              const subtract = currentScore - prevScore;
              improvement = Math.floor((subtract / 16) * 100);
              color = "gray";

              if (improvement < 0) {
                improvement = `${-improvement}% down`;
                color = "red";
              } else if (improvement === 0) {
                improvement = "0%";
                color = "gray";
              } else {
                improvement = `${improvement}% up`;
                color = "green";
              }
            } else {
              improvement = "0%";
            }

            {
              return (
                !active && (
                  <div key={index} className="card">
                    <li>{item.title}</li>
                    <p>
                      <span className="bold">EssayScore:</span>{" "}
                      {item.essayScore}
                    </p>
                    <p>
                      <span className="bold">Improvement:</span>{" "}
                      <span className="bold" style={{ color: color }}>
                        {improvement}
                      </span>
                    </p>
                  </div>
                )
              );
            }
          })}
        </ul>

        {active && (
          <form className="model" onSubmit={handleSubmit}>
            <p className="x" onClick={() => setActive((prev) => !prev)}>
              X
            </p>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="e.g. first essay"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div>
              <label htmlFor="essayScore">Essay Score</label>
              <input
                type="number"
                id="essayScore"
                placeholder="e.g. 10"
                onChange={(e) => setEssayScore(e.target.value)}
                value={essayScore}
                min={0}
                max={16}
                required
              />
            </div>

            <button className="add-card-btn add-card">Add Card</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Homepage;
