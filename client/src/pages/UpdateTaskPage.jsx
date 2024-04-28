import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect } from "react";


export const loader = async ({ params }) => {
  try {
    const [projectResponse, usersResponse, tasksResponse] = await Promise.all([
      customFetch.get("/project"),
      customFetch.get("/user/all-user"),
      customFetch.get(`/task/${params.id}`),
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
    await customFetch.patch(`/task/${params.id}`, data);
    toast.success("Task Updated Successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.datatask.msg);
    return error;
  }
};

const UpdateTaskPage = () => {
  const { projects, users, tasks1 } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const animatedComponents = makeAnimated();
  const project = projects.find((project) =>
    tasks1.project.includes(project._id)
  );
  const userOptions = users
    .filter((user) => !user.isProjectManager)
    .map((user) => ({
      value: user._id,
      label: `${user.firstName} ${user.lastName}`,
    }));
  const usersAssigned = userOptions.filter((user) =>
    tasks1.assignedUser.includes(user.value)
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  // useEffect (() => {
  //   setSelectedOptions(usersAssigned);
  // })
  const handleChange = (newOptions) => {
    setSelectedOptions(newOptions);
  };


  console.log(selectedOptions.map(item => item.value).toString());
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Update Task</h4>
        <div className="form-center">
          <FormRow type="text" name="task Name" defaultValue={tasks1.taskName} />
            <div>
              <label style={{ marginBottom: "10px" }}>Team Members</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={usersAssigned}
                isMulti
                onChange={handleChange}
                options={userOptions}
              />
              <input
                type="text"
                hidden
                name="assignedUser"
                defaultValue={selectedOptions.map(item => item.value)}
              />
            </div>
          <FormRowSelect
            name="taskStatus"
            labelText="task status"
            defaultValue={tasks1.taskStatus}
            list={Object.values(TASK_STATUS)}
          />
          <FormRowSelect
            name="priority"
            labelText="task priority"
            defaultValue={tasks1.taskStatus}
            list={Object.values(TASK_PRIORITY)}
          />

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
  );
};

export default UpdateTaskPage;
