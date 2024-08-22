import "../styles/Publicprofilepopup.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Publicprofilepopup({
  type,
  setType,
  onClose,
  setShowPopup,
  showPopup,
  onUpdate,
  targetuser, // Add this prop
}) {
  const [usersocialData, setUserSocialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem("Username");
        const res = await fetch(
          `https://codru-server.vercel.app/profile/${username}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const jsonData = await res.json();
        setFollowingList(jsonData.user.following);

        const res2 = await fetch(
          `https://codru-server.vercel.app/profile/${targetuser}`
        );
        if (!res2.ok) {
          throw new Error("Failed to fetch user data");
        }
        const jsonData2 = await res2.json();
        setUserSocialData(
          type === "Followers"
            ? jsonData2.user.followers
            : jsonData2.user.following
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [type]);

  const crossPopup = () => {
    setShowPopup(!showPopup);
    onClose(); // Notify parent to refresh data
    onUpdate(); // Notify parent to update followers/following count
  };

  const handleFollowFollowing = (selectedType) => {
    setType(selectedType);
  };

  const handleUnfollow = async (targetUser) => {
    try {
      const res = await fetch(`https://codru-server.vercel.app/unfollow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserId: localStorage.getItem("Username"),
          targetUserId: targetUser,
        }),
      });

      if (res.ok) {
        const updatedData = usersocialData.filter(
          (user) => user.username !== targetUser
        );
        setUserSocialData(updatedData);
      }
    } catch (error) {
      console.error("Error in unfollow operation:", error);
    }
  };

  const handleFollow = async (targetUser) => {
    try {
      const res = await fetch(`https://codru-server.vercel.app/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUserId: localStorage.getItem("Username"),
          targetUserId: targetUser,
        }),
      });

      if (res.ok) {
        const res2 = await fetch(
          `https://codru-server.vercel.app/profile/${localStorage.getItem(
            "Username"
          )}`
        );
        if (!res2.ok) {
          throw new Error("Failed to fetch user data");
        }
        const jsonData = await res2.json();
        setFollowingList(jsonData.user.following);
      }
    } catch (error) {
      console.error("Error in follow operation:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with your own loading indicator
  }

  const publicprofile = (targetuser) => {
    navigate(`/public-profile/${targetuser}`);
  };

  return (
    <div className="popup-container">
      <div className="publicprofilepopup">
        <div className="publicprofilepopupdiv1">
          <div className="publicprofilepopupdiv1div1">
            <h2></h2>
            <h2>{type}</h2>
            <h2 onClick={crossPopup}>x</h2>
          </div>
          <div className="publicprofilepopupdiv1div2">
            <h3 onClick={() => handleFollowFollowing("Followers")}>
              Followers
            </h3>
            <h3 onClick={() => handleFollowFollowing("Following")}>
              Following
            </h3>
          </div>
          <div className="publicprofilepopupdiv1div3">
            <hr
              style={type === "Followers" ? { border: "1px solid black" } : {}}
            />
            <hr
              style={type === "Following" ? { border: "1px solid black" } : {}}
            />
          </div>
          <div className="publicprofilepopupdiv1div4">
            <input placeholder="Search" type="search" />
          </div>
        </div>
        <div className="publicprofilepopupdiv2">
          {usersocialData.map((userdata, idx) => (
            <div key={idx} className="publicprofilepopupdiv2div1">
              <div
                onClick={() => publicprofile(userdata.username)}
                className="publicprofilepopupdiv2div1div1"
              >
                <img src={userdata.photo} alt="" />
                <div>
                  <h3>{userdata.username}</h3>
                  <p>{userdata.name}</p>
                </div>
              </div>
              {type === "Followers" &&
                (!followingList.some(
                  (f) => f.username === userdata.username
                ) ? (
                  <button onClick={() => handleFollow(userdata.username)}>
                    Follow
                  </button>
                ) : (
                  <button onClick={() => handleUnfollow(userdata.username)}>
                    Unfollow
                  </button>
                ))}
              {type === "Following" && (
                <button onClick={() => handleUnfollow(userdata.username)}>
                  Unfollow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Publicprofilepopup;
