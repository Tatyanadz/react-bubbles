import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";

const initialState = {
  username: "",
  password: "",
  isFetching: false
};

const Login = props => {
  
  const [form, setForm] = useState(initialState);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setForm({ ...form, isFetching: true });
    axiosWithAuth()
      .post("login", form)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/private");
      })
      .catch(err => console.log(err));
  };

  return (
    <AppDiv>
      <h1>Welcome to the Bubble App!</h1>
      <FormDiv onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={form.password}
          onChange={handleChange}
        />
        <StyledButton typ="submit">Log In</StyledButton>
        {form.isFetching && "Please wait... logging you in"}
      </FormDiv>
    </AppDiv>
  );
};

export default Login;

const FormDiv = styled.form`
  background: darkred;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 5px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  height: 10em;
  max-width: 250px;
  padding: 25px;
  margin: 16px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-top: 2%;
    margin-bottom: 5%;
    color: #e4572e;
  }
  input {
    padding: 10px;
    background: none;
    border: none;
    color: white;
    width: 75%;
    border-bottom: 1px solid white;
    margin-top: 0;
    font-size: 1em;
    ::placeholder {
      color: white;
    }
`;

const StyledButton = styled.button`
  background: #ffebcd;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  margin-top: 9%;
  color: black;
`;

const AppDiv = styled.div`
  text-align: center;
  background-color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  height: auto;
  font-size: 1 em;
  height: 90em;
  width: 100%;
  h1 {
    margin-top: 1%;
    font-size: 4em;
    color: black;
  }
  a {
    font-size: 1.5em;
    padding: 5%;
    margin-bottom: 50%;
    text-decoration: none;
    color: black;
  }
`;