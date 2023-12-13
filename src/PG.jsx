import React, { useMemo, useState } from "react";
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
  const [history, setHisory] = useState([]);

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

  const handleSettingChange = (e) => {
    // console.log(e.target.checked);
    if (e.target.name === "length") {
      setSettings({
        ...settings,
        [e.target.name]: Math.min(Math.max(e.target.value, 8), 16),
      });
      return;
    }
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };
  return (
    <>
      <div id="pg-container">
        <input type="text" defaultValue={password} />
        <button onClick={generate}>Generate</button>
        <div>
          Length:{" "}
          <input
            min={8}
            max={16}
            type="number"
            name="length"
            value={settings.length}
            onChange={handleSettingChange}
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
    </>
  );
}
