import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/register`,
        {
          username: id,
          password: pw,
        }
      );
      if (response.status === 200) {
        alert(response.data.detail);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
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
