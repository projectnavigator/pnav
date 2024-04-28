import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";






export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged in Successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const LoginPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);


  return (
    <Wrapper>
    <div className="login template d-flex justify-content-center align-items-center vh-100 background1 ">
      <div className="form_container p-5 rounded bg-white shadow-lg">
        <Form method="post">
          <h3 className="text-center">Log In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              className="form-control"
              // defaultValue="ralph.sabalo@gmail.com"
            />
          </div>
          <div className="mb-2 position-relative">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="form-control"
              // defaultValue="password"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-2 mt-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <p className="text-center mt-2">
            Don't have an account yet?{" "}
            <Link to="/register" className="ms-2">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
    </Wrapper>
  );
};

  const Wrapper = styled.div`
  .background1{
    background-image:url("/bg.jpg") ;
    background-size: cover;
    }
`;

export default LoginPage;
