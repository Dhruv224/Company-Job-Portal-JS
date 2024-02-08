document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("isAuthenticated")){
        window.location.href = "../login/login.html";
        return;
    }

    
});