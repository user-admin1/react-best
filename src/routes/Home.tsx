import { auth } from "../firebase";

function logout() {
	console.log(
		"[Account] We're Logging out you,",
		auth.currentUser?.displayName
	);
	auth.signOut();
	console.log("[Account] Logged out.");
}

export default function Home() {
	return (
		<>
			<h1>Home</h1>
			<button onClick={logout}>Logout</button>
		</>
	);
}
