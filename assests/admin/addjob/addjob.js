function addjob(event){
   
    const addjobform = document.getElementById("addjob-form")
    addjobform.addEventListener("submit",(event)=>{
        // event.preventDefault();

        let title = document.getElementById("j-title")?.value;
        let type = document.getElementById("j-type")?.value;
        let description = document.getElementById("j-desc")?.value;

        let jobs = JSON.parse(localStorage.getitem("jobs")) || [];
console.log(title);
console.log(type);
console.log(description);
        const newjob = {
            jobId : jobs.length,
       title : title,
       desc : description,
       type : type,
       appliedby:[],

        }
jobs.push(newjob);

localStorage.setItem("jobs",JSON.stringify(jobs));


    })



}


document.addEventListener("DOMContentLoaded",addjob)