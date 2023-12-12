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
let tags=document.getElementById('tags')

fetchAPI()

form.addEventListener('submit', function(e){
    e.preventDefault()
    fetch('https://blog-api-assignment.up.railway.app/posts/'+postID(),{
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "tags": tags.value,
            "title": title.value,
            "content": content.value,
            "author": author.value
        })
    })
    .then(()=>window.location.replace('index.html'))
    .catch((error) => console.log(error));
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
        tags.value=postData.tags.join(', ')
    }catch(error){
        let errorDiv=document.createElement('div')
        errorDiv.innerHTML="Error: Link could not be read"
        form.prepend(errorDiv)
        console.log(error)
    }
}

function postID(){
    let queryString=location.search
    console.log(queryString)
    let params=new URLSearchParams(queryString)
    console.log(params)
    let id=params.get('id')
    console.log(id)
    return id;
}

