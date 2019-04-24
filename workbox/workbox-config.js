module.exports = {
    globDirectory: ".",
    globPatterns: [
        "**/*.{png,html,ico,js,css,webmanifest}"
    ],
    swDest: "sw.js",
    swSrc: "workbox/sw_shell.js",
    globIgnores: ['node_modules/**/*', 'dist/**/*', 'workbox/**/*']
};