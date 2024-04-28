// import Wrapper from "../assets/wrappers/Home";
// import customFetch from "../utils/customFetch";
// import { useLoaderData } from "react-router-dom";
// import { useContext, createContext } from "react";
// import { PMProjectContainer } from "../components";
// import { PROJECT_STATUS } from "../utils/constants";
// import { FormRow, FormRowSelect } from "../components";
// import { Form, useNavigation, redirect } from "react-router-dom";
// import { toast } from "react-toastify";
// import React, {useState} from "react";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import userLoaderData from "./alluserdata";


// export const action = async ({ request }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);

  
//     try {
//       await customFetch.post("/project", data);
//       toast.success("Created Successfully");
//       return redirect("./");
//     } catch (error) {
//       const showErrorMessages = () => {
//         const errors = error?.response?.data?.errorMessages;
//         const errors1 = error?.response?.data?.msg;
  
//         if (!errors1) {
//           for (let i = 0; i < errors.length; i++) {
//             toast.error(errors[i]);
//           }
//         } else {
//           toast.error(errors1);
//         }
//       };
//       showErrorMessages();
//       return error;
//     }
//   };

// export const loader = async () => {
//   try {
//     const { data } = await customFetch.get("/project");
//     return { data };
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return error;
//   }
// };

// const AllPMProjectContext = createContext();

// const PMHome = () => {
//   const { data } = useLoaderData();
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";
//   const { userdata: users, loading, error } = userLoaderData("/user/all-user");
//   const animatedComponents = makeAnimated();
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const userIds = selectedOptions.map((user) => user.value);

//   const options = users.map((option) => ({
//     value: option._id,
//     label: `${option.firstName} ${option.lastName}`,
//   }));

// //   const navigate = useNavigate();
// //   const projectEdit = () => {
// //     navigate("./update-project");
// //   };

//   return (
//     <>
//       <div className="d-flex justify-content-between">
//         <button
//           type="button"
//           className="btn btn-primary"
//           data-bs-toggle="modal"
//           data-bs-target="#newProject"
//         >
//           New Project
//         </button>
//         <div
//           className="modal fade"
//           id="newProject"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex="-1"
//           aria-labelledby="newProjectLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="newProjectLabel">
//                   Create new project
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <Form method="post">
//                   <div className="form-center">
//                     <FormRow
//                       type="text"
//                       name="projectName"
//                       labelText="Project Name"
//                       // defaultValue={"Ralph"}
//                       placeholder={"Project Name"}
//                       //placeholder
//                     />
//                     <FormRow
//                       type="date"
//                       labelText="Plan Start"
//                       name="plannedStart"
//                       // defaultValue={"Talplacido"}
//                       placeholder={"??"}
//                       // placeholder={"Talplacido"}
//                     />
//                     <FormRow
//                       type="date"
//                       labelText="Plan End"
//                       name="plannedEnd"
//                       // defaultValue={"ralph.sabalo@gmail.com"}
//                       placeholder={"??"}
//                       // placeholder={"ralph.sabalo@gmail.com"}
//                     />
//                     <div className="form-row">
//                       <label className="form-label">
//                         Team Members
//                       </label>
//                       <Select
//                         closeMenuOnSelect={false}
//                         components={animatedComponents}
//                         label="Team"
//                         value={selectedOptions}
//                         isMulti
//                         onChange={setSelectedOptions}
//                         options={options}
//                       />
//                       <input
//                         type="text"
//                         hidden
//                         name="team"
//                         defaultValue={userIds.toString()}
//                       />
//                     </div>
//                     <br />

//                     <div className="modal-footer">
//                       <button
//                         type="button"
//                         className="btn btn-secondary"
//                         data-bs-dismiss="modal"
//                       >
//                         Close
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn form-btn"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Creating" : "Create Project"}
//                       </button>
//                     </div>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* another button */}

//         <button
//           type="button "
//           className="btn"
//           data-bs-toggle="modal"
//           data-bs-target="#searchUser"
//         >
//           Search Engine
//         </button>

//         <div
//           className="modal fade"
//           id="searchUser"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex="-1"
//           aria-labelledby="searchUserLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="searchUser">
//                   Search User
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <AllPMProjectContext.Provider value={{ data }}>
//         <PMProjectContainer />
//       </AllPMProjectContext.Provider>
//     </>
//   );
// };

// export const useAllPMProjectContext = () => useContext(AllPMProjectContext);
// export default PMHome;
