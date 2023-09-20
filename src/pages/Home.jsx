// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import "../stylesheets/Home.css";
import AOS from "aos"
import 'aos/dist/aos.css';
// import bg from "../assets/Home/gradbg1.svg";
import bg from "../assets/Home/newbg.png";

import didi1 from '../assets/Home/didi1.jpg'
import didi2 from '../assets/Home/didi2.jpg'
import didi3 from '../assets/Home/didi3.jpg'
import didi4 from '../assets/Home/didi4.jpg'

const Home = () => {

  useEffect(() => {
    AOS.init({duration:2000 , once:true})
  })

  return (
    <>
    <title>DermAI</title>
    {/* <div className="secy1">
      <section className="homey">
        <div className="bgimg">
          <img src={bg} alt="" />
          <div className="darkenimage"></div>
          <div className="content">
            <span className="head">DERM-AI</span>   
          </div>
        </div>
      </section>
    </div> */}
    <section>
    <div className='container06'>
        <div className='imgdiv06' data-aos="slide-down"  data-aos-duration="700"><img src={didi4} alt="" className='img06'/></div>
        <div className='imgdiv06'data-aos="slide-up" data-aos-delay="300" data-aos-duration="700"><img src={didi2} alt="" className='img06'/></div>
        <div className='imgdiv06' data-aos="slide-down" data-aos-delay="600" data-aos-duration="700"><img src={didi1} alt="" className='img06'/></div>
        <div className='imgdiv06' data-aos="slide-up" data-aos-delay="900" data-aos-duration="700"><img src={didi3} alt="" className='img06'/></div>
        <p className='heading06' data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="400">DermAI</p>
      </div>
    </section>

    <section>
    <div className="container07">
        <div className='heading07' data-aos="slide-right" data-aos-duration="800">
          <p>Get diagnosed in 3 easy steps !</p>
        </div>
        <div className="content07">
          <div className="c1">
            <h3>Step 01:</h3>
            <p>SignUp in our platform!</p>
          </div>
          <div className="c2">
            <h3>Step 02:</h3>
            <p>Upload images and describe the symptoms of your aliment </p>
          </div>
          <div className="c3">
            <h3>Step 03:</h3>
            <p>Get a diagnosis of yor ailment depending on the images and symptom description</p>
          </div>
        </div>
    </div>
    </section>
    
    <section>
      <div className="container08">
        <h1>What we do</h1>
      </div>
    </section>
    </>
  );
}

export default Home