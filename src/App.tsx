import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Account from "./components/Account";
import CreateAccount from "./routes/CreateAccount";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import FindAccount from "./routes/FindAccount";

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
		element: <Layout />,
		children: [
			{ path: "login", element: <Login /> },
			{ path: "create", element: <CreateAccount /> },
			{ path: "findaccount", element: <FindAccount /> },
		],
	},
	{
		path: "/loading",
		element: <Loading />,
	},
]);

// 글로벌 스타일 지정
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to bottom right, #cbd5e1, #a5b4fc);
    color: #111827;
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
