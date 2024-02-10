let users = [
    {
        id: 0, 
        username: "dp",
        password: "dp",
    },
    {
        id: 2, 
        username: "vp",
        password: "vp",
    },
];
// localStorage.setItem("users", JSON.stringify(users));

    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // getting username and password
        let username = document.getElementById("username")?.value;
        let password = document.getElementById("password")?.value;

        // if admin then redirect to admin page
        if(username === "Admin" && password === "Admin"){
            window.location.href = "../admin/admin.html";
            return;
        }

        // getting all the users from the local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // checking user exists or not
        let userExist = users.find(user => user.username === username && user.password === password);

        if(userExist){
            localStorage.setItem("isAuthenticated", JSON.stringify(userExist));
            window.location.href = "../candidate/candidate.html";
            form.reset();
        }else{
            alert("User not exists. plase register first");
        }
    });