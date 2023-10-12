const githubForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

githubForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value;
  searchGitHubUsers(searchTerm);
});
function searchGitHubUsers(searchTerm) {
  // Make a GET request to the GitHub API
  const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
  
  fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      <img src='${user.avatar_url}' alt='${user.login}'>
      <h3>${user.login}</h3>
      <a href='${user.html_url}' target='_blank'>Profile</a>
    `;
    userItem.addEventListener('click', () => {
      fetchUserRepositories(user.login);
    });
    userList.appendChild(userItem);
  });
}
function fetchUserRepositories(username) {
  const apiUrl = `https://api.github.com/users/${username}/repos`;
  fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  })
    .then(response => response.json())
    .then(data => {
      displayRepositories(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function displayRepositories(repositories) {
  reposList.innerHTML = '';
  repositories.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description available'}</p>
      <a href='${repo.html_url}' target='_blank'>View on GitHub</a>
    `;
    reposList.appendChild(repoItem);
  });
}
