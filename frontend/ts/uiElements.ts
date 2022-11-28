import * as uuid from "uuid";

interface CssData {
    tag: string,
    value: string
}

class PanelElement {
    id: string;
    css: CssData[];
    elementType: string;
    className: string;

    constructor ( id: string | null = null, css: CssData[] = [], classname: string = "" ) {
        this.id = id ? id : uuid.v4();
        this.css = css;
        this.elementType = "div";
        this.className = classname;
    }

    createElement(){
        const doc = document.createElement( this.elementType );
        doc.id = this.id;
        if (this.className){
            doc.className = this.className;
        }
        return doc;
    }

    add(parentId: string){
        const el = this.createElement();
        this.css.forEach( x => {
            el.style.setProperty( x.tag, x.value );
        } );
        this.appendElement(parentId, el);
    }

    appendElement ( parentId: string, child: Node ) {
        let parent;

        if (parentId){
            parent = document.getElementById( parentId );
        }
        else{
            parent = document.getElementsByTagName("body")[0];
        }
    
        if ( parent ) {
            parent.appendChild( child );
        }
    }
}


export {CssData, PanelElement};