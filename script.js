const APIURL = "https://api.github.com/users/"

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// console.log("hello world");
// getUser("florinpop17");

async function getUser(user){
    const resp = await fetch(APIURL+user);
    const respData = await resp.json();

     createUser(respData);

     getRepos(user);
}

async function getRepos(username){
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}



function createUser(username){
    
    const cardHTML = `
            <div class="card">  
                <div>
                    <img class="avatar" src="${username.avatar_url}" alt="${username.name}" />
                </div>
                <div class="user-info">
                    <h2>${username.name}</h2> 
                    <p>${username.bio}</p>

                    <ul class="info ">
                        <li>${username.followers}<strong>Followers</strong></li>
                        <li>${username.following}<strong>Following</strong></li>
                        <li>${username.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <h4>Repos:</h4>
                    <ul class="repos" id="repos"></ul>
                </div>
            </div>
     `;

     main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposId = document.getElementById('repos');
    
    repos
    .sort((a,b)=> b.stargazers_count - a.stargazers_count)
        .slice(0, 9).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add("repo");

        repoEl.innerText = repo.name;
        repoEl.target = "_blank";
        repoEl.href = repo.html_url;
        
        reposId.appendChild(repoEl);
    });

}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const user = search.value;
    if(user){
        getUser(user);

        search.value = "";
    }
})