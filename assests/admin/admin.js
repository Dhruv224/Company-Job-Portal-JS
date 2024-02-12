////=============================================================logic for logout button
const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "../login/login.html";
    return;
};

function toaddjob() {
    window.location.href = "./addjob/addjob.html";
}

////=============================================================redirects to addjob page
function toaddjob() {
    window.location.href = './addjob/addjob.html'

}

//////=============================================================redirects to users CRUD opt on admin page 
function redirectToUsersPage() {
    window.location.href = "./users/users.html";
    return;
  }
////=============================================================this function deletes the postedjob
function deletejob(jobid) {

    //jobarray is assigned with jobs array from localstorage
    const jobArray = JSON.parse(localStorage.getItem("jobs"));

    //jobid made integer 
    jobid = parseInt(jobid, 10);

    //finding job with jobId which matches with given jobid as parameter 
    const jobToDelete = jobArray.find((job) => job.jobId === jobid);

    //if job is found then it gets deleted from the jobs array
    if (jobToDelete) {

        // Perform actions with the found button
        jobArray.splice(jobArray.indexOf(jobToDelete), 1);

        //jobs array in localstorage is updated 
        localStorage.setItem("jobs", JSON.stringify(jobArray));
    }

    else {
        console.log("Button not found");
    }

    window.location.reload();
}

////=============================================================this function defines the updation of posted job
function updatejob(jobid) {

    //jobs got from localstorage 
    const jobArray = JSON.parse(localStorage.getItem("jobs"));

    //jobid made integer
    jobid = parseInt(jobid, 10);

    //jobToUpdate is filled with that job wich matches the jobid as parameter and JobId from jobs array 
    const jobToUpdate = jobArray.find((job) => job.jobId === jobid);

    //if jobToUpdate found this block works
    if (jobToUpdate) {

        // Convert the job details to a query string
        const queryString = `?job=${encodeURIComponent(JSON.stringify(jobToUpdate))}`;

        // Redirect to addjob.html with the query string
        window.location.href = `./addjob/addjob.html${queryString}`;
    }

    else {
        console.log("Job not found");
    }
}

////=============================================================this function defines when the admin wants to see the total applications
function tappfunction(jobid) {

    //jobs got from localstorage 
    const jobArray = JSON.parse(localStorage.getItem("jobs"));

    //jobid made integer
    jobid = parseInt(jobid, 10);

    //jobToSend is filled with that job which matches the jobid as parameter and JobId from jobs array 
    const jobToSend = jobArray.find((job) => job.jobId === jobid);

    //if jobToSend found this block works
    if (jobToSend) {

        // Convert the job details to a query string
        console.log(jobToSend);
        const queryString = `?job=${encodeURIComponent(JSON.stringify(jobToSend))}`;

        // Redirect to totalapplications.html with the query string
        window.location.href = `./totalapplications/totalapplications.html${queryString}`;
    }
    else {
        console.log("Job not found");
    }
}

