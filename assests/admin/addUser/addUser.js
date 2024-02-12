const logout = () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "../../login/login.html";
  return;
};

const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // getting the username and password
  let username = document.getElementById("username")?.value;
  let password = document.getElementById("password")?.value;
  let cpassword = document.getElementById("cpassword")?.value;

  if(username.toString().trim() === "" || password.toString().trim() === "" || cpassword.toString().trim() === ""){
    alert("Please enter username, password and confirm password");
    return;
  }

  if (password != cpassword) {
    alert("Password and confirm password doesn't match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userExist = users.findIndex((currUser) => {
    return currUser.username === username;
  });

  if((userExist !== -1) || username === "Admin"){
    alert("User already exists");
    form.reset();
    return;
  }

  let newUser = {
    id: users.length,
    username: username,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "../users/users.html";

  form.reset();
});

document.addEventListener("DOMContentLoaded",()=>{if(!localStorage.getItem("isAdmin")){
  window.location.href = "../login/login.html";
  return;
}})
