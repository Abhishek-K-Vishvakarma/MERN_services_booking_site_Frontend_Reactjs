export const logins = (email, password) =>{
  if (email === "admin@exp.com" && password === "a12") {
    localStorage.setItem("user", JSON.stringify({role : "admin"}));
    return { role: "admin" };
  } else if (email === "user@example.com" && password === "user123"){
    localStorage.setItem("user", JSON.stringify({ role: "user" }));
    return { role: "user" };
  }
  return {email, password};
};

export const logouts = () =>{
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
