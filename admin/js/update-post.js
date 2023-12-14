/* We need:
    - Admin index link
    - Post ID
        - Title
        - Author
        - Date
        - Content
        - Tags
 */

let form=document.querySelector('form')
let title=document.getElementById('title')
let author=document.getElementById('author')
let date=document.getElementById('date')
let content=document.getElementById('post-content')
let options=document.querySelectorAll('option')
let errorDiv=document.createElement('div')

fetchAPI()

form.addEventListener('submit', function(e){
    e.preventDefault()
    let formData=new FormData(e.target)
    let tagObject=[]
    for(let tag of formData.getAll('tags')){
        tagObject.push(tag)
    }
    fetch('https://blog-api-assignment.up.railway.app/posts/'+postID(),{
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "tags": tagObject,
            "title": title.value,
            "content": content.value,
            "author": author.value,
        })
    })
    .then(()=>window.location.replace('index.html'))
    .catch((error) => {
        errorDiv.innerHTML="Error: Something went wrong when updating"
        form.prepend(errorDiv)
        console.log(error)
    });
})


async function fetchAPI(){
    try{
        let response=await fetch('https://blog-api-assignment.up.railway.app/posts/'+postID())
        let postData=await response.json()
        console.log(postData.content)
        title.value=postData.title
        author.value=postData.author
        date.value=postData.date
        content.value=postData.content
        console.log(options.length)
        for(let i=0; i<options.length; i++){
            if(postData.tags.includes(options[i].value)){
                options[i].selected=true
            }
        }
    }catch(error){
        errorDiv.innerHTML="Error: Link could not be read"
        form.prepend(errorDiv)
        console.log(error)
    }
}

function postID(){
    let queryString=location.search
    let params=new URLSearchParams(queryString)
    // console.log(params)
    let id=params.get('id')
    console.log(id)
    return id;
}