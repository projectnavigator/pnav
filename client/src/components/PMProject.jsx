// import { Link, Form, redirect, useNavigate } from "react-router-dom";
// import ProjectInfo from "./ProjectInfo";
// import day from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
// import Wrapper from "../assets/wrappers/Project";
// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { PROJECT_STATUS, PROJECT_COMPLETION } from "../utils/constants";
// import ProgressBar from "react-bootstrap/ProgressBar";

// day.extend(advancedFormat);

// const PMProject = ({
//   _id,
//   projectName,
//   plannedStart,
//   plannedEnd,
//   actualStart,
//   actualEnd,
//   tasks,
//   team,
//   createdBy,
//   projectStatus,
//   projectCompletion,
// }) => {
//   const starting = day(plannedStart).format("MMM Do, YYYY");
//   const ending = day(plannedEnd).format("MMM Do, YYYY");
//   const navigate = useNavigate();
//   const projectEdit = () => {
//     navigate(`../update-project/${_id}`);
//   };

//   const taskDone = tasks.filter(
//     (task) => task.taskStatus !== "pending" && task.taskStatus !== "in_progress"
//   ).length;
//   const now = ((taskDone / tasks.length) * 100).toFixed(2);

//   return (
//     <Wrapper>
//       <header>
//         <div
//           className="main-icon"
//           onClick={projectEdit}
//           style={{ cursor: "pointer" }}
//         >
//           {projectName.charAt(0)}
//         </div>
//         <div className="info">
//           <h5 onClick={projectEdit} style={{ cursor: "pointer" }}>
//             {projectName}
//           </h5>
//           <button
//             type="button"
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#members"
//           >
//             Members:
//           </button>
//           <div
//             className="modal fade"
//             id="members"
//             tabIndex="-1"
//             aria-labelledby="exampleModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5">Members</h1>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   {team && (
//                     <div>
//                       {team.map((member, index) => (
//                         <div key={index} className="mb-3">
//                           <span>{`${member.firstName} ${member.lastName}`}</span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <div className="content">
//         {tasks.length === 0 ? (
//           <p>No task at the moment...</p>
//         ) : (
//           <div>
//             Completion:
//             <ProgressBar
//               animated
//               variant="info"
//               now={now}
//               label={`${now}% done`}
//               className="mt-2"
//             />
//           </div>
//         )}
//         <div
//           className="content-center"
//           onClick={projectEdit}
//           style={{ cursor: "pointer" }}
//         >
//           <ProjectInfo icon={<FaCalendarAlt />} text={starting} />
//           <ProjectInfo icon={<FaCalendarAlt />} text={ending} />
//           <ProjectInfo icon={<FaCalendarAlt />} text={projectCompletion} />
//           <ProjectInfo icon={<FaBriefcase />} text={`${createdBy.firstName}`} />
//           <div className={`status ${projectStatus}`}>{projectStatus}</div>
//         </div>
//         <footer className="actions">
//           <Link className="btn edit-btn">Edit</Link>
//           <Form method="post" action={`../delete-project/${_id}`}>
//             <button type="submit" className="btn delete-btn">
//               Delete
//             </button>
//           </Form>
//         </footer>
//       </div>
//     </Wrapper>
//   );
// };

// export default PMProject;
