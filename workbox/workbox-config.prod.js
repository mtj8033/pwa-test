module.exports = {
    globDirectory: "docs",
    globPatterns: [
        "**/*.{png,html,ico,js,css,webmanifest}"
    ],
    swDest: "docs/sw.js",
    swSrc: "workbox/sw_shell.js",
    globIgnores: ['node_modules/**/*', 'dist/**/*', 'workbox/**/*']
};