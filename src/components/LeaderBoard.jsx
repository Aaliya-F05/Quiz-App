import "../pages/index.scss";

function LeaderBoard({ usersDatas, username, leaderBoardClass }) {
  return (
    <div className={`leader-board ${leaderBoardClass}`}>
      <h2>Leader Board</h2>
      {usersDatas.length === 0 ? (
        <h3 style={{ color: "#015055", fontWeight: 400, margin: "auto" }}>No Data Found</h3>
      ) : (
        <ul>
          {usersDatas.map((user, index) => (
            <li
              key={index}
              style={{
                backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                color: username === user.userName ? "#f4f8e6" : "#015055",
              }}
            >
              <span className="hash">
                #
                <span
                  className="score-rank"
                  style={{
                    backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                    color: username === user.userName ? "#f4f8e6" : "#015055",
                    borderColor: username === user.userName ? "#f4f8e6" : "#015055",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  className="user"
                  style={{
                    backgroundColor: username === user.userName ? "#015055" : "#f4f8e6",
                    color: username === user.userName ? "#f4f8e6" : "#015055",
                  }}
                >
                  {username === user.userName ? "You" : user.userName}
                </span>
              </span>
              {user.score} pts
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LeaderBoard;
