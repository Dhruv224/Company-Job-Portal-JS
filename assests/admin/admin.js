//logic for logout button
// const logout = () => {
//     localStorage.removeItem("isAuthenticated");
//     window.location.href = "../login/login.html"
//     return;
// }

//this function creates the new job fro admin to show
function addjob(){
    // loadcontent('./addjob/addjob.html');
    console.log("callback is called");
    const addjobform = document.getElementById("addjob-form")
    console.log(addjobform);
    addjobform.addEventListener("submit",(event)=>{
        event.preventDefault();

        //job title ,type,and decription is set here 
        let title = document.getElementById("j-title")?.value;
        let type = document.getElementById("j-type")?.value;
        let description = document.getElementById("j-desc")?.value;

        //jobs are being copied in local storage in jobs array
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        console.log(type);
        console.log(description);
        console.log(title);

        //new job is created by this object in jobs array
    const newjob = {
            jobId : jobs.length,
            title : title,
            desc : description,
            type : type,
            appliedby:[],
 }

             jobs.push(newjob);

           //jobs array is updated with new jon in localstorage
            localStorage.setItem("jobs",JSON.stringify(jobs));
            addjobform.reset();
            loadcontent('./postedjob/postedjob.html', postedjob);
 })
}

//this function shows the already posted job by admin and the home page for admin too
function postedjob(){
    
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
    
        // creating job type
        let type = document.createElement("h3");
        type.textContent = job.type;
    
        // // creating button for Apply
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

}

//this function fetchs the addjob.html file to show on admin.html page as react does for components 
async function loadcontent(pagepath,callback){

        //the fetched addjob.html is shown in this div with id= dynamic-content
        document.getElementById('dynamic-content').innerHTML =  "";
        try{
            const data = await fetch(pagepath);

            const html = await data.text();

            document.getElementById('dynamic-content').innerHTML =  html;
            
            console.log(callback);
           if(callback && typeof callback === "function"){
            callback();
           }
            
        }
        catch(error){
            console.log(error + "error");
        } }

        document.addEventListener("DOMContentLoaded", () => {
            // if(!localStorage.getItem("isAdmin")){
            //     window.location.href = "../login/login.html";
            //     return;
            // }
           
        //this statement is used to show by default the posted job page on admin screen 
            loadcontent('./postedjob/postedjob.html', postedjob)  


            
        
        });
        

       


                