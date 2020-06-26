// database operations
const dbx = idb.open("bundesliga", 1, function (upgradeDb) {
  upgradeDb.createObjectStore("team", {
      keyPath: "id"
  });
})

const insertTeam = (team) => {
  dbx.then(db => {
    const tx = db.transaction('team', 'readwrite');
    const store = tx.objectStore('team')
    team.createdAt = new Date().getTime()
    store.put(team)
    return tx.complete;
  }).then(() => {
    M.toast({
      html: `${team.name} berhasil disimpan!`
    })
    console.log('Team berhasil disimpan');
  }).catch(err => {
    console.error('Team gagal disimpan', err);
  });
}

const deleteTeam = (idTeam) => {
  dbx.then(db => {
    const tx = db.transaction('team', 'readwrite');
    const store = tx.objectStore('team');
    store.delete(idTeam);
    return tx.complete;
  }).then(() => {
    M.toast({
      html: 'Team Sudah Di Hapus!'
    });
    elTeamFavorit();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

const getTeamfav = () => {
  return dbx.then(db => {
    const tx = db.transaction('team', 'readonly');
    const store = tx.objectStore('team');
    return store.getAll();
  })
}

const insertTeamListener = idTeam => {
  const team = dataTeam.teams.filter(el => el.id == idTeam)[0]
  insertTeam(team);
}

const deleteTeamListener = idTeam => {
  const c = confirm("Hapus dari Team Favorit?")
  if (c == true) {
    deleteTeam(idTeam);
  }
}