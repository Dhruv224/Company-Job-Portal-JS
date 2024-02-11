document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    if(!localStorage.getItem("isAdmin")){
        window.location.href = "../../login/login.html";
        return;
    }else{
        document.getElementsByClassName("title")[0].innerHTML = `Welcome, Admin`;
    }

    let allUsersList = document.getElementById("all-users-list");
    let userTable = document.getElementById("user-table");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    if(users.legth===0){
        allUsersList.innerHTML = "<h2>No user Found</h2>";
    }

    const deleteUser = (event) => {
        let userId = parseInt(event.target.id);

        let updatedUsers = users.filter((user) => {
            return user.id !== userId;
        });

        let updatedJobs = jobs.filter((job) => {
            if(job.appliedBy.length > 0){
                let updatedAppliedBy = job.appliedBy.filter((currUser) => {
                    return currUser.id !== userId;
                })
                job.appliedBy = updatedAppliedBy;
            }

            return job;
        })

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));

        window.location.reload();
    }

    const updateUser = (event) => {
        const allInps = document.querySelectorAll("input");
        let currInp = null;
        allInps.forEach((inp) => {
            if(inp.id === event.target.id){
                currInp = inp;
            }
        })

        let btn = event.target;
        if(btn.textContent === "Update"){
            btn.textContent = "Done";
            currInp.readOnly = false;
            currInp.style.outline = "2px solid black";
            currInp.focus();
            currInp.setSelectionRange(currInp.value.length, currInp.value.length);
        }
        else{
            let userExist = users.some((currUser) => currUser.username === currInp.value);
            if(userExist){
                alert("user already exsmksm");
                currInp.focus();
                return;
            }
            
            let updatedUsers = users.map((currUser) => {
                if(currUser.id === Number(btn.id)){
                    currUser.username = currInp.value;
                }
                return currUser;
            });

            let updatedJobs = jobs.map((job) => {
                if(job.appliedBy.length > 0){
                    let updatedAppliedBy = job.appliedBy.map((currUser) => {
                        if(currUser.id === Number(btn.id)){
                            currUser.username = currInp.value;
                        }
                        return currUser;
                    })

                    job.appliedBy = updatedAppliedBy;
                }

                return job;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.setItem("jobs", JSON.stringify(updatedJobs));

            btn.textContent = "Update";
            currInp.style.outline = "none";
            currInp.readOnly = true;   
        }
    }

    const displayUser = (user) => {
        console.log(user)
        let tr = document.createElement("tr");
        if (user.appliedJobs.length > 0) {
            tr.innerHTML = `
                <td rowspan="${user.appliedJobs.length}">${user.id}</td>
                <td rowspan="${user.appliedJobs.length}"><input type="text" readonly id="${user.id}" value="${user.username}" /></td>
                <td rowspan="${user.appliedJobs.length}">${user.appliedJobs.length > 0 ? "Yes" : "No"}</td>
                <td>${user.appliedJobs[0].title}</td>
                <td>${user.appliedJobs[0].type}</td>
            `;

            let td2 = document.createElement("td");
            td2.setAttribute("rowspan", user.appliedJobs.length);
            td2.innerHTML = `<button class="btn updateBtn" id=${user.id}>Update</button>`;
            td2.addEventListener("click", updateUser);
            tr.appendChild(td2);
            userTable.appendChild(tr);

            let td = document.createElement("td");
            td.setAttribute("rowspan", user.appliedJobs.length);
            td.innerHTML = `<button class="btn" id=${user.id}>Delete</button>`;
            td.addEventListener("click", deleteUser);
            tr.appendChild(td);
            userTable.appendChild(tr);
        
            for (let i = 1; i < user.appliedJobs.length; i++) {
                let trInner = document.createElement("tr");
                trInner.innerHTML = `
                    <td>${user.appliedJobs[i].title}</td>
                    <td>${user.appliedJobs[i].type}</td>
                `;
                userTable.appendChild(trInner);
            }
        } else {
            tr.innerHTML = `
                <td>${user.id}</td>
                <td><input type="text" readonly id="${user.id}" value="${user.username}" /></td>
                <td>No</td>
                <td> -- </td>
                <td> -- </td>
            `;
            let td2 = document.createElement("td");
            td2.innerHTML = `<button class="btn updateBtn" id=${user.id}>Update</button>`;
            td2.addEventListener("click", updateUser);
            tr.appendChild(td2);
            userTable.appendChild(tr);

            let td = document.createElement("td");
            td.innerHTML = `<button class="btn" id=${user.id}>Delete</button>`;
            td.addEventListener("click", deleteUser);
            tr.appendChild(td);
            userTable.appendChild(tr);
        }
    }

    let userDetail = [];

    users.forEach((user) => {
        let newUser = {id:user.id, username: user.username, appliedJobs: []};
        let updatedJobs = jobs.filter((job) => {
            let isUserExist = job.appliedBy.findIndex((currUser) => currUser.id === user.id);
            if(isUserExist !== -1){
                return job;
            }
        });
        newUser.appliedJobs.push(...updatedJobs);
        userDetail.push(newUser);
    });

    userDetail?.forEach((user) => {
        displayUser(user);
    })
})