import { useAllTaskContext } from "../pages/Dash";
import Task from "./Task";
import Wrapper from '../assets/wrappers/TaskContainer';

const TaskContainer = () => {
  const { tasks } = useAllTaskContext();
  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No Tasks to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="task">
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
};

export default TaskContainer;