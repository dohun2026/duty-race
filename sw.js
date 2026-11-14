/* 당직 게임 센터 서비스워커
   항상 인터넷에서 최신 파일을 먼저 받아오고(새 버전 즉시 반영),
   인터넷이 끊겼을 때만 저장해둔 화면을 보여줍니다. */
const CACHE = 'dutygame-v2';
const SHELL = ['./', 'index.html', 'race.html', 'bumper.html', 'mole.html', 'archery.html', 'timer.html', 'typing.html', 'spot.html', 'quiz.html',
  'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Firebase, 폰트, 3D 엔진 등 외부 요청은 손대지 않음
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
