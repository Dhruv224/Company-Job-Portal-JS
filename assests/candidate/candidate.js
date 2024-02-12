let jobs = [
  {
    jobId: 1,
    title: "Frontend Developer",
    desc: "Looking for a skilled frontend developer to join our team.",
    type: "React.js",
    salary: 60000,
    location: "Remote",
    companyName: "Google",
    appliedBy: [{id: 1, username: "dp", password: "dp"},{id: 2, username: "vp", password: "vp"},
    {id: 3, username: "jp", password: "jp"}
  ],
  },
  {
    jobId: 2,
    title: "Backend Engineer",
    desc: "Seeking an experienced backend engineer proficient in Node.js.",
    type: "Node.js",
    salary: 70000,
    location: "San Francisco, CA",
    companyName: "Bacancy",
    appliedBy: [],
  },
  {
    jobId: 3,
    title: "Data Analyst",
    desc: "Analyzing data to provide insights and support decision-making processes.",
    type: "Python",
    salary: 15000,
    location: "New York, NY",
    companyName: "Google",
    appliedBy: [],
  },
  {
    jobId: 4,
    title: "UI/UX Designer",
    desc: "Creating intuitive and visually appealing user interfaces.",
    type: "Python",
    salary: 25000,
    location: "Remote",
    companyName: "Bacancy",
    appliedBy: [],
  },
  {
    jobId: 5,
    title: "Full Stack Developer",
    desc: "Developing both frontend and backend solutions.",
    type: "Java",
    salary: 50000,
    location: "Austin, TX",
    companyName: "Google",
    appliedBy: [],
  },
  {
    jobId: 6,
    title: "Software Engineer",
    desc: "Designing, developing, and maintaining software applications.",
    type: "Java",
    salary: 37000,
    location: "Boston, MA",
    companyName: "SoftCo",
    appliedBy: [],
  },
  {
    jobId: 7,
    title: "DevOps Engineer",
    desc: "Implementing and managing automation processes for software development.",
    type: "Docker",
    salary: 80000,
    location: "Seattle, WA",
    companyName: "Microsoft",
    appliedBy: [],
  },
  {
    jobId: 8,
    title: "Product Manager",
    desc: "Leading the product development lifecycle and prioritizing features.",
    type: "Docker",
    salary: 90000,
    location: "San Jose, CA",
    companyName: "Microsoft",
    appliedBy: [],
  },
  {
    jobId: 9,
    title: "Quality Assurance Tester",
    desc: "Ensuring the quality and reliability of software applications.",
    type: "React.js",
    salary: 80000,
    location: "Chicago, IL",
    companyName: "Bacancy",
    appliedBy: [],
  },
  {
    jobId: 10,
    title: "Technical Writer",
    desc: "Creating clear and concise documentation for software products.",
    type: "Node.js",
    salary: 45000,
    location: "Denver, CO",
    companyName: "Microsoft",
    appliedBy: [],
  },
];

 localStorage.setItem("jobs", JSON.stringify(jobs));

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  if (!localStorage.getItem("isAuthenticated")) {
    window.location.href = "../login/login.html";
    return;
  }

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

  let allJobsList = document.getElementById("all-jobs-list");
  let langDropDown = document.getElementById("lang-drop-down");
  let salaryDropDown = document.getElementById("salary-drop-down");
  let paginationBtns = document.getElementById("pagination-btns");

  let jobId = null;
  let isAppliedJob = false;
  let languageType = "All";
  let minSalary = jobs.reduce((min, job) => Math.min(min, job.salary), Infinity);
  let maxSalary = jobs.reduce((max, job) => Math.max(max, job.salary), -Infinity);
  let salaryVal = "All";
  let currPage = 1;
  let cardPerPage = 3;

  //=============================================================Displaying job one by one
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

    let applyBtn = document.createElement("button");
    applyBtn.textContent = "Apply";
    applyBtn.classList.add("btn");
    applyBtn.id = job.jobId;
    applyBtn.addEventListener("click", applyBtnFunc);
    jobCard.appendChild(applyBtn);

    let dltBtn = document.createElement("button");
    dltBtn.textContent = "withdraw";
    dltBtn.classList.add("btn");
    dltBtn.classList.add("withdraw");
    dltBtn.id = job.jobId;
    dltBtn.addEventListener("click", withdrawBtn);
    jobCard.appendChild(dltBtn);

    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};
    let userApplidOrNot = job?.appliedBy?.findIndex((currUser) => {
      return currUser.id === user?.id;
    });

    if (userApplidOrNot !== -1) {
      applyBtn.style.display = "none";
    } else {
      dltBtn.style.display = "none";
    }

    allJobsList.appendChild(jobCard);
  };

  //=============================================================Pagination
  const pagination = (jobs) => {
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
    let startInd = (currPage-1)*cardPerPage;
    let endInd = startInd + cardPerPage;
    let jobCardParPagesArr = jobs.slice(startInd, endInd);
    jobCardParPagesArr.forEach(job => displayJobs(job));
  }

  //=============================================================Event Listener for click event on Apply button on job card
  const applyBtnFunc = (event) => {
    jobId = event.target.id;
    user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

    document.getElementById("pop-up").style.display = "block";
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";

    document.getElementById("username").value = user.username;
  };

  //=============================================================Event Listener for click event on Withraw button on job card
  const withdrawBtn = (event) => {
    jobId = event.target.id;

    jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

    let updatedJobs = jobs.map((job) => {
      if (Number(jobId) === Number(job.jobId)) {
        job.appliedBy = job.appliedBy.filter((currUser) => {
          return currUser.id !== user.id;
        });
      }
      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    pagination(updatedJobs);
  };

  //=============================================================Search functionality based on title, company and type of job and filter functionality based on salary and job type
  const handleSearch = (event) => {
    currPage = 1;
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

    pagination(updatedJobs);   
}

  //=============================================================Event listener on Search input tag
  document.getElementById("search").addEventListener("input", handleSearch);

  //=============================================================adding unique job type in dropdown menu dynamically
  [...new Set(jobs.map(job => job.type))].forEach((languageType) => {
    let option = document.createElement("option");
    option.value = languageType;
    option.textContent = languageType;

    langDropDown.appendChild(option);
  });

  //=============================================================Event Listener on job type drop down
  langDropDown.addEventListener("change", (event) => {
    languageType = event.target.value;
    handleSearch();
  });

  //=============================================================adding salary range in salary dropdown menu dynamically
  for (let i = 0; i < 5; i++) {
    let salaryIncrement = (maxSalary - minSalary) / 5;
    let option = document.createElement("option");
    let min = minSalary + i * salaryIncrement;
    let max = min + salaryIncrement;
    option.textContent = `Rs. ${min} - Rs. ${max}`;
    option.value = `${min},${max}`;
    salaryDropDown.appendChild(option);
  }

  //=============================================================Event Listener on salary drop down
  salaryDropDown.addEventListener("change", (event) => {
    salaryVal = event.target.value;
    handleSearch();
  });

  //=============================================================displaying All jobs when user clicks on AllJobs from navbar
  document.getElementById("allJobs").addEventListener("click", () => {
    isAppliedJob = false;
    jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    if (jobs.length === 0) {
      allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
    }
    
    pagination(jobs);
  });

  //=============================================================displaying filtered jobs when user clicks on AppliedJobs from navbar
  document.getElementById("applidJobs").addEventListener("click", () => {
    isAppliedJob = true;

    jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

    let updatedJobs = jobs.filter((job) => {
      let exists = job.appliedBy?.findIndex(
        (currUser) => currUser.id === user?.id
      );
      return exists !== -1;
    });

    if (updatedJobs.length === 0) {
      allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
      return;
    }
    
    pagination(updatedJobs);
  });

  //=============================================================handling pop-up menu close function when user clicks ouside the popup menu
  document.getElementById("pop-up").addEventListener("click", (event) => {
    if (!event.target.closest("#pop-up-form")) {
      document.getElementById("pop-up").style.display = "none";
    }
  });

  //=============================================================Handling pop-up form when user clicks on apply button on job card
  document.getElementById("pop-up-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let pdfFile = document.getElementById("pdf-file").files[0];
    if (
      username.value.toString().trim() === "" ||
      email.value.toString().trim() === ""
    ) {
      alert("Enter username and email");
      return;
    }
    
    user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};
    jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    let fileObject = {
      name: pdfFile.name,
      size: pdfFile.size,
      type: pdfFile.type,
      lastModified: pdfFile.lastModified,
      data: pdfFile,
    };

    let newObj = {
      id: user?.id,
      username: username.value,
      email: email.value,
      pdfFile: fileObject,
    };

    // finding particular job with id to add newObj in appliedBy field
    const jobIndex = jobs.findIndex((job) => job.jobId === Number(jobId));

    // updating the job based on the matched id
    let updatedJobs = jobs.map((job) => {
      if (jobIndex !== -1 && job.jobId === Number(jobId)) {
        job.appliedBy.push(newObj);
      }
console.log("it worked");
      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    window.location.href = "candidate.html";
    return;
  });

  //=============================================================displaying Card on Candidate page
  document.getElementsByClassName("title")[0].innerHTML = `Welcome, <span>${user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}</span> `;
  pagination(jobs);
});