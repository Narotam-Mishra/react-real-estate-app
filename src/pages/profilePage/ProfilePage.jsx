import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiRequest from '../../lib/apiRequest';
import './ProfilePage.scss';
import { Suspense, useContext } from 'react';
import { AuthContextVal }  from '../../context/AuthContext';

const ProfilePage = () => {
  const data = useLoaderData()
  const { updateUser, currentUser } = useContext(AuthContextVal)

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
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="userImage" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} /> }
            </Await>
          </Suspense>
          
          <div className="title">
            <h1>Saved List</h1>
          </div>
          {/* <List /> */}

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} /> }
            </Await>
          </Suspense>

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