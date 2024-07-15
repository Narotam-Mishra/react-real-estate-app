import { useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiRequest from '../../lib/apiRequest';
import './ProfilePage.scss';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout")
      
      // once user's logout clear user's details from local storage
      // localStorage.removeItem("user");
      updateUser(null)

      // then navigate user back to home page
      navigate("/")
    } catch (error) {
      console.log("Error while logout:", error);
    }
  }
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt="userImage"
              />
            </span>
            <span>Username: <b>{currentUser.username}</b></span>
            <span>E-mail: <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage