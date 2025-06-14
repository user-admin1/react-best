import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Nav = styled.nav`
	width: 100%;
	height: 60px;
	background-color: white;
	border-bottom: 1px solid #eaeaea;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	padding: 0 2rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const NavLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
`;

const NavRight = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const NavLink = styled.div`
	text-decoration: none;
	color: #333;
	font-weight: 500;
	transition: color 0.2s ease;

	&:hover {
		color: #007aff;
	}
`;

interface NavigationBarProps {
	isLoggedIn: boolean;
}

export function NavigationBar({ isLoggedIn }: NavigationBarProps) {
	const navigate = useNavigate();
	return (
		<Nav>
			<NavContent>
				<NavLeft>
					{/* <NavLink>
						<Text size="lg" weight="bold">
							React Best
						</Text>
					</NavLink> */}
					<NavLink>
						<Link to="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								style={{ width: "24px", height: "24px" }}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
								/>
							</svg>
						</Link>
					</NavLink>
				</NavLeft>
				<NavRight>
					{isLoggedIn ? (
						<>
							<NavLink>
								<Link to="/profile">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
										style={{
											width: "24px",
											height: "24px",
										}}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								</Link>
							</NavLink>
							<NavLink
								onClick={async () => {
									await auth.signOut();
									navigate("/account/login");
								}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-6"
									style={{ width: "24px", height: "24px" }}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
									/>
								</svg>
							</NavLink>
						</>
					) : (
						<>
							<NavLink>로그인</NavLink>
							<NavLink>회원가입</NavLink>
						</>
					)}
				</NavRight>
			</NavContent>
		</Nav>
	);
}
