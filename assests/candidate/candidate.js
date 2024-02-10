let jobs = [
  {
    jobId: 1,
    title: "Frontend Developer",
    desc: "Looking for a skilled frontend developer to join our team.",
    type: "React.js",
    salary: 60000,
    location: "Remote",
    companyName: "Google",
    appliedBy: [],
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

  let allJobsList = document.getElementById("all-jobs-list");
  let jobId = null;
  let isAppliedJob = false;
  let languageType = "All";
  let minSalary = jobs.reduce((min, job) => {
    return job.salary < min ? job.salary : min;
  }, Infinity);
  let maxSalary = jobs.reduce((max, job) => {
    return job.salary > max ? job.salary : max;
  }, -Infinity);
  let salaryVal = "All";

  const applyBtn = (event) => {
    jobId = event.target.id;
    let popUp = document.getElementById("pop-up");
    popUp.style.display = "block";
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";

    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};
    document.getElementById("username").value = user.username;
  };

  const withdrawBtn = (event) => {
    jobId = event.target.id;

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

    let updatedJobs = jobs.map((job) => {
      let updatedUsers = [];
      if (Number(jobId) === Number(job.jobId)) {
        updatedUsers = job.appliedBy.filter((currUser) => {
          return currUser.id !== user.id;
        });
        job.appliedBy = updatedUsers;
      }

      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    allJobsList.innerHTML = "";
    updatedJobs.forEach((job) => {
      displayJobs(job);
    });
  };

  const displayJobs = (job) => {
    let title = document.createElement("h1");
    title.innerHTML = job.title;

    let desc = document.createElement("p");
    desc.innerHTML = "<span>Desc: </span>" + job.type + job.desc;

    let type = document.createElement("p");
    type.innerHTML = "<span>Type: </span>" + job.type;

    let salary = document.createElement("p");
    salary.innerHTML = "<span>Salary: </span>Rs." + job.salary;

    let location = document.createElement("p");
    location.innerHTML = "<span>Location: </span>" + job.location;

    let companyName = document.createElement("p");
    companyName.innerHTML = "<span>Company: </span>" + job.companyName;

    let button = document.createElement("button");

    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};
    let userApplidOrNot = job?.appliedBy?.findIndex((currUser) => {
      return currUser.id === user?.id;
    });

    button.classList.add("btn");
    button.id = job.jobId;

    let dltBtn = document.createElement("button");

    if (userApplidOrNot !== -1) {
      button.style.display = "none";
      // button.textContent = "Applied";
      // button.disabled = true;
      // button.classList.add("disabled");

      dltBtn.textContent = "withdraw";
      dltBtn.classList.add("btn");
      dltBtn.classList.add("withdraw");
      dltBtn.id = job.jobId;
    } else {
      button.textContent = "Apply";
    }

    // adding eventListener on apply and withdraw button
    button.addEventListener("click", applyBtn);
    dltBtn.addEventListener("click", withdrawBtn);

    // creating job card
    let jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.appendChild(title);
    jobCard.appendChild(desc);
    jobCard.appendChild(type);
    jobCard.appendChild(salary);
    jobCard.appendChild(location);
    jobCard.appendChild(companyName);

    jobCard.appendChild(button);
    jobCard.appendChild(dltBtn);

    // adding job card to DOM
    allJobsList.appendChild(jobCard);
  };

  // displaying jobs when user visits the candidate page
  jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  console.log(jobs);
  let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

  document.getElementsByClassName("title")[0].innerHTML = `Welcome, <span>${
    user.username.charAt(0).toUpperCase() + user.username.slice(1)
  }</span> `;
  if (jobs.length === 0) {
    allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
  }
  jobs.forEach((job) => {
    displayJobs(job);
  });

  let langDropDown = document.getElementById("lang-drop-down");
  const languageTypeAddToDropDown = (languageType) => {
    let option = document.createElement("option");
    option.value = languageType;
    option.textContent = languageType;

    langDropDown.appendChild(option);
  };

  let salaryDropDown = document.getElementById("salary-drop-down");
  let salaryIncrement = (maxSalary - minSalary) / 5;
  for (let i = 0; i < 5; i++) {
    let option = document.createElement("option");
    let min = minSalary + i * salaryIncrement;
    let max = min + salaryIncrement;
    option.textContent = `Rs. ${min} - Rs. ${max}`;
    option.value = `${min},${max}`;
    salaryDropDown.appendChild(option);
  }

  const handleSearch = (event) => {
    salaryVal = salaryVal.toString();
    salaryVal = salaryVal.split(",");
    let currMinSalary = salaryVal[0];
    let currMaxSalary = salaryVal[1];
    if (isAppliedJob) {
      // taking value from user input
      let searchQuery = event?.target?.value.toLowerCase() || "";

      // getting all the jobs
      let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
      let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

      // filtering out jobs
      let mapArr = jobs.filter((job) => {
        let appliedJobOrNot = job.appliedBy.findIndex(
          (currUser) => currUser.id === user?.id
        );
        return appliedJobOrNot !== -1;
      });

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

      // condition if there is no job for particular search query
      if (updatedJobs.length === 0) {
        allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
        return;
      }

      allJobsList.innerHTML = "";
      updatedJobs.forEach((job) => {
        displayJobs(job);
      });

      return;
    }
    // taking value from user input
    let searchQuery = event?.target?.value.toLowerCase() || "";

    // getting all the jobs
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // filtering out jobs
    let updatedJobs = jobs.filter((job) => {
      return (
        (currMinSalary === "All" ||
          (job.salary >= currMinSalary && job.salary <= currMaxSalary)) &&
        (languageType === "All" || job.type === languageType) &&
        (job.title.toLowerCase().includes(searchQuery) ||
          job.companyName.toLowerCase().includes(searchQuery) ||
          job.type.toLowerCase().includes(searchQuery))
      );
    });

    // condition if there is no job for particular search query
    if (updatedJobs.length === 0) {
      allJobsList.innerHTML = "<h1>No Job Found!!</h1>";
      return;
    }

    allJobsList.innerHTML = "";
    updatedJobs.forEach((job) => {
      displayJobs(job);
    });
  };

  [
    ...new Set(
      jobs.map((job) => {
        return job.type;
      })
    ),
  ].forEach((languageType) => {
    languageTypeAddToDropDown(languageType);
  });

  langDropDown.addEventListener("change", (event) => {
    languageType = event.target.value;
    handleSearch();
  });

  salaryDropDown.addEventListener("change", (event) => {
    salaryVal = event.target.value;
    console.log(typeof salaryVal);

    handleSearch();
  });

  document.getElementById("search").addEventListener("input", handleSearch);

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

  document.getElementById("applidJobs").addEventListener("click", () => {
    isAppliedJob = true;
    // getting all the jobs
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // getting userId
    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};

    // filtering out jobs based on appliedBy field in job object
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

    allJobsList.innerHTML = "";

    updatedJobs.forEach((job) => {
      displayJobs(job);
    });
  });

  document.getElementById("pop-up").addEventListener("click", (event) => {
    if (!event.target.closest("#pop-up-form")) {
      let popUp = document.getElementById("pop-up");
      popUp.style.display = "none";
    }
  });

  document.getElementById("pop-up-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let pdfFile = document.getElementById("pdf-file").files[0];
    let fileObject = {
      name: pdfFile.name,
      size: pdfFile.size,
      type: pdfFile.type,
      lastModified: pdfFile.lastModified,
      data: pdfFile,
    };

    // console.log(fileObject)
    // let blob = new Blob([fileObject.data], { type: fileObject.type });
    // let fileURL = URL.createObjectURL(blob);
    // console.log("File URL:", fileURL);

    if (
      username.value.toString().trim() === "" ||
      email.value.toString().trim() === ""
    ) {
      alert("Enter username and email");
      return;
    }

    let user = JSON.parse(localStorage.getItem("isAuthenticated")) || {};
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

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

      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    window.location.href = "candidate.html";
    return;
  });
});
