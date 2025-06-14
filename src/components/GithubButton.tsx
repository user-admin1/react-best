import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
	background-color: #24292e;
	color: white;
	border: none;
	border-radius: 6px;
	padding: 12px 16px;
	display: flex;
	align-items: center;
	&:hover {
		background-color: #3b4045;
	}
	cursor: pointer;
`;

const Logo = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 8px;
`;

export default function GithubButton({ color }: { color?: string }) {
	const navigate = useNavigate();
	if (color === undefined) {
		color = "black";
	}

	// github 로그인/회원가입 버튼을 클릭하였을 때 진행
	// 로그인하던 회원가입하던 같은 AuthProvider로 진행하면 됨
	async function githubbuttononclick() {
		try {
			// 새 GithubAuthProvider 인스턴스 생성
			const provider = new GithubAuthProvider();

			// 오류 발생 시, firebase project 설정에서 허용된 도메인 사용 설정

			// firebase.ts에서 auth 사용
			// popup과 함께 사용
			await signInWithPopup(auth, provider);

			// redirect와 함께 사용
			// await signInWithRedirect(auth, provider);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Button onClick={githubbuttononclick}>
			<Logo
				src={
					color === "white"
						? "/public/github-mark-white.svg"
						: "/public/github-mark.svg"
				}></Logo>
			Continue with GitHub
		</Button>
	);
}
