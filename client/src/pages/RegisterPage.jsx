import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered Successfully");
    return redirect("/");
  } catch (error) {
    const showErrorMessages= ()=>{
        const errors = error?.response?.data?.errorMessages
        for (let i = 0; i < errors.length; i++) {
            toast.error(errors[i]);
          }
      }
    showErrorMessages()
    return error;
  }
};

const RegisterPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <Form method="post">
          <h3 className="text-center">Register</h3>
          <div className="mb-2">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              required
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              defaultValue="Ralph Danielle"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              required
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              defaultValue="Talplacido"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              required
              type="email"
              placeholder="Enter Email"
              className="form-control"
              defaultValue="ralph.sabalo@gmail.com"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              required
              type="password"
              placeholder="Enter Password"
              className="form-control"
              defaultValue="password"
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </div>
          <p className="text-center mt-2">
            Already Registered?{" "}
            <Link to="/login" className="ms-2">
              Login{" "}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
