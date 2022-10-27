export const externals = {
    css: [],
    js: [],
};

export const getImageName = (filePath) => {
    return filePath ? filePath.split('/public')[1] : undefined;
};
