import React from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <section className="flex justify-center h-screen items-center bg-linear-to-r from-green-50 via-green-100 to-green-50">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 hover h-full md:h-auto grid grid-cols-1 gap-5 p-10 backdrop-blur-md bg-white/40 rounded-2xl">
        <div className="text-sm text-gray-500">Please enter your details</div>
          <h1 className="text-4xl font-bold">Create Account</h1>
          <div className="">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Enter your UserName"
              variant="outlined"
              required
            />
          </div>
          <div className="">
            <TextField
              fullWidth
              id="outlined-basic"
              type="email"
              label="Enter your Email"
              variant="outlined"
              required
            />
          </div>
          <div className="">
            <TextField
              fullWidth
              id="outlined-basic"
              type="number"
              label="Enter your Number"
              variant="outlined"
              required
            />
          </div>
          <div className="">
            <TextField
              fullWidth
              id="outlined-basic"
              type="password"
              label="Enter your Password"
              variant="outlined"
              required
            />
          </div>
          <div className="">
            <TextField
              fullWidth
              id="outlined-basic"
              type="password"
              label="Enter your Confirm Password"
              variant="outlined"
              required
            />
          </div>
          <div className="">
            <Button fullWidth variant="contained" color="success">
              Sign up
            </Button>
          </div>
           <div className="block ">
                      <div className=""> <Checkbox id="ch" /><label htmlFor="ch" className="text-md align-middle">Remember me</label> </div>
                    </div>
          <div className="text-center">
            Already have an account? <Link className="text-blue-600 underline" to={"/Login"}>Sign in</Link> 

          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
