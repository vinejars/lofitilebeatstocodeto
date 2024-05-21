import flower1 from './flower1.png'
import flower2 from './flower2.png'
import flower3 from './flower3.png'
import flower4 from './flower4.png'
import flower9 from './flower9.png'
import flower10 from './flower10.png'
import flower11 from './flower11.png'
import flower12 from './flower12.png'
import cat from './cat.png'

type TileType = Tile | null; 

export class Tile {
    val: number;
    prev: TileType;
    left: TileType; 
    right: TileType; 
    imgUrl: string | undefined;
    selected: boolean;
    constructor(val: number, prev:TileType, left: TileType, right: TileType, imgUrl: string | undefined, selected = false) {
        this.val = val;
        this.prev = prev;
        this.left = left;
        this.right = right;
        this.imgUrl = imgUrl;
        this.selected = selected; 
    }
    select() {
        this.selected = true; 
    }
}




//top row
const tile1 = new Tile(1, null, null, null, flower1)
const tile2 = new Tile(1, tile1, null, null, flower2)
const tile3 = new Tile(1, tile2, null, null, flower3)
const tile4 = new Tile(1, tile3, null, null,  flower4)

//bottom row
const tile9 = new Tile(1, null, null, null,  flower9)
const tile10 = new Tile(1, tile9, null, null,  flower10)
const tile11 = new Tile(1, tile10, null, null,  flower11)
const tile12 = new Tile(1, tile11, null, null,  flower12)


// middle row 
export const theSteppingStone= new Tile(2, null, tile3, tile11, cat)
tile2.right = theSteppingStone;
tile10.left = theSteppingStone;

export const getTopRow = () =>  [tile1, tile2, tile3, tile4]
export const getBottomRow = () => [tile9,tile10, tile11, tile12]


export default TileType