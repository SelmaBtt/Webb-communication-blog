fetchBlogs()

async function fetchBlogs() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();
        
        let blogListHTML = "";
        
        for (let entry of blogs) {
            let blogDate = new Date(entry.date)
            let tagsHTML = "";
            if (entry.tags && entry.tags.length > 0) {
                for (let tag of entry.tags) {
                    tagsHTML += `<li>${tag}</li>`
                }
            }

            blogListHTML += `
            <tr>
                <td>${entry.title}</td>
                <td>${entry.author}</td>
                <td>
                    ${tagsHTML}
                </td>
                <td><span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span></td>
                <td><a href="#">Update</a> |
                    <a href="#">Delete</a> </td>
            </tr>
            `
        }

        document.getElementById('table-body').innerHTML = blogListHTML;
    } catch(error) {
        console.log(error)
    }  
}