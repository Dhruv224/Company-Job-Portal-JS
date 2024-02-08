let users = [
    {
        id: 1, 
        username: "dp",
        password: "dp",
    },
    {
        id: 2, 
        username: "vp",
        password: "vp",
    },
];
localStorage.setItem("users", JSON.stringify(users));

document.getElementById("login-form")
    .addEventListener("submit", (event) => {
        event.preventDefault();

        // getting username and password
        let username = document.getElementById("username")?.value;
        let password = document.getElementById("password")?.value;

        // getting all the users from the local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // checking user exists or not
        let userExist = users.find(user => user.username === username && user.password === password);
        if(userExist){
            localStorage.setItem("isAuthenticated", JSON.stringify(userExist));

            username.value = "";
            password.value = "";

            // window.location.href = "/assests/admin/admin.html";
        }else{
            alert("User not exists. plase register first");
        }
    });