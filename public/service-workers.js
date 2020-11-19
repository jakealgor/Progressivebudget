const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
const iconSizes = [ "192", "512"];
const iconFiles = iconSizes.map(
    (size) => `/icons/icon-${size}x${size}.png`
);
const staticFilesToPreCache = [
    "/",
    "index.html",
    "/db.js",
    '/index.js',
    "/manifest.webmanifest",
    "/styles.css"
].concat(iconFiles);
self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!", caches,staticFilesToPreCache );
            var cachedAll = cache.addAll(staticFilesToPreCache)
            return cachedAll
        })
    );
    self.skipWaiting();
});
self.addEventListener("activate", function (evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
self.addEventListener("fetch", function (evt) {
    const { url } = evt.request;
    if (url.includes("/all") || url.includes("/find")) {
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(evt.request)
                    .then(response => {
                        if (response.status === 200) {
                            cache.put(evt.request, response.clone());
                        }
                        return response;
                    })
                    .catch(err => {
                        console.log('broke in fetch err!', err)
                        return cache.match(evt.request);
                    });
            }).catch(err => console.log('broke in second cathc fetch',err))
        );
    } else {
        evt.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(evt.request).then(response => {
                    return response || fetch(evt.request);
                });
            })
        );
    }
});