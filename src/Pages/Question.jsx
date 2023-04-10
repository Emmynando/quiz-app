import { useParams } from "react-router-dom";
import QuestionDetails from "../components/Layout/QuestionDetails";

function QuestionPage() {
  const params = useParams();
  return <QuestionDetails />;
}

export default QuestionPage;
