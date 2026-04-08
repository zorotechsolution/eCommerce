import React, { useRef } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";

const Login = () => {

    // useRef()
  return (
    <>
      <section className=" bg-linear-to-r from-green-50 via-green-100 to-green-50 flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 backdrop-blur-md bg-white/30  md:w-1/3 p-10 md:20 shadow-2xl   rounded-2xl h-auto gap-4 " onSubmit={""} component={"form"}>
        <div className="text-sm text-gray-500">Please enter your details</div> 
        <h1 className="text-2xl md:text-4xl font-bold">Welcome back</h1>
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
              id="outlined-password-input"
              label="Password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="block md:flex justify-between items-center">
            <div className=""> <Checkbox id="ch" /><label htmlFor="ch" className="text-xs">Rementior for 30 days</label> </div>
            <div className=""><Link className="underline text-blue-600">Forgot possword</Link></div>
          </div>

          <div className="">
            <Button fullWidth variant="contained" color="success">
 login
</Button>

          </div>
          <div className="text-center ">Don't have an account? <Link to={"/Signup"} className="underline text-blue-600 ">Sign up</Link></div>
        </div>
      </section>
    </>
  );
};

export default Login;
