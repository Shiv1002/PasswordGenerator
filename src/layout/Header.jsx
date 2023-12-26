import React from "react";
const style = {
  background: "linear-gradient(180deg, var(--primary), transparent)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Header() {
  return (
    <span id="header" style={style}>
      <strong>Password Generator</strong>
    </span>
  );
}
