function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}

export const arraySlice = (skusList: Array<any>, size: number): Array<any> => {
    return spliceIntoChunks(skusList, size);
};
