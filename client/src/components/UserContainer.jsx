import Users from "./User";
import Wrapper from '../assets/wrappers/UserContainer'
import { UseAllUserContext } from "../pages/Database";

const UserContainer = () => {
  const {data} = UseAllUserContext()
  const user = data
  // console.log(user);

  if (user.length===0) {
    return(
      <Wrapper>
      <h2>No Users to display...</h2>
      </Wrapper>
    )
  }


  return <Wrapper>
    <div className="user">
      {user.map((user) => {
        return <Users key={user._id} {...user} />
      })}

    </div>
  </Wrapper>

};
export default UserContainer;