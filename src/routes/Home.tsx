import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

export default function Home() {
	console.log(auth.currentUser);

	return (
		<>
			<h1>Home</h1>
		</>
	);
}
