function unitVector(dx, dy){
    let vLength = vectorLength(dx, dy);
    dx = dx / vLength;
    dy = dy / vLength;
    return [dx, dy];
}

function vectorLength(dx, dy){
    return Math.pow((dx**2 + dy**2), .5)
}

function vecDiff(v1, v2){
    return vectorLength(v1[0] - v2[0], v1[1]-v2[1]);
}

const sleep = ms => new Promise(res => setTimeout(res, ms));