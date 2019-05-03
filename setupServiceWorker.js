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

        let deferredPrompt;
        const installButton = document.querySelector(".installButton");
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            console.log("before install event received");
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            installButton.classList.toggle("is-visible");
        });

        installButton.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            installButton.classList.toggle("is-visible");
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                        deferredPrompt = null;
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                });
        });
    }
}