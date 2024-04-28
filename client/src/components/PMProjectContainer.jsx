// import { useAllPMProjectContext } from "../pages/PMHome";
// import PMProject from "./PMProject";
// import Wrapper from "../assets/wrappers/ProjectContainer";

// const PMProjectContainer = () => {
//   const { data } = useAllPMProjectContext();
//   const project = data;
//   if (project.length === 0) {
//     return (
//       <Wrapper>
//         <h2>No Projects to display...</h2>
//       </Wrapper>
//     );
//   }
//   return (
//     <Wrapper>
//       <div className="project">
//         {project.map((project) => {
//           return <PMProject key={project._id} {...project} />;
//         })}
//       </div>
//     </Wrapper>
//   );
// };

// export default PMProjectContainer;
