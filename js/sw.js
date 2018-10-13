const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install',((e)=>{
e.waitUntil(caches.open('v1')
.then((cache)=>cache.addAll(cacheFiles)))
}));

self.addEventListener('fetch',((e)=>{
e.respondWith(caches.match(e.request)
.then((response)=>{
    if(response){
        console.log(`found  ${e.response} in cache.`);
        return response;
    }
    else {
        console.log(`could not find ${e.request} data in cache! . Fetching data...`);
        const response= response.clone();
        return fetch(e.request)
        .then((clonedResponse)=>caches.open('v1')
        .then((cache)=>{
            cache.put(e.request,clonedResponse);
            return response;
        }))
    }
})).catch((error)=>{
    console.log(error);
});
}));

