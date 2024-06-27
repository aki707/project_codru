import { useEffect, useState } from "react";
import "../styles/Blogpage.css";
import parser from "react-html-parser";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faBookmark,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";

function Blogpage() {
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

  return (
    <div className="blog-page">
      {blogarray.map((data, index) => {
        const date = new Date(data.createdAt).toLocaleDateString();

        return (
          <div key={index} className="blog-post">
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
                <span>149</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faComment} />
                <span>5</span>
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
