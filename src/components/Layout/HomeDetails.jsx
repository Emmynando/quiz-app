import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { quizData } from "../../store/quiz-action";
import { fetchQuizData } from "../../store/quiz-action";
import { useSelector, useDispatch } from "react-redux";
import styles from "./HomeDetails.module.css";
import Card from "../UI/Card";

const Quiz_Data = [
  {
    id: 1,
    quizTitle: "Forestry",
    description:
      "This quiz is related to questions pertaining forestry, do well to gain high score",
  },
  {
    id: 2,
    quizTitle: "Globetrotting",
    description:
      "This quiz is related to questions pertaining travelling, do well to gain high score",
  },
];

function HomeDetails() {
  const dispatch = useDispatch();
  const quizSelector = useSelector((state) => state.quiz);
  console.log(quizSelector);

  let isInitial;
  useEffect(() => {
    dispatch(fetchQuizData());
  }, [dispatch]);

  // useEffect(() => {
  //   if (quizSelector.changed) {
  //     dispatch(quizData(quizSelector));
  //   }
  // }, [quizSelector, dispatch]);

  return (
    <Card>
      <div className={styles["home-container"]}>
        <h2>Ready for a Quiz?</h2>
        <h4> Select any from the quizes below</h4>
      </div>

      {/* <div className={styles["list-container"]}> */}
      {/* maps the quiz so users can select */}
      {/* {quizSelector.map((items) => (
          <div key={items.id} id={items.id} className={styles["quiz-item"]}>
            <Link to=":edit-quiz">
              <h5> {items.title}</h5>
              <p>{items.description}</p>
            </Link>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div> */}
      {/* ))} */}
      {/* </div> */}
    </Card>
  );
}

export default HomeDetails;
