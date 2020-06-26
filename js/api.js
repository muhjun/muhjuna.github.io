const API_KEY = "c84e936a853f4dcfab2d9d1f290c8020";
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2002;
const ENDPOINT_KLASEMEN = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams/`;
const ENDPOINT_DETAIL = `${BASE_URL}teams/`;


const fetchAPI = url => {
  return fetch(url, {
      headers: {
        'X-Auth-Token': API_KEY
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
};


function getKlasemen() {
  showLoader();
  if ("caches" in window) {
    caches.match(ENDPOINT_KLASEMEN).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showKlasemen(data);
        })
      }
    })
  }

  fetchAPI(ENDPOINT_KLASEMEN)
    .then(data => {
      showKlasemen(data);
      hideLoader();
    })
    .catch(error => {
      console.log(error)
    })

}

function showKlasemen(data) {
  let standings = "";
  let standingElement = document.getElementById("main-content-klasemen");

  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="20px" height="20px" alt="badge"/></td>
                    <td><a href="./detail.html?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>                    
                    <td>${standing.goalsAgainst}</td>                    
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table centered">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Logo</th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lose</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>Diff</th>
                            <th>Point</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                </div>
    `;
}

function getTeam() {
  showLoader();
  if ("caches" in window) {
    caches.match(ENDPOINT_TEAM).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTeam(data);
        })
      }
    })
  }

  fetchAPI(ENDPOINT_TEAM)
    .then(data => {
      showTeam(data);
      hideLoader();
    })
    .catch(error => {
      console.log(error)
    })
}

function showTeam(data) {
  dataTeam = data;
  let teams = "";
  data.teams.forEach(function (team) {
    teams += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <a href="./detail.html?id=${team.id}">
            <div class="center flow-text">${team.name}</div>
            </a>
            <div class="center">${team.shortName}</div>
          </div>
          <div class="card-action center-align">
              <a class="waves-effect waves-light btn-small orange darken-4 id="favButton" onclick="insertTeamListener(${team.id})">Tambahkan Ke Favorit</a>
          </div>
        </div>
      </div>
        `;
  });
  document.getElementById("main-content-teams").innerHTML = teams;
}

function getTeamsId(teamid) {
  return new Promise((resolve, reject) => {
    if ('caches' in window) {
      caches.match(ENDPOINT_DETAIL + teamid).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log('Competition Data: ' + data);
            toTeamHtml(data);
            resolve(data);
          });
        }
      });
    }
    fetchAPI(ENDPOINT_DETAIL + teamid)
      .then(data => {
        toTeamHtml(data);
        resolve(data);
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function getTeamsIdDetail(teamid) {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(ENDPOINT_TEAM + teamid).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resolve(data);
          });
        }
      });
    }
    fetchAPI(ENDPOINT_TEAM + teamid)
      .then(status)
      .then(json)
      .then(function (data) {
        resolve(data);
      })
      .catch(error);
  });
}

function toTeamHtml(data) {
  let teamHeaderHtml = '';
  let teamBodyHtml = '';

  teamHeaderHtml = `
    <div class="card mt-2 p2">
    <h4 class="center"> ${data.name} </h4>
        <img src=${data.crestUrl.replace(/^http:\/\//i, 'https://')} align="center" height="150px" max-width="150px">
        <hr>
    </div>
    `;

  teamBodyHtml = `
    <div class="card-content">
    <table class="striped centered">
      <tbody>
        <tr>
          <th>Nama Tim</th>
          <td>${data.name}</td>
        </tr>
        <tr>
          <th>Nama Singkat</th>
          <td>${data.shortName ? data.shortName : "-"}</td>
        </tr>
        <tr>
          <th>Stadion</th>
          <td>${data.venue ? data.venue : "-"}</td>
        </tr>
        <tr>
          <th>Warna Tim</th>
          <td>${data.clubColors ? data.clubColors : "-"}</td>
        </tr>
        <tr>
          <th>Alamat</th>
          <td>${data.address ? data.address : "-"}</td>
        </tr>
        <tr>
          <th>Website</th>
          <td><a target="_blank" rel="noopener noreferrer" href="${data.website}">${data.website ? data.website : "-"}</a></td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${data.email ? data.email : "-"}</td>
        </tr>
        <tr>
          <th>Negara</th>
          <td>${data.area.name ? data.area.name : "-"}</td>
        </tr>
      </tbody>
    </table>
    </div>
  
    `;

  document.getElementById("teamHeader").innerHTML = teamHeaderHtml;
  document.getElementById("teamBody").innerHTML = teamBodyHtml;

}

const elTeamFavorit = () => {
  showLoader();
  const teams = getTeamfav()
  teams.then(data => {
    dataTeam = data;
    let html = ' '
    html += '<div class="row">'
    data.forEach(team => {
      html += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <a href="./detail.html?id=${team.id}&saved=true">
            <div class="center flow-text">${team.name}</div>
            </a>
            <div class="center">${team.shortName}</div>
          </div>
            <div class="card-action center-align">
                <a class="waves-effect waves-light btn-small blue" onclick="deleteTeamListener(${team.id})">Delete</a>
            </div>
          </div>
        </div>
      `
    })

    if (data.length == 0) html += `
    <div class="row">
          <div class="col s12 center">
              <h5>Kamu tidak memiliki team favorit</h5>
          </div>
    </div>`

    html += "</div>"
    let doc = document.getElementById('main-content-fav');
    doc.innerHTML = html;
    hideLoader();
  })
}

const showLoader = () => {
  let loaderx = `<div class="preloader-wrapper medium active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
                </div>`
  let docx = document.getElementById('loader');
  docx.innerHTML = loaderx;
}

const hideLoader = () => {
  let docx = document.getElementById('loader');
  docx.innerHTML = '';
}