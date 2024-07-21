import Slider from '../../components/slider/Slider';
import './SinglePage.scss';
import Map from '../../components/map/Map';
import { redirect, useLoaderData } from 'react-router-dom';
import DOMPurify from "dompurify";
import { useContext, useState } from 'react';
import { AuthContextVal } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const SinglePage = () => {
  const post = useLoaderData();
  // console.log(post);

  const[saved, setSaved] = useState(post.isSaved)

  const { currentUser } = useContext(AuthContextVal)

  const handleSave = async () => {
    setSaved((prev) => !prev);

    if(!currentUser){
      redirect("/login")
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id })
    } catch (error) {
      console.log("Error while saving post:",error);
      setSaved((prev) => !prev);
    }
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="./pin.png" alt="pinIcon" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="user-image" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="./utility.png" alt="utilIcon" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="./pet.png" alt="petIcon" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="./fee.png" alt="feeIcon" />
              <div className="featureText">
                <span>Income policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="./size.png" alt="sizeIcon" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="./bed.png" alt="bedIcon" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="./bath.png" alt="bathIcon" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="schoolIcon" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="petIcon" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="feeImage" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="./chat.png" alt="chatIcon" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "#fff",
              }}
            >
              <img src="./save.png" alt="saveIcon" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage