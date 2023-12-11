document.getElementById('blog-form').addEventListener('submit', createBlog);

async function createBlog(e) {
    e.preventDefault();

    let form = e.target;

    try {
        // data = serializeForm(form);
        let formData = new FormData(form)
        console.log(formData)
        data = {
            "title": formData.get('blog-title'),
            "content": formData.get('blog-text'),
            "author": formData.get('blog-author')
        };
        console.log(data)
    
        await fetch('https://blog-api-assignment.up.railway.app/posts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        location.replace('index.html');
    } catch(error) {
        console.log(error)
    } 
    
}

// let serializeForm = function (form) {
//     var obj = {};
//     var formData = new FormData(form);
//     // console.log(formData.getAll());

//     for (var key of formData.keys()) {
//         let inputData = formData.getAll(key);

//         if (inputData.length > 1) {
//             obj[key] = inputData;
//         } else {
//             obj[key] = inputData[0];    
//         }
//     }
    
//     // console.log(obj);
//     return obj;
// };