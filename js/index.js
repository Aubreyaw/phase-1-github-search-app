document.addEventListener("DOMContentLoaded", function() {  
    const githubForm = document.getElementById("github-form");

    function gitHubForm(event) {  
        event.preventDefault();  
        const searchInput = document.getElementById('search').value;
        
        const baseUrl = 'https://api.github.com/search/users?q=';
        const url = baseUrl + searchInput;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const gitUserList = document.getElementById('user-list');
            gitUserList.innerHTML = '';
            const gitRepoList = document.getElementById('repos-list');
            gitRepoList.innerHTML = '';
            

            data.items.forEach(user => {
                const gitUserName = document.createElement("li");
                gitUserName.textContent = user.login;
                gitUserList.appendChild(gitUserName);

                gitUserName.addEventListener("click", () => {
                    console.log("clicked on:", user.login);
                    
                    fetch(user.repos_url)
                    .then(response => response.json())
                    .then(repos => {
                        gitRepoList.innerHTML = '';
                        repos.forEach(repo => {
                            createRepoLinks(repo.html_url, repo.name);
                        });
                    })
                    .catch(error => {
                        console.error("sucks", error);
                    });
                });
            });

            function createRepoLinks(url, linkText) {
                const gitRepos = document.createElement("li");
                const a = document.createElement("a");
                a.href = url;
                a.textContent = linkText;
                a.target = "_blank";
                gitRepos.appendChild(a);
                gitRepoList.appendChild(gitRepos);
            }
        })
        .catch(error => {
            console.log(error);
        });

        githubForm.reset(); 
    }
    
    githubForm.addEventListener('submit', gitHubForm); 
});




// document.addEventListener("DOMContentLoaded", function() {  
//     const githubForm = document.getElementById("github-form");

//     function gitHubForm(event) {  
//         event.preventDefault();  
//         const searchInput = document.getElementById('search').value;
        
//         const baseUrl = 'https://api.github.com/search/users?q=';
//         const url = baseUrl + searchInput;
        
//         fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const gitUserList = document.getElementById('user-list');
//             gitUserList.innerHTML = '';
//             const gitRepoList = document.getElementById('repos-list');
//             gitRepoList.innerHTML = '';
            

//             data.items.forEach(user => {
//                 const gitUserName = document.createElement("li");
//                 gitUserName.textContent = user.login;
//                 gitUserList.appendChild(gitUserName);

//                 gitUserName.addEventListener("click", () => {
//                     console.log("clicked on:", user.login);
                    
//                     fetch(user.repos_url)
//                     .then(response => response.json())
//                     .then(repos => {
//                         gitRepoList.innerHTML = '';
//                         repos.forEach(repo => {
//                             createRepoLinks(repo.html_url, repo.name);
//                         });
//                     })
//                     .catch(error => {
//                         console.error("sucks", error);
//                     });
//                 });
//             });

//             function createRepoLinks(url, linkText) {
//                 const gitRepos = document.createElement("li");
//                 const a = document.createElement("a");
//                 a.href = url;
//                 a.textContent = linkText;
//                 a.target = "_blank";
//                 gitRepos.appendChild(a);
//                 gitRepoList.appendChild(gitRepos);
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         });

//         githubForm.reset(); 
//     }
    
//     githubForm.addEventListener('submit', gitHubForm); 
// });


    
/*
✓  Handle the form submission.
    → Add an event listener to the form element (githubForm) for the submit event. 
    Inside the event handler function, prevent the default form 
    submission behavior using event.preventDefault(). This ensures that the form data 
    is not sent to the server and the page is not reloaded.

✓  Capture the search input value.
   → Inside the form submission event handler, access the value of the search input field (searchInput). 
    You can use document.getElementById('search').value to get the value.

✓  Construct the URL for the User Search Endpoint.
    → Use the search input value to construct the for the User Search Endpoint. 
    This URL should include the base GitHub API URL 
    (https://api.github.com/search/users?q=) and the search query.

✓  Make a request to the GitHub API.
   →  Use JavaScript's fetch function (or any other HTTP library) 
     to make a GET request to the constructed URL. 
     This will fetch search results for GitHub users.

✓   Handle the response.
    → Once you receive the response from the API, extract the relevant code
    (such as username, avatar, and profile link) from the response data.

✓   Display user information on the page.
    → Update the DOM to display the user information retrieved from the API. 
    You can use the provided HTML and the 'user-list' unordered list (<ul>) 
    to dynamically append the user information as list items (<li> ).

✓  Handle user click events.
    → Add event listeners to the user list items to listen for click events. 
    When a user is clicked, you'll need to send a request to the 
    User Repos Endpoint to fetch the repositories for that user.

✓  Construct the URL for the User Repos Endpoint.
    → Use the selected user's username to construct the URL for the User Repos Endpoint. 
    This URL should include the base GitHub API URL (https://api.github.com/users/) and the username.

✓  Make a GET request to the User Repos Endpoint.
    → Use fetch (or any other HTTP library) to make a GET request to the constructed URL. 
    This will fetch the repositories data for the selected user.

✓  Handle the response.
    → Once you receive the response from the User Repos Endpoint, 
    extract the relevant repository information (such as repository name and link) 
    from the response data.

✓  Display repository information on the page.
    → Update the DOM to display the repository information retrieved from the API. 
    You can use the provided HTML and the 'repos-list' unordered list (<ul> ) to 
    dynamically append the repository information as list items (<li> ).

12  Optional: Implement the bonus feature.
   → Toggle the search bar between searching for users and searching for repositories 
    by adding an extra button. You may need to create a variable to store the current 
    search type and update it accordingly when the button is clicked.
*/
    



