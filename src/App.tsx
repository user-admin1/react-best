import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Account from "./components/Account";
import CreateAccount from "./routes/CreateAccount";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "/account",
		element: <Account />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "create", element: <CreateAccount /> },
		],
	},
	{
		path: "/loading",
		element: <Loading />,
	},
]);

// 글로벌 스타일 지정
const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;

  }
`;

function App() {
	const [loading, setLoading] = useState(true);
	async function init() {
		// firebase 연결
		await auth.authStateReady();
		setLoading(false);
	}
	useEffect(() => {
		init();
	}, []);
	return (
		<>
			<GlobalStyle />
			{loading ? <Loading /> : <RouterProvider router={router} />}
		</>
	);
}

export default App;
