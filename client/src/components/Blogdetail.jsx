import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Blogpage.css";
import parser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faBookmark,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Commentpage from "./Commentpage";
import "../styles/Blogdetail.css";

function BlogDetail() {
  const { blogId } = useParams();
  const [showComment, setShowComment] = useState(true);
  const [focus, setFocus] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const currentUser = localStorage.getItem("Username");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        setBlogData(jsonData.blog);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleLike = async () => {
    try {
      const res = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, username: currentUser }),
      });

      if (!res.ok) {
        throw new Error("Failed to like the blog");
      }

      const updatedBlog = await res.json();
      setBlogData(updatedBlog);
    } catch (error) {
      console.error("There was a problem with the like operation:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await fetch("/api/blog/dislike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, username: currentUser }),
      });

      if (!res.ok) {
        throw new Error("Failed to dislike the blog");
      }

      const updatedBlog = await res.json();
      setBlogData(updatedBlog);
    } catch (error) {
      console.error("There was a problem with the dislike operation:", error);
    }
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const date = new Date(blogData.createdAt).toLocaleDateString();
  const userHasLiked = blogData.likedBy.includes(currentUser);
  const userHasDisliked = blogData.dislikedBy.includes(currentUser);

  return (
    <div className="blog-detail-page">
      <div className="blog-post">
        <h2 className="blogtitle">{blogData.title}</h2>
        <div className="bloguser">
          <div>
            <div className="bloguserimgdiv">
              <img src={blogData.userphoto} alt={`image-${blogId}`} />
            </div>
            <div className="blogusercontentdiv">
              <div>
                <p>{blogData.username}</p>
              </div>
              <p>
                <b>Published on: </b>
                {date}
              </p>
            </div>
          </div>
        </div>
        <hr style={{ margin: "1vh .5vw" }} />
        <div className="blogactivity">{parser(blogData.content)}</div>
        <div className="likecomment">
          <div
            onClick={handleLike}
            style={{ color: userHasLiked ? "blue" : "grey" }}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{blogData.likes}</span>
          </div>
          <div
            onClick={handleDislike}
            style={{ color: userHasDisliked ? "blue" : "grey" }}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>{blogData.dislikes}</span>
          </div>
          <div
            onClick={() => {
              setShowComment(!showComment);
              setFocus(!focus);
            }}
          >
            <FontAwesomeIcon icon={faComment} />
            <span>{blogData.comments.length}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div>
            <FontAwesomeIcon icon={faShareSquare} />
          </div>
        </div>
      </div>
      <hr style={{ margin: "2vh 0vw", width: "100%" }}></hr>
      <div className="blog-detail-hide-div">
        <button
          onClick={() => {
            setShowComment(!showComment);
            setFocus(!focus);
          }}
        >
          {showComment ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComment ? <Commentpage onFocus={focus} blogId={blogId} /> : ""}
    </div>
  );
}

export default BlogDetail;
