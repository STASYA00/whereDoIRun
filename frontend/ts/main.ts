import { Canvas } from "./canvas";
import {constants} from "./constants";

function runInBrowser (): void {
	// Add class to adjust size of application
	const el = document.getElementById( "root" );
	el?.classList.add( constants.ROOT_CLASSNAME );
}

runInBrowser();
const c = new Canvas();
console.log("canvas");
c.make();

console.log("canvas made");