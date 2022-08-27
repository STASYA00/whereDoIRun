class Street{

    #defaultOffset;
    #score;
    constructor(coords){
        let [key1, key2] = Object.keys(coords[0]);
        this.coords = coords.filter(c=>c!=undefined)
                            .map(c=>[c[key2], c[key1]]); // "lon", "lat" : order of coords in D3
        
        this.#defaultOffset = 0.0002; // approx 0.0001 = 10m
        this.streetArea = this.getBuffer();
        this.#score = 1;
    }

    #addScore(value=1){
        this.#score += value;
    }

    getBuffer(offset){
        /*
            Function that calculates the buffer area for the Street with a given
            offset value. The area is returned as a polygon.

            Algorithm

            for each street segment ((x1, y1), (x2, y2)):
                calculate the normals n1 = (-dx, dy) * offset, n2 = (dx, -dy)* offset
                dx = x2-x1
                dy = y2-y1

                polygon coordinates are:
                    A, B, C, D
                    A = (x1+nx1, y1+ny1)
                    B = (x2+nx1, y2+ny1)
                    C = (x2+nx2, y2+ny2)
                    D = (x1+nx2, y1+ny2)

        */
        if (offset==undefined){
            offset = this.#defaultOffset;
        }
        
        let n1 = [(this.coords[1][1] - this.coords[0][1]),
                  -(this.coords[1][0] - this.coords[0][0])
                ];

        let n2 = [-(this.coords[1][1] - this.coords[0][1]),
                  (this.coords[1][0] - this.coords[0][0]), 
                  ];
        n1 = unitVector(n1[0], n1[1]).map(x => x * offset);
        n2 = unitVector(n2[0], n2[1]).map(x => x * offset);
        
        let polygonCoords = [
            [this.coords[0][0]+n1[0], this.coords[0][1]+n1[1]],
            [this.coords[1][0]+n1[0], this.coords[1][1]+n1[1]],
            [this.coords[1][0]+n2[0], this.coords[1][1]+n2[1]],
            [this.coords[0][0]+n2[0], this.coords[0][1]+n2[1]],
        ];
        
        return polygonCoords;
    }

    #getBufferPolygon(){
        return L.polygon(this.getBuffer())
    }

    getScore(){
        return this.#score;
    }

    length(){
        return Math.pow( (Math.pow((this.coords[1][0] - this.coords[0][0]), 2) + Math.pow(this.coords[1][1] - this.coords[0][1], 2) ), .5);
    }

    score(activity){
        this.#addScore(intersectionCalc.makePolyline(this.#getBufferPolygon(), activity.getCoords()));
    }
}

