let defaultjobs = [
    {
      jobId: 1,
      title: "Frontend Developer",
      desc: "Looking for a skilled frontend developer to join our team.",
      type: "React.js",
      salary: 60000,
      location: "Remote",
      company: "Google",
      appliedBy: [{id: 1, username: "dp", password: "dp",email:"dp@gmail.com",pdf:"resume.path"},{id: 2, username: "vp", password: "dp",email:"dp@gmail.com",pdf:"resume.path"}, {id: 3, username: "jp", password: "dp",email:"dp@gmail.com",pdf:"resume.path"}],
      selected:[{id: 4, username: "kp", password: "dp",email:"dp@gmail.com",pdf:"resume.path"},{id: 5, username: "rp", password: "dp",email:"dp@gmail.com",pdf:"resume.path"},{id: 6, username: "np", password: "dp",email:"dp@gmail.com",pdf:"resume.path"},]
    },
    {
      jobId: 2,
      title: "Backend Engineer",
      desc: "Seeking an experienced backend engineer proficient in Node.js.",
      type: "Node.js",
      salary: 70000,
      location: "San Francisco, CA",
      company: "Bacancy",
      appliedBy: [],
    },
    {
      jobId: 3,
      title: "Data Analyst",
      desc: "Analyzing data to provide insights and support decision-making processes.",
      type: "Python",
      salary: 15000,
      location: "New York, NY",
      company: "Google",
      appliedBy: [],
    },
    {
      jobId: 4,
      title: "UI/UX Designer",
      desc: "Creating intuitive and visually appealing user interfaces.",
      type: "Python",
      salary: 25000,
      location: "Remote",
      company: "Bacancy",
      appliedBy: [],
    },
    {
      jobId: 5,
      title: "Full Stack Developer",
      desc: "Developing both frontend and backend solutions.",
      type: "Java",
      salary: 50000,
      location: "Austin, TX",
      company: "Google",
      appliedBy: [],
    },
    {
      jobId: 6,
      title: "Software Engineer",
      desc: "Designing, developing, and maintaining software applications.",
      type: "Java",
      salary: 37000,
      location: "Boston, MA",
      company: "SoftCo",
      appliedBy: [],
    },
    {
      jobId: 7,
      title: "DevOps Engineer",
      desc: "Implementing and managing automation processes for software development.",
      type: "Docker",
      salary: 80000,
      location: "Seattle, WA",
      company: "Microsoft",
      appliedBy: [],
    },
    {
      jobId: 8,
      title: "Product Manager",
      desc: "Leading the product development lifecycle and prioritizing features.",
      type: "Docker",
      salary: 90000,
      location: "San Jose, CA",
      company: "Microsoft",
      appliedBy: [],
    },
    {
      jobId: 9,
      title: "Quality Assurance Tester",
      desc: "Ensuring the quality and reliability of software applications.",
      type: "React.js",
      salary: 80000,
      location: "Chicago, IL",
      company: "Bacancy",
      appliedBy: [],
    },
    {
      jobId: 10,
      title: "Technical Writer",
      desc: "Creating clear and concise documentation for software products.",
      type: "Node.js",
      salary: 45000,
      location: "Denver, CO",
      company: "Microsoft",
      appliedBy: [],
    },
  ];
  // localStorage.setItem("jobs", JSON.stringify(defaultjobs));


  const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "../../login/login.html";
    return;
  };

  ////=============================================================redirects to user Crud page
function redirectToUsersPage() {
  window.location.href = "./users/users.html";
  return;
}

  ////=============================================================this function redirects to add job page 
function toadminpage() {window.location.href='../admin.html'}

////=============================================================this function creates the new job fro admin to show
function addjob(value,event){
    event.preventDefault();
      //job title ,type,and decription is set here 
      let title = document.getElementById("j-title")?.value;
      let type = document.getElementById("j-type")?.value;
      let description = document.getElementById("j-desc")?.value;
      let salary = document.getElementById("j-salary")?.value;
      let location = document.getElementById("j-location")?.value;
      let company = document.getElementById("j-company")?.value;

 //jobs are being copied in local storage in jobs array
 let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
 console.log(type);
 console.log(description);
 console.log(title);
 console.log(salary);
 console.log(location);
 console.log(company);

    if(value){
//this block executes when job is getting updated
     value = parseInt(value,10);
        const jobToUpdate = jobs.find((job) => job.jobId === value);
        console.log(jobToUpdate)

       jobToUpdate.title = title;
       jobToUpdate.desc = description;
       jobToUpdate.type = type;
       jobToUpdate.salary = salary;
       jobToUpdate.location = location;
       jobToUpdate.company = company;
       
       console.log(jobToUpdate);
       console.log(jobs);
    }

    else{
      //this block executes when new job is getting created
        //new job is created by this object in jobs array
        let uniqueId = parseInt((jobs[jobs.length-1]?.jobId || 0) + 1);

        
    const newjob = {
            jobId : uniqueId,
            title : title,
            desc : description,
            type : type,
            salary: salary,
            location: location,
            company: company,
            appliedBy:[],
            selected:[],         
 }

             jobs.push(newjob);
           //jobs array is updated with new jon in localstorage       
}
           
    localStorage.setItem("jobs",JSON.stringify(jobs));
      //after adding or updating job page automatically redirects to admin.html  
    toadminpage()
}


document.addEventListener("DOMContentLoaded",()=>{
  if(!localStorage.getItem("isAdmin")){
    logout();
    return;
  }
  

    const addjobform = document.getElementById("addjob-form");
       
    //this statements catches the jobobject sent through urlparams
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

//this defines if update button was clicked then urlparams.size will be nonzero 
if(urlParams.size){
    
    let job = urlParams.get('job');
console.log(job);

job = JSON.parse(job);
console.log(job);
    
    // Populate form fields with the retrieved values
    document.getElementById('j-title').value = job.title || '';
    document.getElementById('j-desc').value = job.desc || '';
    document.getElementById('j-type').value = job.type || '';
    document.getElementById('j-salary').value = job.salary || '';
    document.getElementById('j-location').value = job.location || '';
    document.getElementById('j-company').value = job.company || '';

    addjobform.addEventListener("submit",(event)=>{
        
        event.preventDefault();
        
        addjob(job.jobId,event); 
        
        addjobform.reset();
    });}
    
    //this defines if add job is clicked and new job supposed to be added or urlparams does not contain any thing 
else{
    addjobform.addEventListener("submit",(event)=>{
        
        event.preventDefault();
        
        addjob(0,event); 
        
        addjobform.reset();
    });}});

