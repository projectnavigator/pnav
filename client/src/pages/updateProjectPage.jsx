import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { PROJECT_COMPLETION, PROJECT_STATUS } from "../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export const loader = async ({ params }) => {
  try {
    const [projectResponse, usersResponse, tasksResponse] = await Promise.all([
      customFetch.get(`/project/${params.id}`),
      customFetch.get("/user/all-user"),
      customFetch.get("/task"),
    ]);

    const { data: projects } = projectResponse;
    const { data: users } = usersResponse;
    const { data: tasks1 } = tasksResponse;

    return { projects, users, tasks1 };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/project/${params.id}`, data);
    toast.success("Project Updated Successfully");
    return redirect("/dashboard/dash");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const UpdateProjectPage = () => {
  const { projects, users, tasks1 } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const animatedComponents = makeAnimated();
  const userOptions = users
    .filter((user) => !user.isProjectManager)
    .map((user) => ({
      value: user._id,
      label: `${user.firstName} ${user.lastName}`,
    }));
  const usersInTeam = userOptions.filter((user) =>
    projects.team.includes(user.value)
  );

  const [selectedOptions, setSelectedOptions] = useState([usersInTeam]);
  const handleChange = (newOptions) => {
    setSelectedOptions(newOptions);
  };

  // useEffect (() => {
  //   setSelectedOptions(usersInTeam);
  // }, [usersInTeam])

  console.log(selectedOptions.map(item => item.value));
  return (
    <div>
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Update Project</h4>
          <div className="form-center">
            <FormRow
              type="text"
              name="projectName"
              defaultValue={projects.projectName}
            />

            <FormRow
              type="date"
              name="plannedEnd"
              defaultValue={new Date(projects.plannedEnd)
                .toISOString()
                .slice(0, 10)}
            />
            <div>
              <label style={{ marginBottom: "10px" }}>Team Members</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={usersInTeam}
                isMulti
                onChange={handleChange}
                options={userOptions}
              />
              <input
                type="text"
                hidden
                name="team"
                defaultValue={selectedOptions.map(item => item.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "submit"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </div>
  );
};

export default UpdateProjectPage;
