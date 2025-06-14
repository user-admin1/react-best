import { Wrapper } from "../components/ui/Wrapper";
import { Title } from "../components/ui/Title";
import { Text } from "../components/ui/Text";
import { Button } from "../components/ui/Button";
import { Form, Input } from "../components/ui/Form";
import { useState, type FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function FindAccount() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<Title>비밀번호 재설정</Title>
			<Wrapper>
				<Form
					onSubmit={async (event: FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						const value = formData.get("email") as string;
						setLoading(true);
						try {
							await sendPasswordResetEmail(auth, value);
							console.log("발송됨");
							setLoading(false);
							alert(
								"완료되었습니다.\n 로그인 화면으로 돌아갑니다."
							);
							navigate("/account/login");
						} catch (error: any) {
							console.log(error.message);
						}
					}}>
					<Text>
						비밀번호를 잊으셨군요! <br />
						아래에 회원가입된 계정의 이메일을 입력하시고, 비밀번호
					</Text>
					<Input
						type="email"
						name="email"
						placeholder="이메일을 입력하세요"
						required></Input>
					<Button type="submit">전송하기</Button>
					<Text
						style={{
							fontSize: 15,
							color: "black",
						}}>
						{loading ? "전송중..." : "이메일을 입력해 주세요."}
					</Text>
				</Form>
			</Wrapper>
		</>
	);
}
