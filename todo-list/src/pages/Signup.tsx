import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const idInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    let isValid = true;

    if (!id) {
      idInputRef.current?.focus();
      isValid = false;
    }

    if (!pw) {
      if (isValid) {
        pwInputRef.current?.focus();
      }
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Here you can add any logic you want to handle after the form validation is successful
    alert("회원가입 버튼이 클릭되었습니다.");
    navigate("/");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <SignupPageContainer>
      <SignupBoxContainer>
        <SignupTitle>SignUp</SignupTitle>
        <SignupInputSection>
          <SignupInputContainer>
            <IdPwNicknamePhoneTitle>ID</IdPwNicknamePhoneTitle>
            <SignupInputBox
              ref={idInputRef}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <IdPwNicknamePhoneTitle>비밀번호</IdPwNicknamePhoneTitle>
            <SignupInputBox
              ref={pwInputRef}
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </SignupInputContainer>
        </SignupInputSection>
        <SignupBtnSection>
          <SignupButton onClick={handleSubmit}>회원가입</SignupButton>
          <SignupButton onClick={handleBackClick}>뒤로가기</SignupButton>
        </SignupBtnSection>
      </SignupBoxContainer>
    </SignupPageContainer>
  );
}

export default SignUp;

const SignupPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("/src/assets/img/background.jpg");
  background-size: cover;
  background-position: center;
`;

const SignupBoxContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  height: 50rem;
  padding: 5rem 7rem;
  background-color: #f7f7f7;
`;

const SignupTitle = styled.h1`
  font-size: 3rem;
`;

const SignupInputSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignupInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
`;

const IdPwNicknamePhoneTitle = styled.p`
  font-size: 3rem;
`;

const SignupInputBox = styled.input`
  width: 70%;
  height: 5rem;
  padding-left: 4rem;
  border: 1px solid black;
`;

const SignupBtnSection = styled.section`
  display: flex;
  gap: 10rem;
  margin-top: 7rem;
`;

const SignupButton = styled.button`
  width: 10rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: #ebebeb;
`;
