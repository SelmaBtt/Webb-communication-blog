let mainUl=document.getElementById('main-ul')

fetchBlogData()
async function fetchBlogData(){
    try{
        let response=await fetch('https://blog-api-assignment.up.railway.app/posts')
        // console.log(response)
        let data=await response.json()
        // console.log(data)
        for(let blogPosts of data){
            let blogDate=new Date(blogPosts.date)
            let blogContent=blogPosts.content
            let blogTags=blogPosts.tags
            // console.log(blogTags)
            if(blogTags!==null){
                blogTags=blogTags.join(', ')
            }else{
                blogTags.remove()
            }
            mainUl.innerHTML+=`
                <li>
                    <h2>${blogPosts.title}</h2>
                    <h3 style="display: inline;">Author: </h3>${blogPosts.author}
                    <p>
                        ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString([], {timeStyle: 'short'})}
                    </p>
                    <p id="content">${blogContent}</p>
                    <a href="posts.html" style="color: red;">Read more</a>
                    <p>Tags: ${blogTags}</p>
                </li>
            `
        }
    }catch(error){
        mainUl.innerHTML="ERROR"
        console.log("Error: "+error)
    }

}