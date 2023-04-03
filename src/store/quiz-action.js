import { quizActions } from "./QuizSlice";
// sending data to cart
export const postQuizData = (quizSelector) => {
  return async (dispatch) => {
    const sendQuizData = async () => {
      const data = await fetch(
        "https://quiz-app-13f7b-default-rtdb.firebaseio.com//quiz.json",
        {
          method: "POST",
          body: JSON.stringify(quizSelector),
        }
      );
      if (!data.ok) {
        throw new Error("error sending data");
      }

      const response = await data.json();
      return response;
    };

    try {
      await sendQuizData();
    } catch (err) {
      console.log(err);
    }
  };
};

// fetching data from firebase
export function fetchQuizData() {
  return async (dispatch) => {
    async function getQuizData() {
      const fetchData = await fetch(
        "https://quiz-app-13f7b-default-rtdb.firebaseio.com//quiz.json"
      );
      if (!fetchData.ok) {
        throw new Error("error fetching data");
      }
      const response = await fetchData.json();
      return response;
    }
    try {
      const quizData = await getQuizData();
      dispatch(quizActions.fetchQuiz(quizData));
    } catch (err) {
      console.log(err.message);
    }
  };
}
