// let users = [
//     {

//         username: "dp",
//         password: "dp",
//        
//     },
//     {

//         username: "vp",
//         password: "vp",
//        
//     },
// ];


const form = document.getElementById("register-form")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // getting the username and password
    let username = document.getElementById("username")?.value;
    let password = document.getElementById("password")?.value;
    let cpassword = document.getElementById("cpassword")?.value;

    // checking password and confirm password
    if (password != cpassword) {
        alert("passwords do not match ");
    }
    else {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let newUser = {
            id: users.length,
            username: username,
            password: password,
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("isAuthenticated", JSON.stringify(newUser));

        form.reset();
    }

});



