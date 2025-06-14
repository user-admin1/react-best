import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	console.log(auth.currentUser);

	return (
		<>
			<h1>Home</h1>
		</>
	);
}
