import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  Box,
  Alert,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import "./userKyc.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../../../API/localStorage";
import { useUser_kycMutation } from "../../../API/rationApi";
import { useDispatch } from "react-redux";
import { setUsertoken } from "../../../features/authSlice";
import {
  states,
  districtsByState,
  village_town,
} from "../../../utils/CountryData";
const UserKyc = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const [kycuser, { isLoading }] = useUser_kycMutation(access_token);
  const handlekycuser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const kycData = {
      // dateofbirth:data.get("date_of_birth"),
      // gender:data.get("gender"),
      // state:data.get("state"),
      // district:data.get("district"),
      village: data.get("village"),
      houseNo: data.get("houseNo"),
      post_office: data.get("post_office"),
      pin: data.get("pin"),
      Annual_income: data.get("Annual_income"),
    };
    console.log(kycData);
    const res = await kycuser(kycData);
    console.log(res);
    if (res.error) {
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUsertoken({ access_token: access_token }));
      navigate("/dashboard");
    }
  };
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [villageTown, setVillage_town] = useState("");

  const handleStateChange = (event) => {
    setState(event.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const handleVillageTown = (event) => {
    setVillage_town(event.target.value);
  };

  //Aadhar No varifiy

  return (
    <>
      <section className="u-wrapper">
        <div className=" flexCenter u-header">
          <img
            src="src/assets/png/logo-no-background.png"
            alt="logo"
            width={180}
            // onClick={handleLogout}
          />
          <p className="secondartText">
            Users should be required to provide their own KYC verification in
            order to register on this application
          </p>
        </div>
      </section>
      <section className="paddings flexCenter innerWidth uk-container">
        <img src="src/assets/kyc.png" width={600} height={400} />
        
        <div className="userkyc_form">
          <Box
            component="form"
            noValidate
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            id="userkyc-form"
            onSubmit={handlekycuser}
          >
          
              <section className="inputDividers">
                <div>
                                {/* Aadhar card Number */}
            <TextField
              fullWidth
              id="aadharNumber"
              name="aadharNumber"
              label="Aadhar Number"
              inputProps={{
                maxLength: 14,
                pattern: "\\d{4} \\d{4} \\d{4}",
                title: "Please enter Aadhar number in format XXXX XXXX XXXX",
              }}
              onChange={(e) => {
                const value = e.target.value;
                const newValue = value.replace(/[^0-9]/g, ""); // remove non-numeric characters
                let formattedValue = "";
                for (let i = 0; i < newValue.length; i++) {
                  if (i % 4 === 0 && i > 0) formattedValue += " "; // add space after every 4 characters
                  formattedValue += newValue[i];
                }
                e.target.value = formattedValue;
              }}
            />
              {/* Phone number */}
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              id="phNumber"
              name="phNumber"
              inputProps={{ maxLength: 10 }}
            />
              {/* date of Birth */}
            <TextField
              fullWidth
              id="date_of_birth"
              name="date_of_birth"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* gender */}
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
              {/* state */}
            <Select
              value={state}
              onChange={handleStateChange}
              displayEmpty
              fullWidth
              id="state"
              name="state"
              label="State"
            >
              <MenuItem value="" disabled>
                Select State
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
                {/* district */}
            {state && (
              <Select
                value={district}
                onChange={handleDistrictChange}
                displayEmpty
                fullWidth
                id="district"
                name="district"
                label="District"
              >
                <MenuItem value="" disabled>
                  Select District
                </MenuItem>
                {districtsByState[state].map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            )}
                </div>
                <div>
                  {/* village */}
            {district && (
              <Select
                value={villageTown}
                onChange={handleVillageTown}
                displayEmpty
                fullWidth
                id="village"
                name="village"
                label="village/Town"
              >
                <MenuItem value="" disabled>
                  Select Village/Town
                </MenuItem>
                {village_town[district].map((villageTown) => (
                  <MenuItem key={villageTown} value={villageTown}>
                    {villageTown}
                  </MenuItem>
                ))}
              </Select>
            )}
            {/* <TextField
              margin="normal"
              fullWidth
              id="village"
              name="village"
              label="village/Town"
            /> */}
            {server_error.village ? (
              <Typography
                style={{ fontSize: 12, color: "red", textAlign: "center" }}
              >
                {" "}
                {server_error.village[0]}
              </Typography>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              fullWidth
              id="houseNo"
              name="houseNo"
              label="House No"
            />
            {server_error.houseNo ? (
              <Typography
                style={{ fontSize: 12, color: "red", textAlign: "center" }}
              >
                {" "}
                {server_error.houseNo[0]}
              </Typography>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              fullWidth
              id="post_office"
              name="post_office"
              label="Post Office"
            />
            {server_error.post_office ? (
              <Typography
                style={{ fontSize: 12, color: "red", textAlign: "center" }}
              >
                {" "}
                {server_error.post_office[0]}
              </Typography>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              fullWidth
              id="pin"
              name="pin"
              label="pin"
            />
            {server_error.pin ? (
              <Typography
                style={{ fontSize: 12, color: "red", textAlign: "center" }}
              >
                {" "}
                {server_error.pin[0]}
              </Typography>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              fullWidth
              id="Annual_income"
              name="Annual_income"
              label="Annual_income"
            />
            {server_error.Annual_income ? (
              <Typography
                style={{ fontSize: 12, color: "red", textAlign: "center" }}
              >
                {" "}
                {server_error.Annual_income[0]}
              </Typography>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              fullWidth
              id="fpsCode"
              name="fpsCode"
              label="FPS (Fair Price Shop) Code "
            />
                </div>
              </section>
            
            {/* <TextField margin='normal' disabled fullWidth id='pin' name='pin' label='pin'/> */}

            <button type="submit" className="button ">
              Join
            </button>

            {server_error[0] ? (
              <Alert severity="error">{server_error[0]}</Alert>
            ) : (
              ""
            )}
          </Box>
        </div>
      </section>
    </>
  );
};

export default UserKyc;
