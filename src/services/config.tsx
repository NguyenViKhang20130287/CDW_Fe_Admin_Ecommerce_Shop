export const cloneFile = (originalFile: any, newFileName: any) => {
    const blob = originalFile.slice(0, originalFile.size, originalFile.type);
    const newFile = new File([blob], newFileName, {type: originalFile.type});
    return newFile;
}
