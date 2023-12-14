import React from "react";
const style = {
  background: "linear-gradient(180deg, var(--primary), transparent)",
  backgroundClip: "text",
  webkitTextFillColor: "transparent",
  fontSize: "64px",
};

export default function Header() {
  return (
    <h1 id="header" style={style}>
      Password Generator
    </h1>
  );
}
