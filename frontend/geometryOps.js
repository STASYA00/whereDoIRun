class intersectionCalc{
    // #controller
    constructor(){
        // this.#controller = new positionController();
    }
    static make(rect, line){
        let sides = rect.getLatLngs()[0].map(el => [el["lat"], el["lng"]]);
        sides.push(sides[0]);
        let res = new Array();
        sides.map((side, ind, sides) => {if (ind<sides.length-1)
            {res.push(this.makeLineIntersection([side, sides[ind+1]], line));
            }});
        return res.reduce((prev, curr) => prev + curr) > 0;
        }

    static makePolyline(rect, polyline){
        let sides = rect.getLatLngs()[0].map(el => [el["lat"], el["lng"]]);
        sides.push(sides[0]);
        let res = new Array();
        sides.map((side, ind, sides) => {
            let _res = 0;
            polyline.map((coords, index, polyline) =>{
                if ((ind<sides.length-1)&&(index<polyline.length-1)&&(_res<1)){
                    _res += this.makeLineIntersection([side, sides[ind+1]], [coords, polyline[index+1]]);
                }
            res.push(_res);
            });
        });
        return res.reduce((prev, curr) => prev + curr) > 0;
        }
    
    static makeLineIntersection(line1, line){
        // take 4 rect sides
        // for each side
        // find where the line lies with respect to the side (plus / mid / minus)
        // if all are mid => intersects
        // if 1 side intersects => intersects
        // 
        let res = this.#linesIntersect(line, line1);
        // console.log("Result", res);
        if (res==false){
            res = this.#lineBetweenSides();
        }
        return res;
    }

    static #lineBetweenSides(line, polygonSide1, polygonSide2){
        return false;
    }

    static #linesIntersect(line, polygonSide){
        let res1 = this.#orientation(line, polygonSide[0]);
        let res2 = this.#orientation(line, polygonSide[1]);
        let res3 = this.#orientation(polygonSide, line[0]);
        let res4 = this.#orientation(polygonSide, line[1]);
        
        if (res1!=res2 && res3!=res4){
            return true; // true => intersect
        }
        else{
            return false;
        }
    }

    static #orientation(line, point)
{
    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    
    let val = (line[1][1] - line[0][1]) * (point[0] - line[1][0]) -
              (line[1][0] - line[0][0]) * (point[1] - line[1][1]);
  
    if (val == 0) return 0;  // collinear
  
    return (val > 0)? 1: 2; // clock or counterclock wise
}

static centerFromBounds(bounds){
    if (Object.keys(bounds).includes("maxlat")){
        return [0.5 * (bounds["maxlon"]+bounds["minlon"]), 0.5 * (bounds["maxlat"]+bounds["minlat"])]
    }
    return [0.5 * (bounds[2]+bounds[0]), 0.5 * (bounds[3]+bounds[1])]
}

static pointInPolygon(point, coords){
    let r = d3.polygonHull(coords);
    return d3.polygonContains(r, point);
}

    static #pointPosition(line, point){
        // only x-axis
        let pointProj = this.#projectPointOnLine(line, point);
        let result = PROJ_AREAS.MID;
        if ((pointProj[0] < line[0][0]) && (pointProj[0] < line[1][0])){
            result = PROJ_AREAS.MINUS;
        }
        else if ((pointProj[0] > line[0][0]) && (pointProj[0] > line[1][0])){
            result = PROJ_AREAS.PLUS;
        }

        // console.log("RESULT", result);
        // console.log("Point proj", pointProj );
        // console.log(line, point);
        return result;

    }

    static #projectPointOnLine(line, point){
        /* line : two pairs of coordinates [[x1, y1], [x2,y2]]
           point: two coordinates (x,y)
           */
        // console.log("project point", line, point);
        let [pointX, pointY] = point;
        let [[x1, y1], [x2, y2]] = line;
        if (x1 == x2){
            return [x1, point[1]];
        }
        if (y1==y2){
            return [point[0], y1];
        }
        let k = (y1 - y2) / (x1 - x2);  // tan of line to project the point onto
        
        let x = ((pointY + (pointX / k)) / (Math.pow(k, 2) + 1));
        let y = y1 - k * (x1 - x);
        return [x, y];
    }
}

// class positionController{
//     constructor(){

//     }
//     make(projX1, projX2, projY1, projY2){
        
//         if (projY1==undefined && projY2==undefined){
            
//             return this.#axisCheck(projX1, projX2) == true;
//         }
//         return this.#axisCheck(projX1, projX2) == this.#axisCheck(projY1, projY2) == true;
//     }
//     #axisCheck(proj1, proj2){
//         return 0 < proj1 + proj2 && proj1 + proj2 < 4;
//     }
// }

const PROJ_AREAS = {
    MINUS: 0,
    MID: 1,
    PLUS: 2
}