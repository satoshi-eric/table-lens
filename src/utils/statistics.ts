const calcMean = (arr: Array<number>) => arr.reduce((acc, curr) => acc + curr) / arr.length

const calcCov = (xArr: Array<number>, yArr: Array<number>) => {
    if (xArr.length !== yArr.length) {
        return 0
    }
    let xMean = calcMean(xArr)
    let yMean = calcMean(yArr)
    let xyCov = 0
    for (let i = 0; i < xArr.length - 1; i++) {
        xyCov += (xArr[i] - xMean) * (yArr[i] - yMean)
    }
    return xyCov
}

const calcVar = (arr: Array<number>) => {
    const arrMean = calcMean(arr)
    let variance = 0
    for (let i = 0; i < arr.length - 1; i++) {
        variance += Math.pow(arr[i] - arrMean, 2)
    }
    return variance
}

const calcPearsonCorrelation = (xArr: Array<any>, yArr: Array<any>) => {
    if (xArr.length !== yArr.length) {
        return 0
    }
    if (isNaN(yArr[0]) || isNaN(xArr[0])) {
        return Number.NEGATIVE_INFINITY
    }
    return calcCov(xArr, yArr) / Math.sqrt(calcVar(xArr) * calcVar(yArr))
}

export default calcPearsonCorrelation