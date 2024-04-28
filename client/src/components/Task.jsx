import { Link, Form, useNavigate } from "react-router-dom";
import TaskInfo from "./TaskInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import Wrapper from "../assets/wrappers/Project";
import { useState } from "react";
import { useAllTaskContext } from "../pages/Dash";

day.extend(advancedFormat);

const Task = ({ _id, taskName, project, assignedUser, priority }) => {
  const { projects, users, currentuser } = useAllTaskContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const projectid = projects.filter((p) => p._id === project[0])[0];

  const assignedUsersWithNames = assignedUser.map((assignedUserId) => {
    const user = users.find((user) => user._id === assignedUserId);
    return user ? `${user.firstName} ${user.lastName}` : assignedUserId;
  });

  const getStars = (priority) => {
    const maxPriority = 3; // maximum number of priority levels
    const filledStars = Array(priority).fill('⭐');
    const grayStars = Array(maxPriority - priority).fill('⬤');
    const stars = filledStars.concat(grayStars);
    return stars.map((star, index) => <span key={index}>{star}</span>);
  };

  console.log(taskName);

  return (
    <Wrapper>
      <header onClick={() => setIsOpen(!isOpen)}>
        <div className="main-icon">{taskName.charAt(0)}</div>
        <div className="info content">
          <h5 style={{ fontWeight: "bold", color: "#64748b" }}>{taskName}</h5>
          <p>Project: {projectid && projectid.projectName}</p>
          <div className="content-center">
          <TaskInfo icon={<p style={{fontSize:'12px', marginRight:'-10px'}}>Priority:</p>} text={getStars(priority)} />
            <TaskInfo
              // icon={}
              text={
                <ul>
                  {assignedUsersWithNames.map((name) => (
                    <li className="mt-2" key={name}>
                      <BiSolidUserCircle style={{ color: "#64748b" }} /> {name}
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
        <div style={{ justifySelf: "end" }}>
          <Form
            method="post"
            action={`./delete-task/${_id}`}
            
          >
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
          {currentuser.user.isProjectManager===true?<Link to={`./update-task/${_id}`} className="btn edit-btn mt-2">
              Edit
            </Link>:''}
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </header>
      {isOpen && (
        <div className="content">
          <div className="content-center">
            <p style={{ fontWeight: "bold" }}>Description:</p>

            {/* {user && <p>Assigned to: {user.firstName} {user.lastName}</p>} */}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Task;
