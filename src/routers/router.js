import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import Join from "../pages/member/Join";
import Login from "../pages/member/Login";
import Layout from "../pages/layout/Layout";
import Mypage from "../pages/member/Mypage";
import AuthLayout from "../pages/layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "member/join",
        element: <Join />,
      },
      {
        path: "member/login",
        element: <Login />,
      },
      {
        // 보호된 라우트
        element: <AuthLayout />,
        children: [
          {
          
          path: "member/my-page",
          element: <Mypage />,
          }
        ]
      }
    ]
  },
]);

export default router;