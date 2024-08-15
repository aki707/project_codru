import { useNavigate } from "react-router-dom";
import "../styles/Blogpopup.css"; // Create and style this CSS file as needed

const Blogpopup = ({ closePopup }) => {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate("/createblog");
    closePopup();
  };

  const handleSeeBlogs = () => {
    navigate("/blogsdata");
    closePopup();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button onClick={handleCreateBlog}>Create Your Own Blog</button>
        <button onClick={handleSeeBlogs}>See Others' Blog</button>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default Blogpopup;
