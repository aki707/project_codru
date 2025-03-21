import { useEffect, useState } from "react";
import "../styles/Blogpage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from '../components/Footer'

function Blogpage({ userData, setUserData }) {
  const navigate = useNavigate();
  const [blogarray, setBlogarray] = useState([]);
  const [expandedTitles, setExpandedTitles] = useState({});

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch("https://codru-server.vercel.app/blogsdata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

  if (blogarray.length === 0) {
    return <div className="shimmereffectwhite"></div>;
  }

  const handleBlogClick = (blogId) => {
    console.log(`Navigating to blog with ID: ${blogId}`);
    navigate(`/blog/${blogId}`);
  };

  const extractFirstImageAndSnippet = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    const text = doc.body.textContent || "";
    return {
      image: img ? img.src : null,
      snippet: text.slice(0, 400) + "...",
    };
  };

  const toggleTitleExpansion = (index) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="blog-page">
        {blogarray.map((data, index) => {
          const contentPreview = extractFirstImageAndSnippet(data.content);
          const isExpanded = expandedTitles[index];
          const title = data.title;
          const snippet = contentPreview.snippet;

          return (
            <div key={index} className="blog-post">
              {contentPreview.image ? (
                <img src={contentPreview.image} alt="Blog Image" />
              ) : (
                <img src={data.userphoto} alt="User Photo" />
              )}
              <h2 className="blogtitle">
                {isExpanded || title.length <= 70 ? (
                  title
                ) : (
                  <>
                    {title.slice(0, 70)}...{" "}
                    <span
                      className="blog-page-show-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTitleExpansion(index);
                      }}
                    ></span>
                  </>
                )}
              </h2>
              <span className="blogpagesnippet">{snippet}</span>
              <div className="blogseemore">
                <button onClick={() => handleBlogClick(data._id)}>
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Blogpage;