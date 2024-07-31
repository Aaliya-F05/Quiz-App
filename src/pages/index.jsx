import { useState } from "react";
import QuizCard from "../components/QuizCard";
import "../pages/index.scss";
function Index() {
  const levels = ["Beginner", "Moderate", "Advanced"];
  const [isLevel, setIsLevel] = useState("");
  const [username, setUserName] = useState("");
  const [userEntered, setUserEntered] = useState(false);
  const [error, setError] = useState("");
  const [leaderBoard,setLeaderBoard] = useState(false);
  let usersDatas = (JSON.parse(localStorage.getItem("usersDatas")) || []).sort((a, b) => {
    return b.score - a.score;
  });


  const handleUser = () => {
    const userInput = document.getElementById("user").value;
    if (userInput) {
      setUserName(userInput);
      setUserEntered(true);
    }
  }

  const backHome = () => {
    setIsLevel("");
  }
  const handleLeaderBoard = () =>{
    setLeaderBoard(!leaderBoard);
  }
  return (
    <>
      <div className="main-container">
        {/* <div className="sub-container"> */}
          {isLevel && userEntered ? (
            <QuizCard level={isLevel} username={username} backHome={backHome} />
          ) : (
            <div className="sub-container">
              <span>Enter Username </span>
              <div className="user-content">
                <input type="text" placeholder="Ex : JohnDoeBosko" id="user" ></input>
                <button onClick={handleUser}>Enter</button>
              </div>
              {error ? <div className="error-message"><h4>{error}</h4></div> : ""}
              <p>Select your level </p>
              <div className="level-selector-container">
                {levels.map((level, index) => {
                  return (
                    <button
                      key={index}
                      value={level}
                      className="level-btn"
                      onClick={() => {
                        if (userEntered) {
                          setIsLevel(level)
                        }
                        else {
                          setError("Please enter username to proceed...");
                        }
                      }}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
              { leaderBoard ? <div className={`leader-board ${leaderBoard ? "show" : "hide"}`  }>
                <h2>Leader Board</h2>
                {usersDatas.length == 0 ?
                  <><h3 style={{ color: "#015055", fontWeight: 400, margin: "auto" }}>No Data Found</h3></>
                  : <ul>
                    {usersDatas.map((user, index) => (
                      <li key={index}
                        style={{
                          backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                          color: username === user.userName ? "#f4f8e6" : "#015055"
                        }}>
                        <span className="hash">#
                          <span className="score-rank"
                            style={{
                              backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                              color: username === user.userName ? "#f4f8e6" : "#015055", borderColor: username === user.userName ? "#f4f8e6" : "#015055"
                            }}>
                            {index + 1}
                          </span>
                          <span className="user"
                            style={{
                              backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                              color: username === user.userName ? "#f4f8e6" : "#015055"
                            }}>{username === user.userName ? "You" : user.userName}</span>
                        </span>
                        {user.score} pts </li>
                    ))}
                  </ul>
                }
              </div> : ""}
            </div>
          )}
        {/* </div> */}
      </div>
      {isLevel && userEntered ?  <></> : <button className="show-btn" onClick={handleLeaderBoard}>
        { leaderBoard ? "Hide Leaderboard" : "Show Leaderboard"}
      </button>}
    </>

  );
}

export default Index;