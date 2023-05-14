import { createHashRouter } from "react-router-dom";
import SharedPage from "../containers/SharedPage";
import LoginPage from "../containers/LoginPage";
import NotFoundPage from "../containers/NotFoundPage";
import ProtectedRouter from "./ProtectedRouter";
import SignUp from "../containers/SignUpPage";
import CreateShared from "../containers/CreateSharedPage";

const router = createHashRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <SharedPage />
      </ProtectedRouter>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/shared",
    element: (
      <ProtectedRouter>
        <SharedPage />
      </ProtectedRouter>
    ),
  },
  {
    path: "/create-shared",
    element: (
      <ProtectedRouter>
        <CreateShared />
      </ProtectedRouter>
    ),
  },
]);

export default router;
