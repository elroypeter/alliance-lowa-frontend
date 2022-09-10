const jsLoader = (path) => {
    const script = document.createElement("script");
    script.src = path;
    document.body.appendChild(script);
};

const cssLoader = (path) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    document.head.appendChild(link);
};

export const loadScripts = {
    css: (files) => {
        files.forEach((file) => cssLoader(file));
    },
    js: (files) => {
        files.forEach((file) => jsLoader(file));
    },
};
