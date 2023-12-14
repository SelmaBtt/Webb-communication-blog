fetchBlogs()
// Våran async funktion för att hämta all blogdata och sätta in i våran tabell
async function fetchBlogs() {
    try {
        // Sätta upp kontakt med vårat API och hämta datan. Då dessa variabler inte ska ändras kan vi använda const
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const blogs = await response.json();
        console.log(blogs)
        // blogListHTML kommer vi fylla med våran HTML data i våran for loop, sedan sätta in i tabellen vi har i html
        let blogListHTML = "";
        // For loop för att gå igenom alla bloginlägg och lägga till datan i våran blogListHTML variabel
        for (let entry of blogs) {
            // BlogDate är så vi lätt kan sätta in vårat datum i önskat format
            let blogDate = new Date(entry.date)
            // Sen behöver vi dela upp våra taggar i en lista som vi vill sätta in i våran html. if satsen är så att vi endast går igenom och lägger till taggarna i våpran tagsHTML variabel så länge entry.tags inte är null, alltså avsett att det faktiskt finns en array där att gå igenom
            let tagsHTML = "";
            if (entry.tags!==null) {
                for (let tag of entry.tags) {
                    tagsHTML += `<li>${tag}</li>`
                }
            }
            // Det är här vi skapar och sätter upp hur våran html ska se ut. vi sätter upp hur våran tabell ska se ut och sätter in datan från APiet, taggarna sätts in från våran samlade tagg variabel.
            blogListHTML += `
            <tr>
                <td class="titles">${entry.title}</td>
                <td class="authors">${entry.author}</td>
                <td class="tags">
                    ${tagsHTML}
                </td>
                
                <td><span class="date"> ${blogDate.getFullYear()}-${blogDate.getMonth()+1}-${blogDate.getDate()} ${blogDate.toLocaleTimeString()} </span></td>
                <td class="buttons"><button><a href="update-post.html">Update</a></button> |
                    <button><a href="#" data-id=${entry._id} class="delete-blog">Delete</a></button> </td>
            </tr>
            `
        }
        // När loopen är klar så sätter vi in våran ihopsatta tabell i våran tabell body så ser vi allting från APiet
        document.getElementById('table-body').innerHTML = blogListHTML;
    } catch(error) {
        console.log(error)
    }
    // Liknande hur vi gjorde i pun uppgiften så vill vi här lägga in våran deleteknapp också. Våran variabel fångar upp alla knappar genom deras tilldelade klass
    let deleteLinks = document.getElementsByClassName('delete-blog');
    // for loopen tilldelar sedan en eventlistener till alla våra delete knappar som plockar upp tillhörande bloggens id, skickar en DELETE request till APIet och sedan tar bort blogginlägget från våran vy.
    for (let link of deleteLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let blog = e.target.dataset.id;
            fetch (`https://blog-api-assignment.up.railway.app/posts/${blog}`, {
                method: 'DELETE'
            });
            link.parentNode.parentNode.remove();
        })
    }

}