////=============================================================this function defines when the admin wants to see the total applications
function sappfunction(jobid) {

    //jobs got from localstorage 
    const jobArray = JSON.parse(localStorage.getItem("jobs"));

    //jobid made integer
    jobid = parseInt(jobid, 10);

    //jobToSend is filled with that job which matches the jobid as parameter and JobId from jobs array 
    const jobToSend = jobArray.find((job) => job.jobId === jobid);

    //if jobToSend found this block works
    if (jobToSend) {
        // Convert the job details to a query string
        console.log(jobToSend);
        const queryString = `?job=${encodeURIComponent(JSON.stringify(jobToSend))}`;

        // Redirect to selectedapplications.html with the query string
        window.location.href = `./selectedapplications/selectedapplications.html${queryString}`;
    } else {
        console.log("Job not found");
    }

}
////=============================================================this function shows the already posted job by admin and the home page for admin too
function postedjob() {
    console.log("hello world")
    let allJobsList = document.querySelector("#all-jobs-list");
    allJobsList.innerHTML = "";

    //this function creates the ui for posted jobs the same function used in candidate page to show the jobs


    ////=============================================================Displaying job one by one
    const displayJobs = (job) => {
        let jobCard = document.createElement("div");
        jobCard.classList.add("job-card");

        jobCard.innerHTML = `
    <h1>${job.title}</h1>
    <p><span>Desc: </span>${job.type}${job.desc}</p>
    <p><span>Type: </span>${job.type}</p>
    <p><span>Salary: </span>Rs.${job.salary}</p>
    <p><span>Location: </span>${job.location}</p>
    <p><span>Company: </span>${job.companyName}</p>
`;


        // // creating button for delete the job
        let button = document.createElement("button");
        button.textContent = "delete";
        button.id = "btn";
        button.onclick = () => {
            deletejob(job.jobId);
            console.log("delete is clicked")
        }

        // // creating button for update job
        let uptbutton = document.createElement("button");
        uptbutton.textContent = "update";
        uptbutton.id = "uptbtn";
        uptbutton.onclick = () => {
            updatejob(job.jobId);
            console.log("update is clicked")
        }

        // // creating button for to see total applications of job
        let totalapplications = document.createElement("button");
        totalapplications.textContent = "applications";
        totalapplications.id = "tapp";
        totalapplications.onclick = () => {
            tappfunction(job.jobId);
        }

        // // creating button for to see total selected applications of job
        let selectedapplications = document.createElement("button");
        selectedapplications.textContent = "selected applications";
        selectedapplications.id = "sapp";
        selectedapplications.onclick = () => {
            sappfunction(job.jobId);
        }

        jobCard.appendChild(button);
        jobCard.appendChild(uptbutton);
        jobCard.appendChild(totalapplications);
        jobCard.appendChild(selectedapplications);

        // adding job card to DOM
        allJobsList.appendChild(jobCard);
    }
    // displaying jobs when user visits the candidate page
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // filtering out jobs
    let updatedJobs = jobs.filter((job) => {
        return (
            job.title.toLowerCase().includes(searchQuery) ||
            job.type.toLowerCase().includes(searchQuery)
        );
    });

    // condition if there is no job for particular search query
    if (updatedJobs.length === 0) {
        allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
        return;
    }

    jobs.forEach((job) => {
        displayJobs(job);
    });

    ////=============================================================Search functionality based on title, company and type of job and filter functionality based on salary and job type
    const handleSearch = (event) => {
        salaryVal = salaryVal.toString().split(",");
        let currMinSalary = salaryVal[0];
        let currMaxSalary = salaryVal[1];

        let searchQuery = event?.target?.value.toLowerCase() || "";
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

        let mapArr = jobs;

        if (isAppliedJob) {
            mapArr = jobs.filter((job) => {
                let appliedJobOrNot = job.appliedBy.findIndex(
                    (currUser) => currUser.id === user?.id
                );
                return appliedJobOrNot !== -1;
            });
        };

        let updatedJobs = mapArr.filter((job) => {
            return (
                (currMinSalary === "All" ||
                    (job.salary >= currMinSalary && job.salary <= currMaxSalary)) &&
                (languageType === "All" || job.type === languageType) &&
                (job.title.toLowerCase().includes(searchQuery) ||
                    job.companyName.toLowerCase().includes(searchQuery) ||
                    job.type.toLowerCase().includes(searchQuery))
            );
        });

        if (updatedJobs.length === 0) {
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
            return;
        }

        allJobsList.innerHTML = "";
        updatedJobs.forEach((job) => {
            displayJobs(job);
        });
    }

    let langDropDown = document.getElementById("lang-drop-down");
    let salaryDropDown = document.getElementById("salary-drop-down");
    let jobId = null;
    let isAppliedJob = false;
    let languageType = "All";
    let minSalary = jobs.reduce((min, job) => Math.min(min, job.salary), Infinity);
    let maxSalary = jobs.reduce((max, job) => Math.max(max, job.salary), -Infinity);
    let salaryVal = "All";

    // Event listener on Search input tag
    document.getElementById("search").addEventListener("input", handleSearch);

    // adding unique job type in dropdown menu
    [...new Set(jobs.map(job => job.type))].forEach((languageType) => {
        let option = document.createElement("option");
        option.value = languageType;
        option.textContent = languageType;
        langDropDown.appendChild(option);
    });

    // Event Listener on job type drop down
    langDropDown.addEventListener("change", (event) => {
        languageType = event.target.value;
        handleSearch();
    });

    // adding salary range in salary dropdown menu
    for (let i = 0; i < 5; i++) {
        let salaryIncrement = (maxSalary - minSalary) / 5;
        let option = document.createElement("option");
        let min = minSalary + i * salaryIncrement;
        let max = min + salaryIncrement;
        option.textContent = `Rs. ${min} - Rs. ${max}`;
        option.value = `${min},${max}`;
        salaryDropDown.appendChild(option);
    }

    // Event Listener on salary drop down
    salaryDropDown.addEventListener("change", (event) => {
        salaryVal = event.target.value;
        handleSearch();
    });

    // //=============================================================displaying All jobs when user clicks on AllJobs from navbar
    document.getElementById("allJobs").addEventListener("click", () => {
        isAppliedJob = false;
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        if (jobs.length === 0) {
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
        }
        allJobsList.innerHTML = "";
        jobs.forEach((job) => {
            displayJobs(job);
        });
    });
}

////=============================================================this function fetchs the addjob.html file to show on admin.html page as react does for components 
document.addEventListener("DOMContentLoaded", () => {
    // if(!localStorage.getItem("isAdmin")){
    //     window.location.href = "../login/login.html";
    //     return;
    // }

    ////=============================================================this statement is used to show by default the posted job page on admin screen
    postedjob();
});








