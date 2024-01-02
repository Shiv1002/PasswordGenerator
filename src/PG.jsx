import React, { useEffect, useMemo, useState } from "react";

import { Toaster, toast } from "react-hot-toast";
import bars_icon from "/bars-solid.svg";
import CopyBtn from "./CopyBtn";
import LoginComp from "./LoginComp";
import { getPassword, addPassword } from "./Actions.js";
const initialSettings = {
  length: 12,
  addUpperCase: true,
  addSpecialCase: true,
  addNumbers: true,
};

const passwordSet = {
  Uppercase: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  Lowercase: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  Numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  SpecialCase: [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "{",
    "}",
    "[",
    "]",
    "|",
    "\\",
    ";",
    ":",
    "'",
    '"',
    "<",
    ">",
    ",",
    ".",
    "?",
    "/",
  ],
};

export default function PG() {
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState(initialSettings);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    generate();
  }, []);

  const psetForCurrentSetting = useMemo(() => {
    console.log("change in setting");
    let pset = [];
    pset.push(...passwordSet.Lowercase);
    if (settings.addUpperCase) pset.push(...passwordSet.Uppercase);
    if (settings.addNumbers) pset.push(...passwordSet.Numbers);
    if (settings.addSpecialCase) pset.push(...passwordSet.SpecialCase);
    return pset;
  }, [settings]);

  function generate() {
    if (settings.length < 8 || settings.length > 16) {
      toast.error("Password length must be in range of 8 and 16", {
        duration: 4000,
      });
      return;
    }
    let newPassword = "";
    //setting new Password
    for (var i = 0; i < settings.length; i++) {
      let newChar =
        psetForCurrentSetting[
          Math.floor(Math.random() * psetForCurrentSetting.length)
        ];

      newPassword += newChar;
    }
    console.log("Password generated!");
    setPassword(newPassword);
  }

  function addHistory() {
    if (
      password != "" &&
      history.filter((ele) => ele.pass == password).length == 0
    )
      setHistory([{ id: history.length, pass: password }, ...history]);
  }

  const handleSettingChange = (e) => {
    // console.log(e.target.checked);
    if (e.target.name === "length") {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value,
      });
      return;
    }
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <LoginComp
        getPass={getPassword}
        addPass={addPassword}
        setHistory={setHistory}
      />
      <Toaster position="top-right" />

      <div id="pg-container-wrapper" className="show-pg show-history">
        <div id="pg-container">
          <div className="input-container">
            <div className="password-input-container">
              <input
                className="password-input"
                type="text"
                defaultValue={password}
                disabled
              />

              <CopyBtn password={password} addHistory={addHistory} />
            </div>

            <button className="primary-btn" onClick={generate}>
              Generate
            </button>
          </div>
          <div className="setting-container">
            <div className="length-input">
              Length{" "}
              <input
                min={8}
                max={16}
                type="number"
                name="length"
                value={settings.length}
                onChange={handleSettingChange}
              />
            </div>
            <div style={!settings.addUpperCase ? { opacity: "0.5" } : null}>
              {" "}
              <span>Uppercase </span>
              <input
                type="checkbox"
                name="addUpperCase"
                id=""
                checked={settings.addUpperCase}
                onChange={handleSettingChange}
              />
            </div>
            <div style={!settings.addNumbers ? { opacity: "0.5" } : null}>
              {" "}
              <span>Numbers</span>
              <input
                type="checkbox"
                name="addNumbers"
                id=""
                checked={settings.addNumbers}
                onChange={handleSettingChange}
              />
            </div>
            <div style={!settings.addSpecialCase ? { opacity: "0.5" } : null}>
              {" "}
              <span>Spacial Characters</span>
              <input
                type="checkbox"
                name="addSpecialCase"
                id=""
                checked={settings.addSpecialCase}
                onChange={handleSettingChange}
              />
            </div>
          </div>
        </div>
        <div id="history-container">
          <div>History</div>
          <div className="pass-list">
            <ul>
              {history.map((passEle) => {
                return (
                  <li key={passEle.id}>
                    {passEle.pass} <CopyBtn password={password} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="nav-container">
          <i
            onClick={() => {
              document
                .querySelector("#pg-container-wrapper")
                .classList.toggle("show-pg");
            }}
          >
            <img src={bars_icon} alt="" />
          </i>
        </div>
      </div>
    </>
  );
}
