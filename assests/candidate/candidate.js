let jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        desc: "Looking for a skilled frontend developer to join our team.",
        type: "React.js",
        appliedBy: [1, 2, 3]
    },
    {
        id: 2,
        title: "Backend Engineer",
        desc: "Seeking an experienced backend engineer proficient in Node.js.",
        type: "Node.js",
        appliedBy: [104, 105]
    },
    {
        id: 3,
        title: "Data Analyst",
        desc: "Analyzing data to provide insights and support decision-making processes.",
        type: "Python",
        appliedBy: [1, 107, 108]
    },
    {
        id: 4,
        title: "UI/UX Designer",
        desc: "Creating intuitive and visually appealing user interfaces.",
        type: "Figma",
        appliedBy: [109, 110]
    },
    {
        id: 5,
        title: "Full Stack Developer",
        desc: "Developing both frontend and backend solutions.",
        type: "JavaScript",
        appliedBy: [111, 1, 113]
    },
    {
        id: 6,
        title: "Software Engineer",
        desc: "Designing, developing, and maintaining software applications.",
        type: "Java",
        appliedBy: [114, 115]
    },
    {
        id: 7,
        title: "DevOps Engineer",
        desc: "Implementing and managing automation processes for software development.",
        type: "Docker",
        appliedBy: [116]
    },
    {
        id: 8,
        title: "Product Manager",
        desc: "Leading the product development lifecycle and prioritizing features.",
        type: "Agile",
        appliedBy: [1, 118]
    },
    {
        id: 9,
        title: "Quality Assurance Tester",
        desc: "Ensuring the quality and reliability of software applications.",
        type: "Selenium",
        appliedBy: [119, 120, 121]
    },
    {
        id: 10,
        title: "Technical Writer",
        desc: "Creating clear and concise documentation for software products.",
        type: "Markdown",
        appliedBy: [122]
    }
];
localStorage.setItem("jobs", JSON.stringify(jobs));

document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("isAuthenticated")){
        window.location.href = "../login/login.html";
        return;
    }

    let allJobsList = document.getElementById("all-jobs-list");

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
        button.textContent = "Apply";
        button.id = "btn";

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
        jobs.forEach((job) => {
            displayJobs(job);
        });
    })

    document.getElementById("applidJobs").addEventListener("click", () => {
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        let userId = JSON.parse(localStorage.getItem("isAuthenticated")).id || null;

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
    })
});