const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "../../login/login.html";
    return;
  };
  
////=============================================================this function deltes the candidate data from selectedapplicationpage and selected list
function deletecandidate(candidateId,jobid){

// Ensure jobid is defined and has a valid value
    console.log(candidateId);
    console.log(jobid); 

    let jobsarray = JSON.parse(localStorage.getItem('jobs'));
    
    //finds the job for given job id to match with candidateId
    const job = jobsarray.find((job) => job.jobId === jobid);
    const candidatelist = job.selected;

//gives the index of candidateId in candidatelist which is derived from selected array
const candidateindex = candidatelist.findIndex((candidate) => candidate.id === candidateId);

//if candidate was in selectedarry then it is removed from appliedBy list to selected list 
    candidatelist.splice(candidateindex,1);

    job.selected = candidatelist;

    //jobs in localstorage is updated 
localStorage.setItem("jobs",JSON.stringify(jobsarray));

  location.reload();
}

////=============================================================redirects to addjob.html page
function toaddjob () {
    window.location.href="../addjob/addjob.html"
}

////=============================================================redirects to admin.html page 
function topostedjob () {
    window.location.href="../admin.html"
}

////=============================================================redirects to user Crud page
function redirectToUsersPage() {
    window.location.href = "./users/users.html";
    return;
  }
  

////=============================================================defines the structure of the page using jobs array from localstorage
function postedjob(candidateslist,jobid){
    
    let allJobsList = document.querySelector("#all-jobs-list");
    allJobsList.innerHTML="";

        // //=============================================================Displaying emoloyeeCard one by one
  const displayJobs = (list) => {
    let emoloyeeCard = document.createElement("div");
    emoloyeeCard.classList.add("job-card");

    emoloyeeCard.innerHTML = `
    <h1>${list.username}</h1>
    <p><span>Email: </span>${list.email}</p>
    <p><span>Resume: </span>${list.pdfFile.name}</p>
`;

        // // creating button to delete the use application from selected list
        let dltbutton = document.createElement("button");
        dltbutton.textContent = "delete";
        dltbutton.id = "dltbtn";
        dltbutton.onclick = ()=>{
            console.log(list.id)
            deletecandidate(list.id,jobid);
        console.log("delete is clicked")
        }

         // // creating button to see resume of candidate
         let resumebtn = document.createElement("button");
         resumebtn.textContent = "resume";
         resumebtn.id = "resumebtn";
         resumebtn.onclick = ()=>{ 
            // updatejob(job.jobId);
            window.open("./resume_vatsalbhatti (2).pdf",'_blank')
        console.log("update is clicked")
        }
  
        emoloyeeCard.appendChild(dltbutton);
        emoloyeeCard.appendChild(resumebtn);
        
        // adding job card to DOM
        allJobsList.appendChild(emoloyeeCard);
    }
    // displaying employeecard when admin visits the selectedapplication.html page
    let jobsarray = JSON.parse(localStorage.getItem('jobs'));
   
    const job = jobsarray.find((job) => job.jobId === jobid);
    const candidatelisttoprint = job.selected;
    if(job.selected.length === 0){
        allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
    }
    console.log(candidateslist)
    candidatelisttoprint.forEach((candidate) => {
        console.log(candidate
            )
        displayJobs(candidate);
    });

////=============================================================search functionality 
    document.getElementById("search").addEventListener("input", (event) => {
        if(!localStorage.getItem("isAdmin")){
            window.location.href = "../login/login.html";
            return;
        }

        // taking value from user input 
        let searchQuery = event.target.value.toLowerCase();

        // filtering out jobs
        let updatedcandidates = candidateslist.filter((candidate) => {
            return candidate.username.toLowerCase().includes(searchQuery) || candidate.email.toLowerCase().includes(searchQuery);
        });

        // condition if there is no job for particular search query
        if(updatedcandidates.length === 0){
            allJobsList.innerHTML = "<h1>No Job Found!!</h1>"
            return;
        }

        allJobsList.innerHTML = "";
        updatedcandidates.forEach((candidate) => {
            displayJobs(candidate);
        })  });}


document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("isAdmin")){
        logout();
        return;
      }
      
//this statements retrives the jobobject sent through urlparams
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //this gets the job object passed through url params
let job = urlParams.get("job");

//making job string into json
job = JSON.parse(job);

//getting selected array into candidates
const candidates = job.selected;

//array declared to find candidates to select
let foundcandidates = [];

//looping on candidates to match the candidates between users and selected array from localstorage
candidates.forEach((candidate) => {

    //getting users array from localstorage
   const user= JSON.parse(localStorage.getItem("users"));
 
   //if id in selected array and user array is matched then user data is pushed in foundcandidates array
let applier = user.find((candiDate)=> candiDate.id === candidate.id)  

foundcandidates.push(applier);
});

console.log(foundcandidates);

//found candidates data is sent to display on selectedapplication.html page 
postedjob(foundcandidates,job.jobId);
});