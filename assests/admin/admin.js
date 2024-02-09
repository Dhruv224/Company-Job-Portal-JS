//logic for logout button
const logout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "../login/login.html"
    return;
}

//this function creates the new job fro admin to show
function addjob(){
   
    const addjobform = document.getElementById("addjob-form")
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

           //jobs arrya is updated with new jon in localstorage
            localStorage.setItem("jobs",JSON.stringify(jobs));
            addjobform.reset();
 })
}

//this function fetchs the addjob.html file to show on admin.html page as react does for components 
async function loadcontent(pagepath){

        //the fetched addjob.html is shown in this div with id= dynamic-content
        document.getElementById('dynamic-content').innerHTML =  "";
        try{
            const data = await fetch(pagepath);

            const html = await data.text();

            document.getElementById('dynamic-content').innerHTML =  html;
            
            //after the loading of add job element add job function is called
            addjob();

        }
        catch(error){
            console.log(error + "error");
        } }



                