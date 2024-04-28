import Wrapper from "../assets/wrappers/ProjectInfo";

const ProjectInfo = ({ icon, text,className,style,labeltext }) => {
  return (
    <Wrapper>
      <div>{labeltext}</div>
      <span className="job-icon">{icon}</span>
      <span className={`job-text ${className}`} style={style}>{text}</span>
    </Wrapper>
  );
};

export default ProjectInfo;
