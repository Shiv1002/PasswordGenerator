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
    <Card>
      <button onClick={() => setShow(false)}>❌</button>

      <h3>Edit Password ✍ </h3>
      <span>
        {password.pass} - {password.passwordFor}
      </span>
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
      <div>
        imp:
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
      </div>

      <button onClick={shouldAddToHistory}>Add</button>
    </Card>
  );
}

const Card = styled.div`
  z-index: 100;
  position: absolute;
  height: 100dvh;
  width: 100dvw;
`;
