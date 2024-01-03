const tc_email = "shiv@gmail.com";
const tc_pass = "kym mall";
const DB_URL = import.meta.env.VITE_DB_URL || "http://localhost:1212";
export const getPassword = async (email) => {
  return new Promise(async (resolve, reject) => {
    if (!email) reject("email undefined!");
    await fetch(DB_URL + "/get-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((e) => reject(e.message));
  });
};

export const addPassword = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email) reject("email undefined!");
    if (!password) reject("password undefined!");
    await fetch(DB_URL + "/add-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.modifiedCount) {
          resolve("Password successfully added");
        } else {
          reject("Error in DB");
        }
      })
      .catch((e) => reject(e.message));
  });
};
