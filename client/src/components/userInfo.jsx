import Wrapper from '../assets/wrappers/UserInfo';

const UserInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='user-icon'>{icon}</span>
      <span className='user-text'>{text}</span>
    </Wrapper>
  );
};
export default UserInfo;