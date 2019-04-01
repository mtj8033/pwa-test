export function setupServiceWorker() {
    // Check that service worker api is available
    if ("serviceWorker" in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("sw.js").then((registration) => {
                console.log("Registration succeeded");
            })
            .catch(error => {
                console.log("Registration failed with error", error);
            });
        });
    }
}