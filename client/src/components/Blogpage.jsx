import { useEffect, useState } from "react";
import "../styles/Blogpage.css";
import parser from "react-html-parser";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faBookmark,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";

function Blogpage() {
  const navigate = useNavigate();
  const [blogarray, setBlogarray] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const username = localStorage.getItem("Username");
        if (!username) {
          throw new Error("Username not found in localStorage");
        }

        const res = await fetch("/api/blogsdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const jsondata = await res.json();
        if (!Array.isArray(jsondata.blogs)) {
          throw new Error("Invalid data format received from server");
        }

        setBlogarray(jsondata.blogs);
        console.log(jsondata.blogs);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchBlogData();
  }, []);

  if (blogarray.length == 0) {
    return <div>Loading...</div>;
  }

  const handleBlogClick = (blogId) => {
    console.log(`Navigating to blog with ID: ${blogId}`); // Debugging line
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="blog-page">
      {blogarray.map((data, index) => {
        const date = new Date(data.createdAt).toLocaleDateString();

        return (
          <div
            key={index}
            className="blog-post"
            onClick={() => handleBlogClick(data._id)}
          >
            <h2 className="blogtitle">{data.title}</h2>
            <div className="bloguser">
              <div>
                <div className="bloguserimgdiv">
                  <img src={data.userphoto} alt={`image-${index}`} />
                </div>

                <div className="blogusercontentdiv">
                  <div>
                    <p>{data.username}</p>
                    <NavLink style={{ textDecoration: "none" }} to="/follow">
                      Follow
                    </NavLink>
                  </div>
                  <p>
                    <b>Published on: </b>
                    {date}
                  </p>
                </div>
              </div>
            </div>
            <hr style={{ margin: "1vh .5vw" }} />

            <div className="blogactivity">{parser(data.content)}</div>
            <div className="likecomment">
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{data.likes}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{data.dislikes}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faComment} />
                <span>{data.comments.length}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              <div>
                <FontAwesomeIcon icon={faShareSquare} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Blogpage;
