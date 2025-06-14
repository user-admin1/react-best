// src/components/ui/Wrapper.tsx
import styled from "styled-components";
import { fadeInUp } from "./animations";

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 1rem;
	animation: ${fadeInUp} 0.6s ease forwards;
`;
