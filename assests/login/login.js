// let users = [
//     {
//         id: 1, 
//         username: "dp",
//         password: "dp",
//         isAdmin: false
//     },
//     {
//         id: 2, 
//         username: "vp",
//         password: "vp",
//         isAdmin: false
//     },
// ];
// localStorage.setItem("users", JSON.stringify(users));

document.getElementById("login-form")
    .addEventListener("submit", (event) => {
        event.preventDefault();

        // getting username and password
        let username = document.getElementById("username")?.value;
        let password = document.getElementById("password")?.value;

        // getting all the users from the local storage
        let users = JSON.parse(localStorage.getItem("users"));

        let userExist = users.find(user => user.username === username && user.password === password);
        if(userExist){
            localStorage.setItem("isAuthenticated", "true");

            username.value = "";
            password.value = "";
        }else{
            alert("User not exists. plase register first");
        }
    });