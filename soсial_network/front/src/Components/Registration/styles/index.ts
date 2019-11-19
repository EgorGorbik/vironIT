import styled from "styled-components";

export const Input = styled.input`
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  outline:none;
  margin: 15px auto 0 auto;
  display:block
  width: 300px; 
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;


export const Error = styled.div`
  color: red;
  width: 300px;
  margin: 0 auto;
`;


export const Send = styled.button`
    display: block;
    width: 140px;
    height: 35px;
    color: white;
    background-color: #589513;
    text-decoration: none;
    border: 1px solid #589513;
`;


export const Div = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const P = styled.p`
  text-align: center;
  font-size: 35px;
  font-weight: 600;
  color: white;
`;

export const L = styled.p`
    color: #589513;
    font-size: 22px;
    text-align: right;
    font-weight: 500;
    text-decoration: underline;
`;
