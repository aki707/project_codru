import "../styles/Start.css"
import b1 from "../assets/books.jpg"
import b2 from "../assets/study.jpg"
import b3 from "../assets/teach.jpg"
import b4 from "../assets/thinks.jpg"
function Start() {
  return (
    <div className="Startmaindiv">
       <div className="Startmainimages">
        <div className="startmainimagesquare">

            Learn Think Study And Grow jkhfksjdbfjlbdfjsbdjf sdfjdsjfbsjdbfjksbd fdskfbsjd bfjk sbfjdsbj f
        </div>
        <img className="image1" src={b1} alt="" />
        <img className="image2" src={b2} alt="" />
        <img className="image3" src={b3} alt="" />
        <img className="image4" src={b4} alt="" />
       </div>
       <div className="Startmaincontent">Learn How To Learn</div>
      
    </div>
  )
}

export default Start
