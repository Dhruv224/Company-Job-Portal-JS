//logic for logout button
const logout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "../login/login.html"
    return;
}

function toaddjob(){
    window.location.href='./addjob/addjob.html'
        
}

function deletejob (jobid){
    const jobArray = JSON.parse(localStorage.getItem("jobs"));
    
    console.log("clicked",jobArray);
     jobid = parseInt(jobid,10);

    const jobToDelete = jobArray.find((job) => job.jobId === jobid);
    window.location.reload();
    
 if (jobToDelete) {
    // Perform actions with the found button
    console.log("Button found:", jobToDelete);
    jobArray.splice(jobArray.indexOf(jobToDelete),1);
    console.log(jobArray);
   localStorage.setItem("jobs", JSON.stringify(jobArray));
} else {
    console.log("Button not found");
}


} 

function updatejob (jobid){

    const jobArray = JSON.parse(localStorage.getItem("jobs"));
    jobid = parseInt(jobid, 10);
    const jobToUpdate = jobArray.find((job) => job.jobId === jobid);

    if (jobToUpdate) {
        // Convert the job details to a query string
       
        const queryString = `?job=${encodeURIComponent(JSON.stringify(jobToUpdate))}`;
        // Redirect to addjob.html with the query string
        window.location.href = `./addjob/addjob.html${queryString}`;
    } else {
        console.log("Job not found");
    }


}

//this function shows the already posted job by admin and the home page for admin too
function postedjob(){
    console.log("hello world")
    let allJobsList = document.querySelector("#all-jobs-list");
    allJobsList.innerHTML="";
    
    //this function creates the ui for posted jobs the same function used in candidate page to show the jobs
    const displayJobs = (job) => {
        // creating job title
        let title = document.createElement("h1");
        title.textContent = job.title;
    
        // creating job description
        let desc = document.createElement("p");
        desc.textContent = job.desc;
    
         // creating job description
         let salary = document.createElement("p");
         desc.textContent = job.salary;
     // creating job description
     let location = document.createElement("p");
     desc.textContent = job.location;

   // creating job description
   let companyname = document.createElement("p");
   desc.textContent = job.companyname;

        // creating job type
        let type = document.createElement("h3");
        type.textContent = job.type  ;


    
        // // creating button for Apply
        let button = document.createElement("button");
        button.textContent = "delete";
        button.id = "btn";
        button.onclick = ()=>{deletejob(job.jobId);}

         // // creating button for update
         let uptbutton = document.createElement("button");
         uptbutton.textContent = "update";
         uptbutton.id = "uptbtn";
         uptbutton.onclick = ()=>{ updatejob(job.jobId);}

    
        // creating job card
        let jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.appendChild(title);
        jobCard.appendChild(desc);
        jobCard.appendChild(type);
        jobCard.appendChild(salary);
        jobCard.appendChild(location);
        jobCard.appendChild(companyname);
        jobCard.appendChild(button);
        jobCard.appendChild(uptbutton);
        
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


        
        

}






   

//this function fetchs the addjob.html file to show on admin.html page as react does for components 


        document.addEventListener("DOMContentLoaded", () => {
            // if(!localStorage.getItem("isAdmin")){
            //     window.location.href = "../login/login.html";
            //     return;
            // }
           postedjob();
        //this statement is used to show by default the posted job page on admin screen 
            // loadcontent('./postedjob/postedjob.html', postedjob)  

            
        
        });


        

       


                