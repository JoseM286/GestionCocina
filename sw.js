const CACHE_NAME = 'cocina-v1';
const urlsToCache = [
    '/GestionCocina/',
    '/GestionCocina/index.html',
    '/GestionCocina/CrearObjetos.html',
    '/GestionCocina/ListarPlatos.html',
    '/GestionCocina/ListarObjetos.html',
    '/GestionCocina/estilos.css',
    '/GestionCocina/js/storage.js',
    '/GestionCocina/js/form.js',
    '/GestionCocina/js/list.js',
    '/GestionCocina/js/listPlatos.js',
    '/GestionCocina/manifest.json',
    '/GestionCocina/icons/icon-72x72.png',
    '/GestionCocina/icons/icon-192x192.png',
    '/GestionCocina/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
            .catch(() => {
                // Si falla, intentamos cargar la página principal
                return caches.match('/GestionCocina/index.html');
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});






