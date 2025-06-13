# Firebase Authentication 함수 & 메소드 정리

## 목차

-   [1. 함수(Function)](#1-함수function)

    -   [1.1 기본 로그인 함수](#11-기본-로그인-함수)
    -   [1.2 사용자 정보 변경 함수](#12-사용자-정보-변경-함수)
    -   [1.3 이메일 인증 및 비밀번호 복구 함수](#13-이메일-인증-및-비밀번호-복구-함수)
    -   [1.4 보안 관련 함수](#14-보안-관련-함수)
    -   [1.5 계정 연결/해제 및 조회 함수](#15-계정-연결해제-및-조회-함수)

-   [2. 메소드(Method)](#2-메소드method)

    -   [2.1 사용자 객체 속성과 메소드](#21-사용자-객체-속성과-메소드)

---

## 1. 함수(Function)

> 함수는 `firebase/auth`에서 가져와 `auth` 인스턴스와 함께 사용하는 함수입니다.

---

### 1.1 기본 로그인 함수

---

#### `signInWithPopup(auth, provider)`

-   **용도**: OAuth 팝업 창을 통해 로그인 (Google, GitHub 등)
-   **주의**: 모바일에서 팝업 차단 이슈 가능

```ts
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
	.then((result) => {
		console.log("로그인 성공:", result.user);
	})
	.catch((error) => {
		console.error("로그인 실패:", error.message);
	});
```

---

#### `signInWithRedirect(auth, provider)`

-   **용도**: 리디렉션 방식 로그인. 모바일에서 권장
-   **주의**: 로그인 후 돌아올 때 앱이 다시 초기화됨

```ts
signInWithRedirect(auth, new GoogleAuthProvider());
```

---

#### `getRedirectResult(auth)`

-   **용도**: `signInWithRedirect` 후 돌아온 페이지에서 로그인 결과를 받음

```ts
getRedirectResult(auth)
	.then((result) => {
		if (result) {
			console.log("로그인 완료:", result.user);
		}
	})
	.catch((error) => {
		console.error("오류:", error.message);
	});
```

---

#### `signInWithEmailAndPassword(auth, email, password)`

-   **용도**: 이메일/비밀번호 로그인
-   **반환값**: `UserCredential`

```ts
signInWithEmailAndPassword(auth, "test@example.com", "securePassword123")
	.then((userCredential) => {
		console.log("로그인:", userCredential.user);
	})
	.catch((error) => {
		console.error("오류:", error.message);
	});
```

---

#### `createUserWithEmailAndPassword(auth, email, password)`

-   **용도**: 이메일/비밀번호로 회원가입

```ts
createUserWithEmailAndPassword(auth, "new@example.com", "mypassword")
	.then((userCredential) => {
		console.log("가입 완료:", userCredential.user);
	})
	.catch((error) => {
		console.error("실패:", error.message);
	});
```

---

#### `signOut(auth)`

-   **용도**: 현재 사용자 로그아웃

```ts
signOut(auth)
	.then(() => console.log("로그아웃 완료"))
	.catch((error) => console.error("실패:", error.message));
```

---

#### `onAuthStateChanged(auth, callback)`

-   **용도**: 로그인 상태가 변경될 때 콜백 실행

```ts
onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log("로그인된 사용자:", user.email);
	} else {
		console.log("로그아웃 상태");
	}
});
```

---

### 1.2 사용자 정보 변경 함수

---

#### `updateProfile(user, { displayName, photoURL })`

```ts
updateProfile(auth.currentUser, {
	displayName: "홍길동",
	photoURL: "https://example.com/avatar.png",
});
```

---

#### `updateEmail(user, newEmail)`

```ts
updateEmail(auth.currentUser, "newemail@example.com")
	.then(() => console.log("이메일 변경 완료"))
	.catch((err) => console.error(err.message));
```

---

#### `updatePassword(user, newPassword)`

```ts
updatePassword(auth.currentUser, "newSecurePassword!")
	.then(() => console.log("비밀번호 변경 완료"))
	.catch((err) => console.error(err.message));
```

---

### 1.3 이메일 인증 및 비밀번호 복구 함수

---

#### `sendEmailVerification(user)`

```ts
sendEmailVerification(auth.currentUser)
	.then(() => console.log("이메일 인증 링크 발송"))
	.catch((err) => console.error(err.message));
```

---

#### `sendPasswordResetEmail(auth, email)`

```ts
sendPasswordResetEmail(auth, "user@example.com")
	.then(() => console.log("비밀번호 재설정 이메일 발송"))
	.catch((err) => console.error(err.message));
```

---

#### `verifyPasswordResetCode(auth, code)`

-   **용도**: 비밀번호 재설정 이메일의 링크(코드)가 유효한지 확인하고, 해당 코드가 어떤 이메일 계정에 속하는지 반환합니다.
-   **설명**: 사용자가 비밀번호 재설정 이메일의 링크를 클릭하면, URL에 포함된 코드를 이 함수에 전달하여 유효성을 검사합니다. 코드가 유효하면 연결된 이메일 주소를 반환합니다. 유효하지 않거나 만료된 경우 에러가 발생합니다.

```ts
verifyPasswordResetCode(auth, code)
	.then((email) => console.log("코드 확인됨, 이메일:", email))
	.catch((err) => console.error(err.message));
```

---

#### `confirmPasswordReset(auth, code, newPassword)`

-   **용도**: 비밀번호 재설정 이메일의 링크(코드)와 새 비밀번호를 전달하여 실제로 비밀번호를 변경합니다.
-   **설명**: 사용자가 비밀번호 재설정 폼에서 새 비밀번호를 입력하고 제출할 때 사용합니다. 코드가 유효하고 새 비밀번호가 정책에 맞으면 비밀번호가 변경됩니다. 이후 사용자는 새 비밀번호로 로그인할 수 있습니다.

```ts
confirmPasswordReset(auth, code, "newPassword123")
	.then(() => console.log("비밀번호 재설정 완료"))
	.catch((err) => console.error(err.message));
```

---

### 1.4 보안 관련 함수

---

#### `reauthenticateWithCredential(user, credential)`

-   **용도**: 이메일 변경, 비밀번호 변경 등 민감 작업 전에 사용자 재인증 필요

```ts
import { EmailAuthProvider } from "firebase/auth";

const credential = EmailAuthProvider.credential(
	"user@example.com",
	"password123"
);

reauthenticateWithCredential(auth.currentUser, credential)
	.then(() => console.log("재인증 성공"))
	.catch((err) => console.error(err.message));
```

---

### 1.5 계정 연결/해제 및 조회 함수

---

#### `linkWithPopup(user, provider)`

```ts
linkWithPopup(auth.currentUser, new GoogleAuthProvider())
	.then((result) => console.log("계정 연결 완료:", result.user))
	.catch((err) => console.error(err.message));
```

---

#### `unlink(user, providerId)`

```ts
unlink(auth.currentUser, "google.com")
	.then((user) => console.log("연결 해제됨:", user))
	.catch((err) => console.error(err.message));
```

---

#### `fetchSignInMethodsForEmail(auth, email)`

-   **용도**: 특정 이메일에 연결된 로그인 방식(google, password 등) 조회

```ts
fetchSignInMethodsForEmail(auth, "user@example.com")
	.then((methods) => console.log("사용 가능한 로그인 방식:", methods))
	.catch((err) => console.error(err.message));
```

---

## 2. 메소드(Method)

> 메소드는 Firebase User 객체 (`auth.currentUser`)가 가진 기능입니다.

---

### 2.1 사용자 객체 속성과 메소드

---

#### `auth.currentUser.uid`

```ts
const uid = auth.currentUser.uid;
```

---

#### `auth.currentUser.email`

```ts
const email = auth.currentUser.email;
```

---

#### `auth.currentUser.displayName`

```ts
const name = auth.currentUser.displayName;
```

---

#### `auth.currentUser.emailVerified`

```ts
const isVerified = auth.currentUser.emailVerified;
```

---

#### `auth.currentUser.getIdToken(forceRefresh)`

-   **용도**: 현재 로그인된 사용자의 인증 토큰을 획득

```ts
auth.currentUser.getIdToken(true).then((token) => {
	console.log("토큰:", token);
	// 서버로 전달할 수 있음
});
```

---

#### `auth.currentUser.getIdTokenResult()`

-   **용도**: 토큰 정보와 클레임(claims)까지 확인 가능

```ts
auth.currentUser.getIdTokenResult().then((result) => {
	console.log("토큰 정보:", result);
	console.log("커스텀 클레임:", result.claims);
});
```

---

#### `auth.currentUser.reload()`

-   **용도**: 이메일 인증 여부 등 최신 정보 반영

```ts
auth.currentUser.reload().then(() => {
	console.log("유저 정보 최신화 완료");
});
```

---

#### `auth.currentUser.delete()`

-   **용도**: 현재 사용자 계정 삭제

```ts
auth.currentUser.delete().then(() => {
	console.log("계정 삭제 완료");
});
```

---
