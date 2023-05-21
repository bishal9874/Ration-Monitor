import React from "react";
import {
  TextField,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./Contact.css";
const Contact = () => {
  return (
    <section className="c-wrapper" id="contact">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="c-left flexColStart">
          <span className="contactTitle">Contacts</span>
          <span className="secondaryText">Easy to Contact Us</span>
          <Box component="form">
            <div className="inputs_container">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
              />

              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                margin="normal"
              />
              <TextField
                margin="normal"
                fullWidth
                id="comment"
                name="comment"
                label="Add a comment"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Write your comment here..."
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="flexCenter login_butto_section ">
              {/* {isLoading ? (
         <CircularProgress />
       ) : (
         <button type="submit" className="login_button">
           Submit
         </button>
       )} */}
              <button type="submit" className="login_button">
                Submit
              </button>
            </div>
          </Box>
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