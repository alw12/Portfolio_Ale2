const sharp = require('sharp');
const { mkdirSync } = require('fs');

(async () => {
  mkdirSync('dist/assets/img', { recursive: true });

  await sharp('assets/img/profile.jpg')
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile('dist/assets/img/profile.webp');

  await sharp('assets/img/profile.jpg')
    .resize({ width: 600, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile('dist/assets/img/profile.jpg');

  console.log('[build:img] profile.webp + profile.jpg → dist/assets/img/');
})();
