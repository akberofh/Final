import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Secquer.css";

const Sectionquesition = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const FQAComponentItem = ({ quesId, ques, ans }) => (
    <div className="fqa-component-item" data-aos="fade-up">
      <div className="accordion-item">
        <input type="checkbox" id={`accordion-${quesId}`} className="accordion-checkbox" />
        <label htmlFor={`accordion-${quesId}`} className="accordion-header">
          {ques}
        </label>
        <div className="accordion-body">
          <p>{ans}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container fqa-container py-5" id="faq">
      <div className="section-title">
        <h3>Frequently Asked Questions</h3>
      </div>

      <div className="faq-grid">
        <FQAComponentItem
          quesId="1"
          ques="How does it work?"
          ans="Anyone who is living in the United States can list a car in passive-car for rental. However, to rent a car, an individual must be 21 years old or older and can rent a car by selecting the pick-up and return location including the start and the end date of the trip with the car that he/she selects."
        />
        <FQAComponentItem
          quesId="2"
          ques="How to take Hourly Rent?"
          ans="Good for people who park their cars at the office while working inside the building: For example – If you work from 7 AM to 3 PM, During this time your car can be rented out – the renter will pick up and drop off at the same location."
        />
        <FQAComponentItem
          quesId="3"
          ques="What if car gets in an accident?"
          ans="Your safety comes first, call 911 and file a police report, then call the passive car and the owner of the vehicle for more assistance."
        />
        <FQAComponentItem
          quesId="4"
          ques="Do all the cars have insurance?"
          ans="Every vehicle must have insurance."
        />
        <FQAComponentItem
          quesId="5"
          ques="What if I want to cancel?"
          ans="You can cancel your trip anytime 24 hours before the start of your trip; any cancellations that are less than one day from the pickup time will be charged a cancellation fee."
        />
        <FQAComponentItem
          quesId="6"
          ques="Do I get a refund for cancelling?"
          ans="Read the Cancellation rules above."
        />
        <FQAComponentItem
          quesId="7"
          ques="How can I sign up?"
          ans={`You can sign up as:
                a) Renter
                b) Host
                c) Seller`}
        />
      </div>
    </div>
  );
};

export default Sectionquesition;
