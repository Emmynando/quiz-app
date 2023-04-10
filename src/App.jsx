import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./Pages/RootLayout";
import Home from "./Pages/Home";
import QuestionPage from "./Pages/Question";
import FormPage from "./Pages/Form";
import EditQuizPage from "./Pages/EditQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: () => {},
      },
      {
        path: ":quizSection",
        element: <QuestionPage />,
      },
      {
        path: "create-quiz",
        element: <FormPage />,
      },
      {
        path: ":editQuiz",
        element: <EditQuizPage />,
      },
    ],
  },
]);
// const initialQuizState = {
//   id: "",
//   password: "",
//   title: "",
//   description: "",
//   time: 0,
//   marks: 0,
//   questions: [],
// };

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
