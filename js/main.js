let mainUl=document.getElementById('main-ul')

fetchBlogData()
async function fetchBlogData(){
    try{
        let response=await fetch('https://blog-api-assignment.up.railway.app/posts')
        console.log(response)
    }catch(error){
        mainUl.innerHTML="ERROR"
        console.log("Error: "+error)
    }

}