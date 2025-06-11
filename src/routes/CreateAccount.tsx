import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const focusAnimation = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`;

const labelFloat = keyframes`
  0% { transform: translateY(0); font-size: 1rem; }
  100% { transform: translateY(-150%); font-size: 0.8rem; }
`;

const Background = styled.div`
	position: fixed;
	inset: 0;
	z-index: -1;
	background: #111827;
`;

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

const Card = styled.div`
	background: #1f2937;
	padding: 40px;
	border-radius: 20px;
	width: 100%;
	max-width: 400px;
	box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
	font-size: 2rem;
	color: #f3f4f6;
	margin-bottom: 40px;
	font-family: "Fira Code", monospace;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		bottom: -10px;
		left: 0;
		width: 60px;
		height: 4px;
		background: #00ffe0;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

const InputGroup = styled.div`
	position: relative;
	animation-fill-mode: both;

	&:nth-child(1) {
		animation-delay: 0.2s;
	}
	&:nth-child(2) {
		animation-delay: 0.4s;
	}
	&:nth-child(3) {
		animation-delay: 0.6s;
	}
`;

const Label = styled.label`
	position: absolute;
	left: 16px;
	color: #9ca3af;
	transition: all 0.3s;
	pointer-events: none;
	font-size: 1rem;
	top: 50%;
	transform: translateY(-50%);

	${InputGroup}:focus-within & {
		color: #00ffe0;
		animation: ${labelFloat} 0.3s forwards;
	}
`;

const InputLine = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background: #00ffe0;
	transform-origin: left;
	transform: scaleX(0);
`;

const Input = styled.input`
	width: 100%;
	background: transparent;
	border: none;
	border-bottom: 2px solid #374151;
	padding: 16px;
	color: #f3f4f6;
	font-size: 1rem;
	transition: all 0.3s;

	&:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.05);
	}

	&:focus + ${InputLine} {
		animation: ${focusAnimation} 0.3s forwards;
	}

	&::placeholder {
		color: transparent;
	}
`;

const Button = styled.button`
	margin-top: 20px;
	padding: 16px;
	border: none;
	border-radius: 8px;
	background: #00ffe0;
	color: #111827;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 255, 224, 0.2);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

export default function CreateAccount() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "name") setName(value);
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
				"[Account] 생성 과정에서 문제가 발생하였습니다: 폼이 모두 비어 있습니다."
			);
			return;
		}
		try {
			// 이메일과 비밀번호를 이용해 계정 생성 요청
			// 계정이 생성된다면, 바로 계정으로 로그인됨

			// promise를 전달하는 createUserWithEmailAndPassword 전달달
			const credentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			); // state의 email, password 사용

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
				"[Account] 생성 과정에서 문제가 발생하였습니다: 문제가 발생했습니다. \n 자세한 내용은 아래를 확인하세요."
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
			<Background />
			<Wrapper>
				<Card>
					<Title>Account Creation</Title>
					<Form onSubmit={handleSubmit}>
						<InputGroup>
							<Label>이름</Label>
							<Input
								name="name"
								value={name}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
							<InputLine />
						</InputGroup>
						<InputGroup>
							<Label>이메일</Label>
							<Input
								name="email"
								type="email"
								value={email}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
							<InputLine />
						</InputGroup>
						<InputGroup>
							<Label>비밀번호</Label>
							<Input
								name="password"
								type="password"
								value={password}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
							<InputLine />
						</InputGroup>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "생성 중..." : "계정 생성"}
						</Button>
					</Form>
				</Card>
			</Wrapper>
			{error ? <h1>{error}</h1> : null}
		</>
	);
}
