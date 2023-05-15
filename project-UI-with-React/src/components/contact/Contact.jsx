import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <section className="c-wrapper" id="contact">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="c-left">
          <span>Contacts</span>
          <span>Easy to Contact Us</span>
          
          
        </div>
        {/* rightside */}
        <div className="c-right">
          <div className="c-image-container">
            <img src="src/assets/contact.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
