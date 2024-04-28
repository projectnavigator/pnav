import { Link, useNavigate, Form } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Project";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { PROJECT_STATUS, PROJECT_COMPLETION } from "../utils/constants";
import ProgressBar from "react-bootstrap/ProgressBar";
import { UseAllProjectContext } from "../pages/Home";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import customFetch from "../utils/customFetch";

dayjs.extend(advancedFormat);

const projectCompletionOptions = Object.keys(PROJECT_COMPLETION).map((key) => ({
  label: key.replace("_", " ").toUpperCase(),
  value: PROJECT_COMPLETION[key],
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
    boxShadow: "none",
    minHeight: "2.5rem",
    padding: "0 0.75rem",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#007bff",
    },
  }),
  indicatorsContainer: () => ({
    display: "none", // hide the caret
  }),
};

const Project = ({
  _id,
  projectName,
  plannedStart,
  plannedEnd,
  actualStart,
  actualEnd,
  tasks,
  team,
  createdBy,
  projectStatus,
  projectCompletion,
}) => {
  const navigate = useNavigate();
  const { users, tasks1 } = UseAllProjectContext();
  const starting = dayjs(plannedStart).format("MMM Do, YYYY");
  const ending = dayjs(plannedEnd).format("MMM Do, YYYY");
  const [showModal, setShowModal] = useState(false);
  const [selectedCompletion, setSelectedCompletion] =
    useState(projectCompletion);
  const [projectStatusNow, setProjectStatusNow] = useState(projectStatus);

  const teamUsers = users
    .filter((user) => team.includes(user._id))
    .map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

  const projectOwner = users.find((user) => createdBy.includes(user._id));

  const tasksLength = tasks1.length; // Add null check here
  const taskDone = tasks1.filter(
    (task) =>
      task.taskStatus !== "for_approval" && task.taskStatus !== "in_progress"
  ).length;

  const now = ((taskDone / tasksLength) * 100).toFixed(2);

  console.log(taskDone);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const projectEdit = () => navigate(`../update-project/${_id}`);

  const updateProjectStatus = (newStatus) => {
    setProjectStatusNow(newStatus);
    customFetch
      .patch(`/project/status/${_id}`, {
        projectStatus: newStatus,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const today = dayjs();
    const plannedEndDate = dayjs(plannedEnd);
    const threeDaysBeforePlannedEnd = plannedEndDate.subtract(3, "days");

    if (projectCompletion === "done") {
      updateProjectStatus("done");
    } else if (projectCompletion === "cancelled") {
      updateProjectStatus("cancelled");
    } else if (today.isAfter(plannedEndDate)) {
      updateProjectStatus("off_track");
    } else if (
      today.isSame(threeDaysBeforePlannedEnd) ||
      today.isAfter(threeDaysBeforePlannedEnd)
    ) {
      updateProjectStatus("at_risk");
    } else {
      updateProjectStatus("on_track");
    }
  }, [plannedEnd, projectCompletion]);

  const handleCompletionChange = (value) => {
    setSelectedCompletion(value);

    if (value === "done") {
      customFetch
        .patch(`/project/status/${_id}`, {
          projectCompletion: value,
          actualEnd: new Date(),
          projectStatus: "done",
        })
        .then((response) => response.data)
        .catch((error) => console.error(error));
    } else if (value === "cancelled") {
      customFetch
        .patch(`/project/status/${_id}`, {
          projectCompletion: value,
          actualEnd: "",
          projectStatus: "cancelled",
        })
        .then((response) => response.data)
        .catch((error) => console.error(error));
    } else {
      customFetch
        .patch(`/project/status/${_id}`, {
          projectCompletion: value,
          actualEnd: "",
        })
        .then((response) => response.data)
        .catch((error) => console.error(error));
    }
    window.location.reload();
  };

  console.log(projectStatus);
  return (
    <Wrapper>
      <header>
        <div
          className="main-icon"
          onClick={projectEdit}
          style={{ cursor: "pointer" }}
        >
          {projectName.charAt(0)}
        </div>
        <div className="info">
          <h5
            onClick={projectEdit}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "25px",
              color: "#64748b",
            }}
          >
            {projectName}
          </h5>
          {/* Added a button to show the modal */}
          <Button onClick={handleShowModal}>Members</Button>
          {/* Added a modal component */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Project Members</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {teamUsers.map((member, index) => (
                  <li key={index} className="mt-2">
                    {`${member.firstName} ${member.lastName}`}
                  </li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div style={{ justifySelf: "end" }}>
          <select
            value={selectedCompletion}
            onChange={(e) => handleCompletionChange(e.target.value)}
            className={`${selectedCompletion} fw-semibold`}
            style={{ textAlign: "center" }}
          >
            {projectCompletionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="content">
        {tasks.length === 0 ? (
          <p>No task at the moment...</p>
        ) : (
          <div>
            Completion:
            <ProgressBar
              animated
              variant="info"
              now={now}
              label={`${now}% done`}
              className="mt-2"
            />
          </div>
        )}
        <div
          className="content-center"
          onClick={projectEdit}
          style={{ cursor: "pointer" }}
        >
          <ProjectInfo
            text={`Planned Start:`}
            style={{
              marginBottom: "-30px",
              marginLeft: "16px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <ProjectInfo
            text={`Deadline:`}
            style={{
              marginBottom: "-30px",
              marginLeft: "16px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <ProjectInfo icon={<FaCalendarAlt />} text={starting} />
          <ProjectInfo icon={<FaCalendarAlt />} text={ending} />
          <ProjectInfo />
          <ProjectInfo
            text={`Project Manager:`}
            style={{
              marginBottom: "-30px",
              marginLeft: "16px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <ProjectInfo
            className={`status ${projectStatus} fw-semibold ${
              projectStatus === "at_risk" ? "progress-icon" : ""
            } ${projectStatus === "off_track" ? "progress-icon" : ""}`}
            text={projectStatus.replace("_", " ")}
          />
          <ProjectInfo
            icon={<FaBriefcase />}
            text={`${projectOwner.firstName} ${projectOwner.lastName}`}
          />
        </div>
        <footer className="actions">
          <Form method="post" action={`../delete-project/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
