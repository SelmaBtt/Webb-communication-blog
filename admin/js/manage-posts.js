fetchBlogs()

async function fetchBlogs() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();

        let blogListHTML = "";
        for (let entry of blogs) {
            let blogDate = new Date(entry.date)

            blogListHTML += `
            <tr>
                <td>${entry.title}</td>
                <td>${entry.author}</td>
                <td>
                    <li>tag1</li>
                    <li>tag2</li>
                    <li>tag3</li>
                </td>
                <td><span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span></td>
                <td><a href="#">Update</a> |
                    <a href="#">Delete</a> </td>
            </tr>
            `
            
            // `
            //     <li class="list-group-item">
            //         <p>${pun.content} <br> <span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()}</span> </p>
                    
            //         <div>
            //             <a href="update-pun.html?id=${pun._id}">Update</a> |
            //             <a href="#" data-id="${pun._id}" class="delete-link">Delete</a> 
            //         </div>
            //     </li>
            // `
        }

        document.getElementById('table-body').innerHTML = blogListHTML;
    } catch(error) {
        console.log(error)
    }  
}