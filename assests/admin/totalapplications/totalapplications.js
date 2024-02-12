const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "../../login/login.html";
    return;
  };
  

////=============================================================this function deletes the candidate data from totalapplicationpage and appliedBy list
function deletecandidate(candidateId,jobid){
   
   // Ensure jobid is defined and has a valid value
    console.log(candidateId);
    console.log(jobid); 

    let jobsarray = JSON.parse(localStorage.getItem('jobs'));
   
    //finds the job for given job id to match with candidateId
    const job = jobsarray.find((job) => job.jobId === jobid);
    const candidatelist = job.appliedBy;

//gives the index of candidateId in candidatelist which is derived from appliedBy array
const candidateindex = candidatelist.findIndex((candidate) => candidate.id === candidateId);

//if candidate is found then it is removed from appliedBy list 
    candidatelist.splice(candidateindex,1);

    job.appliedBy = candidatelist;

     //jobs in localstorage is updated
    localStorage.setItem("jobs",JSON.stringify(jobsarray));

  location.reload();
}
//=============================================================this function selects the candidate data from totalapplicationpage and appliedBy list to send to selectedapplications page
function selectcandidate(candidateId,jobid){

    // Ensure jobid is defined and has a valid value
    console.log(candidateId);
    console.log(jobid); 

    let jobsarray = JSON.parse(localStorage.getItem('jobs'));
    
    //finds the job for given job id to match with candidateId from appliedBy array
    const job = jobsarray.find((job) => job.jobId === jobid);
    const candidatelist = job.appliedBy;

//gives the index of candidateId in candidatelist which is derived from appliedBy array
const candidateindex = candidatelist.findIndex((candidate) => candidate.id === candidateId);

//if candidate was in selectedarry then it is removed from appliedBy list to selected list 
job.selected.push(candidatelist[candidateindex]);

    // candidatelist.splice(candidateindex,1);
   
    job.appliedBy = candidatelist;
   
    //jobs in localstorage is updated 
 localStorage.setItem("jobs",JSON.stringify(jobsarray));

  location.reload();
}

////=============================================================redirects to addjob.html page
function toaddjob () {
    window.location.href="../addjob/addjob.html"
}

//=============================================================redirects to admin.html
function topostedjob () {
    window.location.href="../admin.html"
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

      // // creating button to delete the use application from appliedBy list
      let dltbutton = document.createElement("button");
        dltbutton.textContent = "delete";
        dltbutton.id = "dltbtn";
        dltbutton.onclick = ()=>{
            console.log(list.id)
            deletecandidate(list.id,jobid);
        console.log("delete is clicked")
        }


         // // creating button to select the user for given jobId
         let selectbtn = document.createElement("button");
         selectbtn.textContent = "select";
         selectbtn.id = "selectbtn";
         selectbtn.onclick = ()=>{ 
            selectcandidate(list.id,jobid);
        }

        emoloyeeCard.appendChild(dltbutton);
        emoloyeeCard.appendChild(selectbtn);
     
        // adding emoloyeeCard to DOM
        allJobsList.appendChild(emoloyeeCard);
    }

    // displaying emoloyeeCard when admin visits the totalapplication.html page
    let jobsarray = JSON.parse(localStorage.getItem('jobs'));
   
    
    const job = jobsarray.find((job) => job.jobId === jobid);
    const candidatelisttoprint = job.appliedBy;
    if(job.appliedBy.length === 0){
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
        })});}

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

//getting appliedBy array into candidates
const candidates = job.appliedBy;

//array declared to find candidates from appliedBy
let foundcandidates = [];

//looping on candidates to match the candidates between users and appliedBy array from localstorage
candidates.forEach((candidate) => {
   
    //getting users array from localstorage
   const user= JSON.parse(localStorage.getItem("users"));
  
   //if id in selected array and user array is matched then user data is pushed in foundcandidates array
let applier = user.find((candiDate)=> candiDate.id === candidate.id)  

foundcandidates.push(applier);
});

console.log(foundcandidates);

////=============================================================found candidates data is sent to display on selectedapplication.html page
postedjob(foundcandidates,job.jobId);
});