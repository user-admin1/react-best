// src/components/ui/Text.tsx
import styled, { css } from "styled-components";

interface TextProps {
	size?: "sm" | "md" | "lg" | "xl";
	weight?: "normal" | "medium" | "bold";
}

export const Text = styled.p<TextProps>`
	color: #4b5563;
	margin: 0;

	${(props) => {
		switch (props.size) {
			case "sm":
				return css`
					font-size: 0.875rem;
				`;
			case "md":
				return css`
					font-size: 1rem;
				`;
			case "lg":
				return css`
					font-size: 1.125rem;
				`;
			case "xl":
				return css`
					font-size: 1.25rem;
				`;
			default:
				return css`
					font-size: 1rem;
				`;
		}
	}}

	${(props) => {
		switch (props.weight) {
			case "normal":
				return css`
					font-weight: 400;
				`;
			case "medium":
				return css`
					font-weight: 500;
				`;
			case "bold":
				return css`
					font-weight: 700;
				`;
			default:
				return css`
					font-weight: 400;
				`;
		}
	}}
`;
