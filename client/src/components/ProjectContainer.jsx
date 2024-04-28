import { UseAllProjectContext } from "../pages/Home";
import Project from "./Project";
import Wrapper from "../assets/wrappers/ProjectContainer";


const ProjectContainer = () => {
  const { projects } = UseAllProjectContext();
  const  project  = projects;
  if (project.length === 0) {
    return (
      <Wrapper>
        <h2>No Projects to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="project">
        {project.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProjectContainer;
