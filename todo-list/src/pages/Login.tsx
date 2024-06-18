import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import axios from "axios";

function Login() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const navigate = useNavigate();

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        {
          username: id,
          password: pw,
        }
      );
      if (response.status === 200) {
        const userId = response.data.user_id; // Assuming the response contains the user's ID
        alert(`로그인 성공! 사용자 ID: ${userId}`);
        navigate(`/Date/${userId}`);
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.error("There was an error!", error);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <LoginPageContainer>
      <LoginBoxContainer>
        <LoginTitle>Login</LoginTitle>
        <LoginImg src="/src/assets/img/ssulion.png" />
        <InputSection>
          <InputContainer>
            <IdPwTitle>ID</IdPwTitle>
            <InputBox value={id} onChange={onChangeId} />
          </InputContainer>
          <InputContainer>
            <IdPwTitle>PW</IdPwTitle>
            <InputBox type="password" value={pw} onChange={onChangePw} />
          </InputContainer>
        </InputSection>
        <BtnSection>
          <Button onClick={handleLoginClick}>로그인</Button>
          <Button onClick={handleSignupClick}>회원가입</Button>
        </BtnSection>
      </LoginBoxContainer>
    </LoginPageContainer>
  );
}

export default Login;

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("/src/assets/img/background.jpg");
  background-size: cover;
  background-position: center;
`;

const LoginBoxContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
  height: 50rem;
  padding: 5rem 7rem;
  background-color: #f7f7f7;
`;

const LoginTitle = styled.h1`
  font-size: 3rem;
`;

const LoginImg = styled.img`
  width: 12rem;
  height: 12rem;
  margin-top: 3rem;
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`;

const IdPwTitle = styled.p`
  font-size: 3rem;
`;

const InputBox = styled.input`
  width: 80%;
  height: 4rem;
  padding-left: 1rem;
`;

const BtnSection = styled.section`
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: #ebebeb;
`;
