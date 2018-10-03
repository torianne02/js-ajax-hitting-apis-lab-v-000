const rootURL = 'https://api.github.com';

// repositories
function getRepositories() {
  const username = document.getElementById('username').value;
  const uri = rootURL + '/users/' + username + '/repos';

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', uri);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
          </li>`;
      });
      .join('') +
    '</ul>';

  document.getElementById('repositories').innerHTML = repoList;
}

// commits
function getCommits(el) {
  const repoName = el.dataset.repository;
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitList;
}

// branches
function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches';

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', uri);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
