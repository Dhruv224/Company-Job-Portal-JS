//logic for logout button
////=============================================================logic for logout button
const logout = () => {
  localStorage.removeItem("isAdmin");
  window.location.href = "../../login/login.html";
  return;
};

//redirects to addjob page
////=============================================================redirects to addjob page
function toaddjob() {
  window.location.href = "./addjob/addjob.html";
}

////=============================================================redirects to user Crud page
function redirectToUsersPage() {
  window.location.href = "./users/users.html";
  return;
}

//this function deletes the postedjob
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
  } else {
    console.log("Button not found");
  }
  window.location.reload();
}

//this function defines the updation of posted job
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
    const queryString = `?job=${encodeURIComponent(
      JSON.stringify(jobToUpdate)
    )}`;
    // Redirect to addjob.html with the query string
    window.location.href = `./addjob/addjob.html${queryString}`;
  } else {
    console.log("Job not found");
  }
}

//thi function defines when the admin wants to see the total applications
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
  } else {
    console.log("Job not found");
  }
}

//thi function defines when the admin wants to see the total applications
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
        const queryString = `?job=${encodeURIComponent(JSON.stringify(jobToSend))}`;

        // Redirect to selectedapplications.html with the query string
        window.location.href = `./selectedapplications/selectedapplications.html${queryString}`;
    } else {
        console.log("Job not found");
    }

}
//this function shows the already posted job by admin and the home page for admin too
////=============================================================this function shows the already posted job by admin and the home page for admin too
function postedjob() {
    let allJobsList = document.querySelector("#all-jobs-list");
    allJobsList.innerHTML = "";

     jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  let langDropDown = document.getElementById("lang-drop-down");
  let salaryDropDown = document.getElementById("salary-drop-down");
  let paginationBtns = document.getElementById("pagination-btns");

  let jobId = null;
  let isAppliedJob = false;
  let languageType = "All";
  let minSalary = jobs.reduce(
    (min, job) => Math.min(min, job.salary),
    Infinity
  );
  let maxSalary = jobs.reduce(
    (max, job) => Math.max(max, job.salary),
    -Infinity
  );
  let salaryVal = "All";
  let currPage = 1;
  let cardPerPage = 3;

  //this function creates the ui for posted jobs the same function used in candidate page to show the jobs

  // Displaying job one by one
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
    <p><span>Company: </span>${job.company}</p>
`;

    // // creating button for delete the job
    let dltbutton = document.createElement("button");
    dltbutton.textContent = "delete";
    dltbutton.id = "dltbtn";
    dltbutton.onclick = () => {
      deletejob(job.jobId);
      console.log("delete is clicked");
    };
    // // creating button for update job
    let uptbutton = document.createElement("button");
    uptbutton.textContent = "update";
    uptbutton.id = "uptbtn";
    uptbutton.onclick = () => {
      updatejob(job.jobId);
      console.log("update is clicked");
    };
    // // creating button for to see total applications of job
    let totalapplications = document.createElement("button");
    totalapplications.textContent = "applications";
    totalapplications.id = "tapp";
    totalapplications.onclick = () => {
      tappfunction(job.jobId);
    };
    // // creating button for to see total selected applications of job
    let selectedapplications = document.createElement("button");
    selectedapplications.textContent = "selected applications";
    selectedapplications.id = "sapp";
    selectedapplications.onclick = () => {
      sappfunction(job.jobId);
    };

    jobCard.appendChild(dltbutton);
    jobCard.appendChild(uptbutton);
    jobCard.appendChild(totalapplications);
    jobCard.appendChild(selectedapplications);

    // adding job card to DOM
    allJobsList.appendChild(jobCard);
  };
  // displaying jobs when user visits the candidate page
  //  jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  // if (jobs.length === 0) {
  //   allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
  // }
  // jobs.forEach((job) => {
  //   displayJobs(job);
  // });

  //=============================================================Pagination
  const pagination = (jobs) => {
    if (jobs.length === 0) {
      allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
      return;
    }
    let numPages = Math.ceil(jobs.length / cardPerPage);

    if (jobs.length > cardPerPage) {
      paginationBtns.style.display = "flex";
    } else {
      paginationBtns.style.display = "none";
    }

    if (jobs.length > cardPerPage) {
      paginationBtns.innerHTML = "";
      for (let i = 1; i <= numPages; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.id = i;
        btn.classList.add("btn");
        btn.addEventListener("click", () => {
          currPage = i;
          pagination(jobs);
        });
        paginationBtns.appendChild(btn);
      }
    }

    allJobsList.innerHTML = "";
    let startInd = (currPage - 1) * cardPerPage;
    let endInd = startInd + cardPerPage;
    let jobCardParPagesArr = jobs.slice(startInd, endInd);
    jobCardParPagesArr.forEach((job) => displayJobs(job));
  };

  //this pagination is used to display jobs at admin.html
  pagination(jobs);
  // Search functionality based on title, company and type of job and filter functionality based on salary and job type
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
    }

    let updatedJobs = mapArr.filter((job) => {
      return (
        (currMinSalary === "All" ||
          (job.salary >= currMinSalary && job.salary <= currMaxSalary)) &&
        (languageType === "All" || job.type === languageType) &&
        (job.title.toLowerCase().includes(searchQuery) ||
          job.company.toLowerCase().includes(searchQuery) ||
          job.type.toLowerCase().includes(searchQuery))
      );
    });

    pagination(updatedJobs);
  };

  document.getElementById("search").addEventListener("input", handleSearch);

  // Event listener on Search input tag

  // adding unique job type in dropdown menu
  [...new Set(jobs.map((job) => job.type))].forEach((languageType) => {
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
    option.textContent = `Rs. ${min.toFixed(2)} - Rs. ${max.toFixed(2)}`;
    option.value = `${min},${max}`;
    salaryDropDown.appendChild(option);
  }
  // Event Listener on salary drop down
  salaryDropDown.addEventListener("change", (event) => {
    salaryVal = event.target.value;
    handleSearch();
  });

  // displaying All jobs when user clicks on AllJobs from navbar
  // //=============================================================displaying All jobs when user clicks on AllJobs from navbar
  
}

////=============================================================this function fetchs the addjob.html file to show on admin.html page as react does for components 
document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("isAdmin")){
        window.location.href = "../login/login.html";
        return;
    }

  //this statement is used to show by default the posted job page on admin screen
  ////=============================================================this statement is used to show by default the posted job page on admin screen
  postedjob();
});
