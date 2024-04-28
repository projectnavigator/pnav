import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/User";
import UserInfo from "./userInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Users = ({_id,firstName,lastName,isProjectManager,createdAt}) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
 <header>
        <div className='main-icon'>{lastName.charAt(0)}</div>
        <div className='info'>
          <h5>{lastName}</h5>
          <p>{firstName}{isProjectManager}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <UserInfo icon={<FaCalendarAlt />} text={date} />
          <UserInfo icon={<FaBriefcase />} text={isProjectManager} />
        </div>
        <footer className='actions'>
          <Form method='post' action={`../delete-user/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Users;
