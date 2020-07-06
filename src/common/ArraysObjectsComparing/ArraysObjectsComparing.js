
let ArraysObjectsComparing = (arr1, arr2) => {
    if (arr1.length === arr2.length){
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] = Object.entries(arr1[i]);
        }
        for (let i = 0; i < arr2.length; i++) {
            arr2[i] = Object.entries(arr2[i]);
        }
        let res = !arr1.every((v,i)=> v.every((x, j)=> x.every((y, k)=> y === arr2[i][j][k]))) //
        return res;
    } else{
        return true;
    }
}

export default ArraysObjectsComparing;