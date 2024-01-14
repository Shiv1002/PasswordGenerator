import React, { useEffect, useState } from "react";

import "./App.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { getPassword, addPassword } from "./Actions.js";
import downArrow from "/angles-down-solid.svg";
import styled from "styled-components";
import Cookies from "js-cookie";

export default function GoogleAuthButton({ state, dispatch }) {
  const [user, setUser] = useState(Cookies.get("user-acc-token") || null);

  const [isToggled, setIsToggled] = useState(false);
  const { profile } = state;

  const login = useGoogleLogin({
    onSuccess: (res) => {
      setUser(res.access_token);
      Cookies.set("user-acc-token", res.access_token, {
        expires: 1,
      });
    },
    onError: (err) => console.log(err.message),
    onNonOAuthError: (noAuthErr) => console.log(noAuthErr.message),
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("User logged!", { position: "top-center" });
          //set profile
          // to ui profile data
          dispatch({ type: "setProfile", payload: data });
        })
        .catch((e) => {
          setUser(null);
          toast.error("Something went wrong!", { position: "top-center" });
          console.log("Error ocurred");
        });
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    const fetchUserPassword = async () => {
      await getPassword(profile.email)
        .then((data) => {
          console.log(data);
          dispatch({
            type: "setHistory",
            payload: data.passwords
              .map((ele, index) => {
                return {
                  id: ele.id,
                  pass: ele.pass,
                  passwordFor: ele.passwordFor,
                  important: ele.important,
                };
              })
              .reduce((output, current) => {
                // for reverse order
                return [current, ...output];
              }, []),
          });
        })
        .catch((e) => console.log(e.message));
    };
    fetchUserPassword();

    return () => {
      dispatch({ type: "logout" });
    };
  }, [profile]);

  return (
    <>
      <LoginDivContainer>
        <LoginCard>
          <ToggleBtn onClick={() => setIsToggled((val) => !val)}>
            <img data-istoggled={isToggled} src={downArrow} alt="" />
          </ToggleBtn>
          {profile ? (
            <ProfileDiv data-shouldexpand={isToggled}>
              <Profile>
                <img src={profile.picture} alt="" />
                <span
                  style={{
                    width: "1px",
                    height: "1px",
                    backgroundColor: "gray",
                    scale: "0.5",
                    borderRadius: "50%",
                  }}
                ></span>
                <span>{profile.given_name}</span>
              </Profile>

              <Btn
                style={{
                  marginLeft: "auto",
                }}
                onClick={() => {
                  console.log("logging out!!");
                  toast.success("logged out!", { position: "top-center" });
                  googleLogout();
                  dispatch({ type: "logout" });
                  setUser(null);
                  Cookies.remove("user-acc-token");
                }}
              >
                Logout
              </Btn>
            </ProfileDiv>
          ) : (
            <LoginDiv data-shouldexpand={isToggled}>
              <Btn
                className=""
                onClick={() => {
                  console.log("login start");
                  login();
                }}
              >
                Login
              </Btn>
            </LoginDiv>
          )}
        </LoginCard>
      </LoginDivContainer>
    </>
  );
}

const LoginDivContainer = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  // background: white;
  width: 100vw;
  min-height: 9rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;

  *[data-shouldexpand="false"] {
    // display: none;
    opacity: 0;
    translate: 0 -10px;
  }
  *[data-shouldexpand="true"] {
    opacity: 1;
    translate: 0px 0px;
    z-index: 10;
  }
  img[data-istoggled="false"] {
    rotate: 90deg;
  }
`;
const LoginCard = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: min-content;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border-radius: 1rem;
  button {
    border-radius: 0 0 1rem 1rem;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 1rem 1rem;
  border: 1px solid rgb(82 0 255 / 70%);
  background: white;
  overflow: hidden;

  img {
    border-radius: 50%;
    height: 40px;
  }

  * {
    padding: 3px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleBtn = styled.div`
  padding: 1rem;
  outline: none;
  margin-inline-start: auto;

  z-index: 2;
`;

const Btn = styled.button`
  width: 100%;
  font-family: inherit;
  font-size: larger;
  border: none;
  padding: 0.6rem 1rem;
  background: rgb(82 0 255 / 70%);
  color: white;

  &:hover {
    background: rgb(82 0 255 / 90%);
  }
`;
