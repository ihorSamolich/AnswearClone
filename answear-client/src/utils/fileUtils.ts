export const isImageFile = (fileName: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
};

export const isVideoFile = (fileName: string) => {
    return /\.(mp4)$/i.test(fileName);
};
