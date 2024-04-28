import { FormRow, FormRowSelect } from "../components";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";
import { TaskContainer } from "../components";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TASK_STATUS, TASK_PRIORITY } from "../utils/constants";
import Wrapper from "../assets/wrappers/Task";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/task", data);
    toast.success("Created Successfully");
    return null;
  } catch (error) {
    const showErrorMessages = () => {
      const errors = error?.response?.data?.errorMessages;
      const errors1 = error?.response?.data?.msg;

      if (!errors1) {
        for (let i = 0; i < errors.length; i++) {
          toast.error(errors[i]);
        }
      } else {
        toast.error(errors1);
      }
    };
    showErrorMessages();
    return error;
  }
};

export const loader = async () => {
  try {
    const [taskResponse, userResponse, projectResponse,currentuserResponse] = await Promise.all([
      customFetch.get("/task"),
      customFetch.get("/user/all-user"),
      customFetch.get("/project"),
      customFetch.get("/user/current-user"),
    ]);

    const { data: tasks } = taskResponse;
    const { data: users } = userResponse;
    const { data: projects } = projectResponse;
    const { data: currentuser } = currentuserResponse;

    return { tasks, users, projects, currentuser };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllTaskContext = createContext();

const Dash = () => {
  const { tasks, users, projects, currentuser } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (selectedProject) {
      const projectUsers = users.filter((user) =>
        user.projects.includes(selectedProject)
      );
      setFilteredUsers(
        projectUsers.map((option) => ({
          value: option._id,
          label: `${option.firstName} ${option.lastName}`,
        }))
      );
    }
  }, [selectedProject, users]);

  const userIds = selectedOptions.map((user) => user.value);

  const options = users.map((option) => ({
    value: option._id,
    label: `${option.firstName} ${option.lastName}`,
  }));
  const projectoptions = projects.map((option) => ({
    value: option._id,
    label: `${option.projectName}`,
  }));

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newTask"
        >
          New Task
        </button>
        <div
          className="modal fade"
          id="newTask"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="newTaskLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="newTaskLabel">
                  Create new task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Form method="post">
                  <div className="form-center">
                    <FormRow
                      type="text"
                      name="taskName"
                      labelText="Task Name"
                      // defaultValue={"Ralph"}
                      placeholder={"Task Name"}
                      //placeholder
                    />
                    <select
                      className="form-select"
                      name="project"
                      id="project"
                      onChange={(e) => {
                        setSelectedProject(e.target.value);
                        setSelectedOptions([]);
                      }}
                      value={selectedProject || ""}
                    >
                      <option value="" disabled>
                        Select a Project
                      </option>
                      {projectoptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="form-row">
                      <label className="form-label">Assigned User</label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        label="assigned user"
                        value={selectedOptions}
                        isMulti
                        onChange={setSelectedOptions}
                        options={
                          filteredUsers.length > 0 ? filteredUsers : options
                        }
                      />
                      <input
                        type="text"
                        hidden
                        name="assignedUser"
                        defaultValue={userIds.toString()}
                      />
                    </div>

                    {/* priority */}
                    <FormRowSelect
                      labelText="Priority"
                      name="priority"
                      defaultValue={TASK_PRIORITY.TOP}
                      list={Object.values(TASK_PRIORITY)}
                    />
                    <FormRowSelect
                      labelText="task status"
                      name="taskStatus"
                      defaultValue={TASK_STATUS.ON_TRACK}
                      list={Object.values(TASK_STATUS)}
                    />
                    <br />

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn form-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating" : "Create Task"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* another button */}

        <button
          type="button "
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#searchUser"
        >
          Search Engine
        </button>

        <div
          className="modal fade"
          id="searchUser"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="searchUserLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="searchUser">
                  Search User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"></div>
            </div>
          </div>
        </div>
      </div>
        <AllTaskContext.Provider value={{ tasks, users, projects, currentuser }}>
          <TaskContainer />
        </AllTaskContext.Provider>
    </div>
  );
};

export const useAllTaskContext = () => useContext(AllTaskContext);
export default Dash;
