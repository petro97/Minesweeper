if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Minesweeper/sw.js', { scope: '/Minesweeper/' })})}