const preloader = () => {
    const preloaderContainer = document.getElementById("preloader");
    if (preloaderContainer) {
        preloaderContainer.style.display = "none";
    }
};

window.preloader = preloader;
