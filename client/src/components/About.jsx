//  import "../styles/About.css";
// const About = () => {
//   return (
    
//     <div className="page">
//       <div className="Ab_mini">
//         <h1>
//           <span>About Codru</span>
//         </h1>
//       </div>
//       <div className="Ab_main">
//         <div className="Ab_sec">
//           <img src="/image/second.png" alt=""></img>
//         </div>
//         <div className="Ab_con1">
//           <h3>What is codru Education </h3>
//           <p>
//             Codru Education is an educational Institute which offers both online
//             and offline courses / workshops / trainings / internships for school
//             and B. Tech students. Codru Education is committed to improving
//             lives through learning. Codru Education started taking its initial
//             form in 2021 & is still in its transformational phases. Codru’s
//             intention is to provide guidance to children so they can become
//             capable of making a difference. This is why they strive to work on
//             child’s overall development by helping them figure out their
//             purpose, core values and goals and their own way to achieve it. They
//             help them explore their curiosity and gain a perspective towards
//             everything as it opens new possibilities for improvement and
//             development. They focus on enhancing a child’s creativity, problem
//             solving and decision-making skills so they can bring out what’s
//             inside each of them and what they wish to be in life.
//           </p>
//         </div>
//       </div>
//       <div className="Ab_main2">
//         <div className="Ab_sec2">
//           <img src="/image/lavish.png" alt=""></img>
//           <div className="Ab_con2">
//             <h3>Know Your Tutor</h3>
//             <h2>Lavish Sharma</h2>
//             <p>
//               Your tutor is a B.tech graduate and a computer enthusiast who
//               loves interacting with kids. Talking to kids and knowing about
//               their dreams intrigues him and this is why he has been pursing his
//               hobby of teaching since 2 years to play an active role in their
//               lives. Also, to keep himself creative, he has been working with
//               S.R.Robotics. where they design and create innovative projects for
//               school and college students. The work not only allows him to
//               provide children with better education but also in making a
//               difference in their lives.
//             </p>
//           </div>
//         </div>
//         <div className="Ab_main3">
//           <h3> Our Goal and Vision </h3>
//           <p>
//             The intention of CODRU is to provide guidance and help the newer
//             generation to become capable of making a difference. Our objective
//             is to strive for child's over all of development and to impart life
//             changing values through education. With the focus of enhancing
//             child's creativity and decision making skills we bring CODRU to
//             you.An engaging education system is one where students are active
//             participants in their own learning. This vision prioritizes the
//             creation of learning environments that are not only informative but
//             also inspiring and motivating. By incorporating student interests
//             and real-world applications into the curriculum, education becomes
//             more relevant and exciting. Strategies such as gamification,
//             collaborative projects, and experiential learning opportunities can
//             significantly enhance student engagement.Education should not be
//             confined to the early years of life but should be a continuous
//             journey. The vision of education promotes the concept of lifelong
//             learning, where individuals are encouraged to pursue knowledge and
//             skills throughout their lives. This can be achieved through the
//             provision of flexible learning opportunities, such as online
//             courses, workshops, and community education programs. By instilling
//             a passion for learning and providing the resources to pursue it,
//             individuals can remain adaptable and resilient in the face of
//             change.
//           </p>
//         </div>
//       </div>
//     </div>
    
//   );
// };
// export default About;



import React from 'react';
import '../styles/About.css';
import AboutUsAnim from './AboutUsAnim';
// import Navbar from '../styles/Navbar.css'
import Footer from '../components/Footer'
import Navbar from "./Navbar";

const About = ({ userData, setUserData }) => {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start"}}> 
      <Navbar userData={userData} setUserData={setUserData} />
    <div className="about-container">
        
      <div className="about-header" >
        <h1 style={{marginTop: '50px'}}>About Us</h1>
        </div>

        <div className="about-header1">
          <div className='aboutUsText'>
            <h1 className='whoWE' style={{color: " #4e1a28"}}>Who are we?</h1>
            <p className='whoWePara'>Codru Education is an educational Institute which offers both online
            and offline courses / workshops / trainings / internships for school
            and B. Tech students.
            Codru Education is committed to improving
            lives through learning. Codru Education started taking its initial
            form in 2021 & is still in its transformational phases. Codru’s
            intention is to provide guidance to children so they can become
            capable of making a difference. This is why they strive to work on
            child’s overall development by helping them figure out their
            purpose, core values and goals and their own way to achieve it. They
            help them explore their curiosity and gain a perspective towards
            everything as it opens new possibilities for improvement and development. They focus on enhancing a child’s creativity, problem
            solving and decision-making skills so they can bring out what’s
            inside each of them and what they wish to be in life.</p>
            <div className='aboutUsAnim'>
              <AboutUsAnim/>
              <h3 >Our objective is
          to strive for child's over all of development and to impart life 
          changing values through education.</h3>
            </div>
          
            </div>
            <div className='ourGoal'>
              <h1 style={{color: " #4e1a28"}}>Our Goal & Vision</h1>
              <p>
          The intention of CODRU is to provide guidance and help the newer
          generation to become capable of making a difference. Our objective is
          to strive for child's over all <br /> of development and to impart life
          changing values through education. With the focus of enhancing child's
          creativity and decision making skills we bring CODRU to you. <br />An
          engaging education system is one where students are active
          participants in their own learning. This vision prioritizes the
          creation of learning environments that are <br />not only informative but
          also inspiring and motivating. By incorporating student interests and
          real-world applications into the curriculum, education becomes more
          relevant <br />and exciting. Strategies such as gamification, collaborative
          projects, and experiential learning opportunities can significantly
          enhance student engagement.Education should <br />not be confined to the
          early years of life but should be a continuous journey. The vision of
          education promotes the concept of lifelong learning, where individuals
          are encouraged <br />to pursue knowledge and skills throughout their lives.
          This can be achieved through the provision of flexible learning
          opportunities, such as online courses, workshops, and community
          education programs. By instilling a passion for learning and providing
          the resources to pursue it, individuals can remain adaptable and
          resilient in the face of change.
        </p>
            
        
            
            </div>  
            <div className='ourInspiration'>
              <div className='aboutUsLeft'>
                <h1 style={{color: " #4e1a28"}}>Our Founder</h1>
                <h2>Mr. Lavish Sharma</h2>
                <p>
            Our founder is a B.tech graduate and a computer enthusiast who loves <br />
            interacting with kids. Talking to kids and knowing about their
            dreams intrigues <br /> him and this is why he has been pursing his hobby
            of teaching since 2 years to <br /> play an active role in their lives.
            Also, to keep himself creative, he has been working with
            S.R.Robotics. where they design and create innovative projects for
            school and college students. The work not only allows him to provide
            children with better <br />education but also in making a difference in
            their lives.
          </p>
              </div>
              <div className='aboutUsRight'>

               
              </div>
            
            </div>
            
        
      
       
        
        </div>
        </div>
            <Footer></Footer>   
    </div>
  );
};

export default About;







  





  


