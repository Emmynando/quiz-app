import { Link } from "react-router-dom";
import styles from "./ScoreBoard.module.css";
function ScoreBoard(props) {
  return (
    <>
      <div className={styles.score}>
        <div className={styles.text}>
          Your Score is{" "}
          <span className={styles["main-score"]}>{props.score}</span>
        </div>
        <button>
          <Link to="/">Go back home</Link>
        </button>
      </div>
    </>
  );
}

export default ScoreBoard;
