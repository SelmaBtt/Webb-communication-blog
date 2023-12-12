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
            console.log(blogContent)
            let blogTags=blogPosts.tags
            console.log(blogTags)
            if(blogContent.length>200){
                blogContent = blogContent.slice(0, 200) + "..."; 
                // document.getElementById('content').textContent = blogContent;
            }
            if(blogTags!==null){
                blogTags=blogTags.join(', ')
            }
            mainUl.innerHTML+=`
                <li>
                    <h2>${blogPosts.title}</h2>
                    <h3 style="display: inline;">Author: </h3>${blogPosts.author}
                    <p class="snd-text-font">
                        ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString([], {timeStyle: 'short'})}
                    </p>
                    <p id="content">${blogContent}</p>
                    <button><a href="post.html?id=${blogPosts._id}">Read more</a></button>
                    <p class="snd-text-font">Tags: ${blogTags}</p>
                </li>
            `
        }
    }catch(error){
        mainUl.innerHTML="ERROR"
        console.log("Error: "+error)
    }

}