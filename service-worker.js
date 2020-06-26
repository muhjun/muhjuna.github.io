importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
	console.log('Workbox berhasil di muat');
	workbox.precaching.precacheAndRoute([{
			url: '/',
			revision: '1'
		},
		{
			url: '/nav.html',
			revision: '1'
		},
		{
			url: '/index.html',
			revision: '1'
		},
		{
			url: '/icon.png',
			revision: '1'
		},
		{
			url: '/pages/home.html',
			revision: '1'
		},
		{
			url: '/pages/team.html',
			revision: '1'
		},
		{
			url: '/pages/contact.html',
			revision: '1'
		},
		{
			url: '/detail.html',
			revision: '1'
		},
		{
			url: '/manifest.json',
			revision: '1'
		},
		{
			url: '/pages/favourite.html',
			revision: '1'
		},
		{
			url: '/css/materialize.min.css',
			revision: '1'
		},
		{
			url: '/js/materialize.min.js',
			revision: '1'
		},
		{
			url: '/js/script.js',
			revision: '1'
		},
		{
			url: '/js/api.js',
			revision: '1'
		},
		{
			url: '/js/db.js',
			revision: '1'
		},
		{
			url: '/js/idb.js',
			revision: '1'
		},
		{
			url: '/js/materialize.js',
			revision: '1'
		},
		{
			url: '/js/sw.js',
			revision: '1'
		},
		{
			url: '/img/android-icon-36x36.png',
			revision: '1'
		},
		{
			url: '/img/android-icon-48x48.png',
			revision: '1'
		},
		{
			url: '/img/android-icon-72x72.png',
			revision: '1'
		},
		{
			url: '/img/android-icon-96x96.png',
			revision: '1'
		},
		{
			url: '/img/android-icon-144x144.png',
			revision: '1'
		},
		{
			url: '/img/android-icon-192x192.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-57x57.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-60x60.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-72x72.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-76x76.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-114x114.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-120x120.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-144x144.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-152x152.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-180x180.png',
			revision: '1'
		},
		{
			url: '/img/apple-icon-precomposed.png',
			revision: '1'
		},
		{
			url: '/img/favicon-16x16.png',
			revision: '1'
		},
		{
			url: '/img/favicon-32x32.png',
			revision: '1'
		},
		{
			url: '/img/favicon-96x96.png',
			revision: '1'
		},
		{
			url: '/img/icon-192.png',
			revision: '1'
		},
		{
			url: '/img/icon-512.png',
			revision: '1'
		},
		{
			url: '/img/favicon.ico',
			revision: '1'
		},
	], {
		ignoreUrlParametersMatching: [/.*/]
	});

	workbox.routing.registerRoute(
		new RegExp('/pages/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'pages'
		})
	);

	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg)$/,
		workbox.strategies.cacheFirst({
			cacheName: 'images',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				}),
			],
		}),
	);

	workbox.routing.registerRoute(
		new RegExp('https://api.football-data.org/v2/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'base-url-api',
			cacheExpiration: {
				maxAgeSeconds: 60 * 30
			}
		})
	);

	workbox.routing.registerRoute(
		new RegExp('/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'base-app'
		})
	);

	workbox.routing.registerRoute(
		/^https:\/\/fonts\.googleapis\.com/,
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'google-fonts'
		})
	);
} else {
	console.log('Workbox gagal di muat');
}

self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'img/notification.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});