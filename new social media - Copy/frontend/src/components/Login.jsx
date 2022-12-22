import React from 'react';
// import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { client } from '../client';







const Login = () => {
  const navigate = useNavigate();

  const resp = (res) => {
    console.log(res)
    console.log(jwt_decode(res.credential))
  
    localStorage.setItem('user', JSON.stringify(jwt_decode(res.credential)));
    
    const { name, picture, sub } = jwt_decode(res.credential)
  
    const doc = {
      _id: sub,   //! the underscore variables let sanity know which schema are we referring to
      _type: 'user',
      userName: name,  
      image: picture,
    };
  
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
    
  
  
  }

  const responseGoogle = (response) => {
    console.log(response);

    // //! set local storage to be a JSON object "profileObj" in the response object that is returned upon successful login 
    // localStorage.setItem('user', JSON.stringify(response.profileObj)); 

    // const { name, googleId, imageUrl } = response.profileObj;

    // //! Let's create a new sanity document for the user
    // const doc = {
    //   _id: googleId,   //! the underscore variables let sanity know which schema are we referring to
    //   _type: 'user',
    //   userName: name,  
    //   image: imageUrl,
    // };

    // //! Create a new document (user) if they do not exist
    // client.createIfNotExists(doc).then(() => {
    //   navigate('/', { replace: true });
    // });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={resp}
              onError={resp}
              cookiePolicy="single_host_origin"

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;