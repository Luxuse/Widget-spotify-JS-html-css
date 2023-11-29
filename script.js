document.addEventListener('DOMContentLoaded', function () {
    const songElement = document.getElementById('song');
    const artistElement = document.getElementById('artist');
    const albumCoverElement = document.getElementById('album-cover');

    const token = 'VOTRE_JETON_D_ACCES'; // Remplacez par votre propre jeton d'accès Spotify

    const player = new Spotify.Player({
        name: 'Lecteur Spotify',
        getOAuthToken: cb => { cb(token); }
    });

    // Gestion des erreurs
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Mises à jour de l'état de lecture
    player.addListener('player_state_changed', state => {
        if (state) {
            const { track_window } = state;
            const { name, artists, album } = track_window.current_track;

            songElement.textContent = name;
            artistElement.textContent = artists.map(artist => artist.name).join(', ');
            albumCoverElement.src = album.images[0].url;
        }
    });

    // Prêt
    player.addListener('ready', ({ device_id }) => {
        console.log('Prêt avec l\'identifiant du périphérique', device_id);
    });

    // Pas prêt
    player.addListener('not_ready', ({ device_id }) => {
        console.log('L\'identifiant du périphérique est hors ligne', device_id);
    });

    // Connectez-vous au lecteur !
    player.connect();
});
