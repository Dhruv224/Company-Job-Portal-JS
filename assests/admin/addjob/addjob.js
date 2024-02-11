

//this function creates the new job fro admin to show
function addjob(value,event){
    event.preventDefault();
      //job title ,type,and decription is set here 
      let title = document.getElementById("j-title")?.value;
      let type = document.getElementById("j-type")?.value;
      let description = document.getElementById("j-desc")?.value;
      let salary = document.getElementById("j-salary")?.value;
      let location = document.getElementById("j-location")?.value;
      let companyname = document.getElementById("j-company")?.value;

 //jobs are being copied in local storage in jobs array
 let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
 console.log(type);
 console.log(description);
 console.log(title);
 console.log(salary);
 console.log(location);
 console.log(companyname);

    if(value){

     value = parseInt(value);
        const jobToUpdate = jobs.find((job) => job.jobId === value);
        console.log(jobToUpdate)


       jobToUpdate.title = title;
       jobToUpdate.desc = description;
       jobToUpdate.type = type;
       jobToUpdate.salary = salary;
       jobToUpdate.location = location;
       jobToUpdate.companyname = companyname;
       
       console.log(jobToUpdate);
       console.log(jobs);
      
    }

    else{
       

      
       

        //new job is created by this object in jobs array
    const newjob = {
            jobId : jobs.length,
            title : title,
            desc : description,
            type : type,
            salary: salary,
            location: location,
            companyname: companyname,
            appliedby:[],


        
            
           
           
            
 }

             jobs.push(newjob);

           //jobs array is updated with new jon in localstorage
           
    }
           
    localStorage.setItem("jobs",JSON.stringify(jobs));
        
    window.location.href="../admin.html"
 
}

document.addEventListener("DOMContentLoaded",

()=>{
    const addjobform = document.getElementById("addjob-form");
       
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
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
document.getElementById('j-company').value = job.companyname || '';

    
   
    addjobform.addEventListener("submit",(event)=>{
        
        event.preventDefault();
        
        addjob(job.jobId,event); 
        
        addjobform.reset();
    
    
    });
 
    
    
 

 
}



);

