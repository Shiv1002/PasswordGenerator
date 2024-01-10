import React from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { addPassword, getNewPassword } from "./Actions";

export default function AddToHistoryCard({ state, dispatch, setShow }) {
  const { password, profile } = state;

  function shouldAddToHistory() {
    if (!password.passwordFor || !password.pass) {
      toast.error("Enter purpose of password", { position: "top-center" });
      return false;
    }

    const newPass = getNewPassword(password);

    dispatch({ type: "setHistory", payload: [newPass] });

    if (profile) {
      addPassword(profile.email, newPass)
        .then((res) => console.log(res))
        .catch((e) => {
          toast.error(e);
          console.log(e);
        });
    }

    dispatch({
      type: "setPassword",
      payload: { name: "passwordFor", val: "" },
    });
    dispatch({
      type: "setPassword",
      payload: { name: "important", val: false },
    });

    setShow(false);
  }

  return (
    <CardContainer>
      <Card>
        <CloseBtn onClick={() => setShow(false)}>❌</CloseBtn>
        <h3>Edit Password ✍ </h3>
        <EditContainer>
          <label htmlFor="Password">Password</label>
          <input type="text" disabled value={password.pass} />
          <label htmlFor="Passwordfor">Password for :- </label>
          <input
            type="text"
            placeholder="google.com"
            value={password.passwordFor}
            onChange={(e) => {
              dispatch({
                type: "setPassword",
                payload: { name: "passwordFor", val: e.target.value },
              });
            }}
            required
          />
          <ImpDiv>
            important :
            <input
              type="checkbox"
              name="important"
              id=""
              checked={password.important}
              onChange={(e) =>
                dispatch({
                  type: "setPassword",
                  payload: { name: "important", val: e.target.checked },
                })
              }
            />
          </ImpDiv>
          <button onClick={shouldAddToHistory}>Add</button>
        </EditContainer>
      </Card>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  z-index: 100;
  position: absolute;
  height: 100dvh;
  width: 100dvw;
  background: #00000082;
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: medium;
`;

const Card = styled.div`
  position: relative;
  padding: 1rem;
  max-width: 30rem;
  width: 60dvw;
  background: white;
  height: 60dvh;
  border-radius: 2rem;
  /* box-sizing: border-box; */
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 10px;
  background: black;
  border-radius: 50%;
  padding: 0.3rem;
`;

const EditContainer = styled.div`
  padding: 0.6rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  * {
    padding: 0.3rem;
    margin: 0.6rem;
  }
`;

const ImpDiv = styled.div`
  display: flex;
  align-items: center;
`;
