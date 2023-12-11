fetchBlog();

async function fetchBlog() {
    try {
        let queryString = location.search;
        let urlParams = new URLSearchParams(queryString);
        let blogID =  urlParams.get('id')
        const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${blogID}`)
        const blogData = await response.json();
        console.log(blogData)
        let blogDate = new Date(blogData.date)

        document.getElementById('title').innerHTML = blogData.title
        
        document.getElementById('info').innerHTML = blogData.content
        document.getElementById('date').innerText = `${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString([], {timeStyle: 'short'})}`

    } catch(error) {
        console.log(error)
    }
};