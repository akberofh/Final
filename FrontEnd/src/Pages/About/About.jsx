import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="container contdire top-rated-cars-container py-5">
        <div className="section-title text-center">
          <h3>About Us</h3>
        </div>

        {/* content */}
        <div className="row">
          <div className="col col-12 col-lg-12 cr-border p-4 about-us">
            {/*  <p>
              <strong>Car Rental</strong> -A Car has a new face. After more than
              20 years in business, we decided to give a fresher look to our
              brand and our services. With our fully renewed fleet of vehicles,
              we are ready to meet all expectations and requirements.
            </p> */}

            <p>Who we are?</p>
            <ul>
              <li>
                We are a self-driven online peer-to-peer car rental Services
                that allows individuals to list their cars for rent to their
                peers.
              </li>
              {/* <li>
                If you want to book directly through a supplier, and not through
                a broker – choose <Link to={"/"}>Car Rental</Link>
              </li> */}
              <li>
                Peer also sells their cars on the platform and together are
                working to provide excellent services with our fleet of
                vehicles.
              </li>
              <li>Why Passive Car?</li>
              <li>
                We believe that every car is an asset, not a liability and as
                such, it should passively bring you income whenever you’re not
                using it. List your car{" "}
                <Link to={"/dashboard/rent-car-upload"}>here</Link> or book your
                car <Link to={"/rent-car"}>here</Link>.
              </li>
              <li>
                You can directly negotiate some of the terms and conditions, and
                payment options, especially if you require a long-term rental
                service
              </li>
              <li>You can reach us 24/7 on our mobile numbers</li>
              <li>
                You can reach the car owner anytime via his/her phone number
              </li>
            </ul>
            <br />
            <p>You can contact us through our website</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
