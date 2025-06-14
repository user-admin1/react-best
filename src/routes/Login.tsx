import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper } from "../components/ui/Wrapper";
import { Form, Input } from "../components/ui/Form";
import { Button } from "../components/ui/Button";
import { Title } from "../components/ui/Title";
import { Text } from "../components/ui/Text";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const GithubLoginButton = styled.button`
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

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("ioom");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	function GithubButton({ color }: { color?: string }) {
		const navigate = useNavigate();
		if (color === undefined) {
			color = "black";
		}

		// github 로그인/회원가입 버튼을 클릭하였을 때 진행
		// 로그인하던 회원가입하던 같은 AuthProvider로 진행하면 됨
		async function githubbuttononclick() {
			try {
				setIsLoading(true);
				// 새 GithubAuthProvider 인스턴스 생성
				const provider = new GithubAuthProvider();

				// 오류 발생 시, firebase project 설정에서 허용된 도메인 사용 설정

				// firebase.ts에서 auth 사용
				// popup과 함께 사용
				await signInWithPopup(auth, provider);

				// redirect와 함께 사용
				// await signInWithRedirect(auth, provider);
				setIsLoading(false);
				navigate("/");
			} catch (error) {
				console.log(error);
			}
		}
		return (
			<GithubLoginButton onClick={githubbuttononclick}>
				<Logo
					src={
						color === "white"
							? "/public/github-mark-white.svg"
							: "/public/github-mark.svg"
					}></Logo>
				Continue with GitHub
			</GithubLoginButton>
		);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "name") setName("value");
		else if (name === "email") setEmail(value);
		else if (name === "password") setPassword(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		// 현재 요청을 클라이언트에서 검증
		if (isLoading || name === "" || password === "" || email === "") {
			console.log(
				"[Account] 로그인 과정에서 문제가 발생하였습니다: 폼이 모두 비어 있습니다."
			);
			setIsLoading(false);
			setError("모든 필드를 입력해주세요.");
			// 모든 필드가 비어있다면, 에러 메시지 출력 후 종료
			// 에러 메시지 출력 후, 로딩 상태를 false로 변경
			return;
		}
		try {
			// 이메일과 비밀번호를 이용해 계정 생성 요청
			// 계정이 생성된다면, 바로 계정으로 로그인됨

			// promise를 전달하는 signInWithEmailAndPassword 전달
			const credentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			// email과 password가 일치하지 않는다면, catch로 이동

			// 생성된 계정의 credentials 출력
			console.log(
				credentials.user,
				credentials.providerId,
				credentials.operationType
			);

			// credentials.user로 유저를 식별하고, 해당 사용자의 displayName, 값을 입력받은 name로 변경경
			await updateProfile(credentials.user, {
				displayName: name,
			});

			// 완료된 후, 루트로 이동
			console.log("[Account] 완료되었습니다. '/' 으로 이동합니다.");
			navigate("/");
		} catch (error) {
			console.log(
				"[Account] 로그인 과정에서 문제가 발생하였습니다: 문제가 발생했습니다. \n 자세한 내용은 아래를 확인하세요."
			);
			if (error instanceof FirebaseError) {
				console.log(error.code, error.message);
				setError(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Wrapper>
				<Form
					style={{
						width: 600,
					}}
					onSubmit={handleSubmit}>
					<Title>Login</Title>
					<Input
						placeholder="이메일"
						name="email"
						type="email"
						value={email}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
					<Input
						placeholder="비밀번호"
						name="password"
						type="password"
						value={password}
						onChange={handleChange}
						required
						disabled={isLoading}
					/>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "로그인 중..." : "로그인"}
					</Button>
					<div
						style={{
							display: "flex",
							gap: 5,
							marginTop: 8,
							justifyContent: "center",
							alignItems: "center",
							width: 500,
						}}>
						<Button
							type="button"
							onClick={() => {
								navigate("/account/create");
							}}>
							계정 생성하기
						</Button>
						<Button
							type="button"
							onClick={() => {
								navigate("/account/findaccount");
							}}>
							계정을 잊었어요!
						</Button>
						<GithubButton color="white" />
					</div>
				</Form>
			</Wrapper>

			{error ? <Text>{error}</Text> : null}
		</>
	);
}
