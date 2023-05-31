import { GenerateSW } from "workbox-webpack-plugin"

module.exports = {
  // ...other webpack configuration options...

  plugins: [
    // Generate the service worker with precached assets
    new GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      // Precache all necessary assets from the build output directory
      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/, /\.svg$/, /\.ico$/, /\.woff$/, /\.woff2$/, /\.ttf$/, /\.eot$/, /\.json$/, /\.webmanifest$/, /\.mp3$/, /\.mp4$/],
      // Customize the caching strategies if needed
      // More options and configurations available: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW
    }),
  ],
};
