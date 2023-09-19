// eslint-disable-next-line no-unused-vars
import React from 'react'
import "../stylesheets/Home.css";
// import bg from "../assets/Home/gradbg1.svg";
import bg from "../assets/Home/newbg.png";

const Home = () => {
  return (
    <>
    <title>DermAI</title>
    <div className="secy1">
      <section className="homey">
        <div className="bgimg">
          <img src={bg} alt="" />
          <div className="darkenimage"></div>
          <div className="content">
            <span className="head">DERM-AI</span>   
            {/* <img src={ok} alt="" /> */}
          </div>
   
        </div>
      </section>
    </div>
    
    
    </>
  );
}

export default Home