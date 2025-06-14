// src/components/ui/Button.tsx
import styled from "styled-components";

export const Button = styled.button`
	display: inline-block;
	background-color: #6366f1;
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	text-decoration: none;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #4f46e5;
	}
`;
