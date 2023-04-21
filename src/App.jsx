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
      },
      {
        path: ":quizSection/:id",
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

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
