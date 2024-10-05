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





    



