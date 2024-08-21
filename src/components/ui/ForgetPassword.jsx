import React from 'react';
import styled from 'styled-components';
import { SendButton } from '../../styles/Login';
import { Div } from '../../styles/Styles';

const Input = styled.input`
  padding-block: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  display: block;
  padding-left: 10px;


   &:focus {
    outline: none;
  }
`;

const ForgetPassword = () => {
  return (
    <Div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password?</h1>
      <p>Enter your email address to reset your password.</p>
      <form>
        <Div>
          <Input type="email" placeholder="Email Address" />
          <SendButton type="submit">Send code</SendButton>
        </Div>
      </form>
    </Div>
  );
};

export default ForgetPassword;
