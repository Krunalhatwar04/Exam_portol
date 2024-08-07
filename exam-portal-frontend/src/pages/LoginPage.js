import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import authServices from "../services/authServices"; // Import the authServices
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? "password" : "text");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await authServices.login(username, password); // Use authServices

      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        const user = data.payload.user;
        const role = user.role === "ADMIN" ? "/adminProfile" : "/profile";
        await login(dispatch, username, password);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("jwtToken", data.payload.jwtToken);

        navigate(role);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      const role = user.role === "ADMIN" ? "/adminProfile" : "/profile";
      navigate(role);
    }
  }, [navigate]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordType}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={showPasswordHandler}
              variant=""
              style={{ border: "1px solid black" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          variant=""
          className="my-3"
          type="submit"
          style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
        >
          Login
        </Button>
      </Form>

      {loginReducer.loading ? (
        <Loader />
      ) : (
        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link to="/register" style={{ color: "rgb(68 177 49)" }}>
              Register
            </Link>
          </Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default LoginPage;
