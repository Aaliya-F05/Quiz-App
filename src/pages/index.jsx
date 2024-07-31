import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import LeaderBoard from "../components/LeaderBoard";
import "../pages/index.scss";
import logo from "../assets/logo.svg"

function Index() {
  const levels = ["Beginner", "Moderate", "Advanced"];
  const [isLevel, setIsLevel] = useState("");
  const [username, setUserName] = useState("");
  const [userEntered, setUserEntered] = useState(false);
  const [error, setError] = useState("");
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [leaderBoardClass, setLeaderBoardClass] = useState("");

  let usersDatas = (JSON.parse(localStorage.getItem("usersDatas")) || []).sort((a, b) => {
    return b.score - a.score;
  });

  const handleUser = () => {
    const userInput = document.getElementById("user").value;
    if (userInput) {
      setUserName(userInput);
      setUserEntered(true);
    }
  };
  useEffect(()=>{
    const handleReload = (e) =>{
      e.preventDefault();
      e.returnValue = "You have unsaved changes. Are you sure you want to exit?";
    };
    if(isLevel){
      window.addEventListener("beforeunload",handleReload);
    }
    else{
      window.removeEventListener("beforeunload",handleReload);
    }
  },[isLevel]);

  const backHome = () => {
    setIsLevel("");
  };

  const handleLeaderBoard = () => {
    if (leaderBoard) {
      setLeaderBoardClass("hide");
      setTimeout(() => {
        setLeaderBoard(false);
        setLeaderBoardClass("");
      }, 300);
    } else {
      setLeaderBoard(true);
      setLeaderBoardClass("show");
    }
  };

  return (
    <>
        <nav>
          <img src={logo}></img>
          <p> QuizQuest</p>
        </nav>
      <div className="main-container">
    
        {isLevel && userEntered ? (
          <QuizCard level={isLevel} username={username} backHome={backHome}  error={error} setError={setError}/>
        ) : (
          <div className="sub-container">
            <span>Enter Username </span>
            <div className="user-content">
              <input type="text" placeholder="Ex : JohnDoeBosko" id="user" />
              <button onClick={handleUser}>Enter</button>
            </div>
            {error && <div className="error-message"><h4>{error}</h4></div>}
            <p>Select your level </p>
            <div className="level-selector-container">
              {levels.map((level, index) => (
                <button
                  key={index}
                  value={level}
                  className="level-btn"
                  onClick={() => {
                    if (userEntered) {
                      setIsLevel(level);
                      setError("");
                    } else {
                      setError("Please enter username to proceed...");
                    }
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
            {leaderBoard && (
              <LeaderBoard
                usersDatas={usersDatas}
                username={username}
                leaderBoardClass={leaderBoardClass}
              />
            )}
            <button className="show-btn" onClick={handleLeaderBoard}>
              {leaderBoard ? "Hide Leaderboard" : "Show Leaderboard"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;