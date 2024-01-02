import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function GoogleAuthButton({ getPass, addPass, setHistory }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (res) => setUser(res),
    onError: (err) => console.log(err.message),
    onNonOAuthError: (noAuthErr) => console.log(noAuthErr.message),
  });

  useEffect(() => {
    if (!profile) return;
    const fetchUserPassword = async () => {
      await getPass(profile.email)
        .then((data) => {
          setHistory(
            data.passwords.map((ele, index) => {
              return { id: index, pass: ele };
            })
          );
        })
        .catch((e) => console.log(e.message));
    };
    fetchUserPassword();
  }, [profile]);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("User logged!", { position: "top-center" });
          setProfile(data);
        })
        .catch((e) => {
          toast.error("Something went wrong!", { position: "top-center" });
          console.log("Error ocurred");
        });
    };
    fetchUserData();
  }, [user]);

  return (
    <LoginCard>
      {profile ? (
        <ProfileDiv>
          <img src={profile.picture} alt="" />
          <span>{profile.given_name}</span>

          <Btn
            style={{
              marginLeft: "auto",
            }}
            onClick={() => {
              console.log("logging out!!");
              toast.success("logged out!", { position: "top-center" });
              googleLogout();
              setProfile(null);
              setHistory([]);
            }}
          >
            Logout
          </Btn>
        </ProfileDiv>
      ) : (
        <LoginDiv className="login-container">
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
  );
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const LoginCard = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  background: transparent;
  width: 100vw;
  padding: 1rem;
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    height: 40px;
  }
  * {
    padding: 5px;
  }
`;

const Btn = styled.button`
  font-family: inherit;
  font-size: larger;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  background: rgb(82 0 255 / 70%);
  color: white;

  &:hover {
    background: rgb(82 0 255 / 90%);
    box-shadow: 1px 1px 10px rgb(82 0 255 / 90%);
  }
`;
