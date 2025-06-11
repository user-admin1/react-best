import type React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// React.ReactNode는 React에서 로드 가능한 모든 요소를 말함
// 이 함수는 유저의 로그인 상태를 확인하고, 보호된 라우트 요소를 렌더링할지 결정함
export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	// 현재 유저를 user에 저장(현재 유저가 없다면, null)
	const user = auth.currentUser;

	// 유저가 없다면
	if (user === null) {
		return (
			<Wrapper>
				<Card>
					<Icon>⚠️</Icon>
					<Title>아직 로그인하지 않으셨습니다</Title>
					<Message>
						계정이 없으시다면 아래 버튼을 눌러 생성하세요.
					</Message>
					<StyledLink to="/account/create">계정 생성하기</StyledLink>
				</Card>
			</Wrapper>
		);
	}

	console.log(user);
	return children;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: linear-gradient(to bottom right, #cbd5e1, #a5b4fc);
	padding: 1rem;
	animation: ${fadeIn} 0.6s ease forwards;
`;

const Card = styled.div`
	max-width: 400px;
	width: 100%;
	background: white;
	border-radius: 16px;
	box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
	padding: 2rem;
	text-align: center;
`;

const Icon = styled.div`
	font-size: 2.5rem;
	margin-bottom: 1rem;
	color: #facc15;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
	color: #1f2937;
	margin-bottom: 0.5rem;
`;

const Message = styled.p`
	color: #4b5563;
	margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
	display: inline-block;
	background-color: #6366f1;
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	text-decoration: none;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #4f46e5;
	}
`;
