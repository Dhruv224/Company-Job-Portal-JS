let jobs = [
    {
        jobId: 1,
        title: "Frontend Developer",
        desc: "Looking for a skilled frontend developer to join our team.",
        type: "React.js",
        appliedBy: []
    },
    {
        jobId: 2,
        title: "Backend Engineer",
        desc: "Seeking an experienced backend engineer proficient in Node.js.",
        type: "Node.js",
        appliedBy: []
    },
    {
        jobId: 3,
        title: "Data Analyst",
        desc: "Analyzing data to provjobIde insights and support decision-making processes.",
        type: "Python",
        appliedBy: []
    },
    {
        jobId: 4,
        title: "UI/UX Designer",
        desc: "Creating intuitive and visually appealing user interfaces.",
        type: "Figma",
        appliedBy: []
    },
    {
        jobId: 5,
        title: "Full Stack Developer",
        desc: "Developing both frontend and backend solutions.",
        type: "JavaScript",
        appliedBy: []
    },
    {
        jobId: 6,
        title: "Software Engineer",
        desc: "Designing, developing, and maintaining software applications.",
        type: "Java",
        appliedBy: []
    },
    {
        jobId: 7,
        title: "DevOps Engineer",
        desc: "Implementing and managing automation processes for software development.",
        type: "Docker",
        appliedBy: []
    },
    {
        jobId: 8,
        title: "Product Manager",
        desc: "Leading the product development lifecycle and prioritizing features.",
        type: "Agile",
        appliedBy: []
    },
    {
        jobId: 9,
        title: "Quality Assurance Tester",
        desc: "Ensuring the quality and reliability of software applications.",
        type: "Selenium",
        appliedBy: []
    },
    {
        jobId: 10,
        title: "Technical Writer",
        desc: "Creating clear and concise documentation for software products.",
        type: "Markdown",
        appliedBy: []
    }
];
// localStorage.setItem("jobs", JSON.stringify(jobs));

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    if(!localStorage.getItem("isAuthenticated")){
        window.location.href = "../login/login.html";
        return;
    }

    let allJobsList = document.getElementById("all-jobs-list");
    let jobId = null;

    const applyBtn = (event) => {
        jobId = event.target.id;
        let popUp = document.getElementById("pop-up");
        popUp.style.display = "block";
        document.documentElement.scrollTop = 0;
        document.body.style.overflow = 'hidden';
    }

    const displayJobs = (job) => {
        // creating job title
        let title = document.createElement("h1");
        title.textContent = job.title;

        // creating job description
        let desc = document.createElement("p");
        desc.textContent = job.desc;

        // creating job type
        let type = document.createElement("h3");
        type.textContent = job.type;

        // creating button for Apply
        let button = document.createElement("button");
        // console.log(job.appliedBy);

        let userId = JSON.parse(localStorage.getItem("isAuthenticated")).id || null;
        let userApplidOrNot = job.appliedBy.findIndex((user) => {
            return user.id === userId;
        });

        console.log(userApplidOrNot);

        (userApplidOrNot !== -1) ? button.textContent = "Applied" : button.textContent = "Apply";

        if(button.textContent === "Applied"){
            button.disabled = true
        }

        button.classList.add("btn");
        button.id = job.jobId;

        // adding eventListener on apply button
        button.addEventListener("click", applyBtn);

        // creating job card
        let jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.appendChild(title);
        jobCard.appendChild(desc);
        jobCard.appendChild(type);
        jobCard.appendChild(button);
        
        // adding job card to DOM
        allJobsList.appendChild(jobCard);
    }

    // displaying jobs when user visits the candidate page
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    if(jobs.length === 0){
        allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
    }
    jobs.forEach((job) => {
        displayJobs(job);
    });

    document.getElementById("search").addEventListener("input", (event) => {
        // taking value from user input 
        let searchQuery = event.target.value.toLowerCase();

        // getting all the jobs
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

        // filtering out jobs
        let updatedJobs = jobs.filter((job) => {
            return job.title.toLowerCase().includes(searchQuery) || job.type.toLowerCase().includes(searchQuery);
        });

        // condition if there is no job for particular search query
        if(updatedJobs.length === 0){
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
            return;
        }

        allJobsList.innerHTML = "";
        updatedJobs.forEach((job) => {
            displayJobs(job);
        })
    });

    document.getElementById("allJobs").addEventListener("click", () => {
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        if(jobs.length === 0){
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
        }
        allJobsList.innerHTML = "";
        jobs.forEach((job) => {
            displayJobs(job);
        });
    })

    document.getElementById("applidJobs").addEventListener("click", () => {
        // getting all the jobs
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

        // getting userId 
        let userId = JSON.parse(localStorage.getItem("isAuthenticated")).id || null;

        // filtering out jobs based on appliedBy field in job object
        let updatedJobs = jobs.filter((job) => {
            return job.appliedBy.indexOf(userId) !== -1;
        });

        if(updatedJobs.length === 0){
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
            return;
        }

        allJobsList.innerHTML = "";

        updatedJobs.forEach((job) => {
            displayJobs(job);
        })
    });

    document.getElementById("pop-up-form").addEventListener("submit", (event) => {
        event.preventDefault();

        let username = document.getElementById("username");
        let email = document.getElementById("email");
        let pdfFile = document.getElementById("pdf-file");

        let allowedExtensions = /(\.pdf)$/i;

        if (!allowedExtensions.exec(pdfFile?.value)) {
            alert('Please select a PDF file');
            fileInput.value = '';
            return;
          }

        let userId = JSON.parse(localStorage.getItem("isAuthenticated")).id || null;

        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

        
        let newObj = {
            id: userId,
            username: username.value,
            email: email.value,
            pdfFile: pdfFile.value
        }

        // finding particular job with id to add newObj in appliedBy field
        const jobIndex = jobs.findIndex(job => job.jobId === Number(jobId));

        // updating the job based on the matched id
        let updatedJobs = jobs.map((job) => {
            if(jobIndex !== -1 && job.jobId === Number(jobId) ){
                job.appliedBy.push(newObj);
            }

            return job;
        })

        localStorage.setItem("jobs", JSON.stringify(updatedJobs));

        window.location.href = "candidate.html";
        return;
    });
});