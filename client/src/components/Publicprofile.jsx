import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Publicprofile.css";
import Publicprofilepopup from "./Publicprofilepopup";
import Myblogs from "./Myblogs";

function Publicprofile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState(""); // Changed to lowercase for consistency
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollower = async () => {
      try {
        const response = await fetch(
          `https://codru-server.vercel.app/checkfollowing`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              targetUsername: username,
              currentUsername: localStorage.getItem("Username"),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to check following status");
        }

        const jsonData = await response.json();
        console.log(jsonData.following, "Follower status"); // Debugging log
        setIsFollowing(jsonData.following);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    checkFollower();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(
        `https://codru-server.vercel.app/profile/${username}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const jsonData = await res.json();
      setUser(jsonData.user);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false whether request succeeds or fails
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  if (loading) {
    return <div className="shimmereffectwhite"></div>; // Display a loading message while fetching data
  }

  if (!user) {
    return <div>User not found</div>; // Handle case where user data could not be retrieved
  }

  const handleShowPopup = (popupType) => {
    setType(popupType); // Set the type directly
    setShowPopup(true);
  };

  const handleFollow = async () => {
    try {
      const res = await fetch(
        `https://codru-server.vercel.app/${
          isFollowing ? "unfollow" : "follow"
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentUserId: localStorage.getItem("Username"),
            targetUserId: username,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to ${isFollowing ? "unfollow" : "follow"} the user`
        );
      }

      setIsFollowing(!isFollowing);
      fetchUserData();
    } catch (error) {
      console.error(
        `There was a problem with the ${
          isFollowing ? "unfollow" : "follow"
        } operation:`,
        error
      );
      alert(
        `There was a problem with the ${
          isFollowing ? "unfollow" : "follow"
        } operation: ${error.message}`
      );
    }
  };

  const handleUpdate = () => {
    fetchUserData(); // Refresh user data to update follower/following counts
  };

  return (
    <div className={`publicprofile ${showPopup ? "blurred" : ""}`}>
      <div className="publicprofilediv1">
        <div className="publicprofilediv1div1">
          <img src={user.photo} alt="Profile" className="profile-image" />
        </div>

        <div className="publicprofilediv1div2">
          <div className="publicprofilediv1div2div1">
            <p>{user.name}</p>
          </div>
          <div className="publicprofilediv1div2div2">
            <p>{user.username}</p>
            {user.username !== localStorage.getItem("Username") ? (
              <button onClick={() => handleFollow()}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            ) : (
              <button>Edit Profile</button>
            )}
          </div>
          <div className="publicprofilediv1div2div3">
            <p style={{ cursor: "pointer" }}>{user.blogs.length} Posts</p>
            <p
              onClick={() => handleShowPopup("Followers")}
              style={{ cursor: "pointer" }}
            >
              {user.followers.length} Followers
            </p>
            <p
              onClick={() => handleShowPopup("Following")}
              style={{ cursor: "pointer" }}
            >
              {user.following.length} Following
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="publicprofilediv2">
        <Myblogs
          publicprofileusername={user.username}
          backgroundcolor="backgroundcolor"
        />
      </div>
      {showPopup && (
        <Publicprofilepopup
          onClose={() => setShowPopup(false)}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          type={type}
          setType={setType}
          onUpdate={handleUpdate} // Pass handleUpdate as a prop
          targetuser={username}
        />
      )}
    </div>
  );
}

export default Publicprofile;
