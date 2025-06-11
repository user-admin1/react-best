import styled, { keyframes } from "styled-components";

const bgGradient = "linear-gradient(135deg, #232526 0%, #414345 100%)";

const Wrapper = styled.div`
	min-height: 100vh;
	width: 100vw;
	background: ${bgGradient};
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
`;

const ParticleAnim = keyframes`
	0% {
		opacity: 0.7;
		transform: translateY(0) scale(1);
	}
	80% {
		opacity: 0.3;
		transform: translateY(-120px) scale(0.7);
	}
	100% {
		opacity: 0;
		transform: translateY(-150px) scale(0.5);
	}
`;

const ParticleContainer = styled.div`
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 1;
`;

const Particle = styled.div`
	position: absolute;
	left: ${() => Math.random() * 100}vw;
	bottom: -20px;
	width: ${() => 4 + Math.random() * 8}px;
	height: ${() => 4 + Math.random() * 8}px;
	background: radial-gradient(circle, #fff, #b3c6ff 60%, transparent 100%);
	border-radius: 50%;
	opacity: 0.7;
	animation: ${ParticleAnim} ${() => 2 + Math.random() * 2}s linear infinite;
	animation-delay: ${() => Math.random() * 2}s;
`;

const spin = keyframes`
	100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Spinner = styled.div`
	width: 56px;
	height: 56px;
	border: 6px solid #b3c6ff;
	border-top: 6px solid #fff;
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
	margin-bottom: 24px;
	box-shadow: 0 0 24px #b3c6ff66;
`;

const Text = styled.div`
	color: #fff;
	font-size: 1.5rem;
	letter-spacing: 0.1em;
	font-weight: 600;
	text-shadow: 0 2px 8px #23252699;
`;

export default function Loading() {
	return (
		<Wrapper>
			<ParticleContainer>
				{[...Array(50)].map((_, i) => (
					<Particle key={i} />
				))}
			</ParticleContainer>
			<LoadingContainer>
				<Spinner />
				<Text>Loading...</Text>
			</LoadingContainer>
		</Wrapper>
	);
}
