// src/components/ui/Form.tsx
import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 400px;
	width: 100%;
	background: white;
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid #d1d5db;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: #6366f1;
	}
`;
