import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import TileType, {getTopRow, theSteppingStone, getBottomRow, Tile} from '../tiles/tile';
import pixelx from '../tiles/pixelx.png'
import flower3 from '../tiles/flower3.png'
import flower4 from '../tiles/flower3.png'
import flower11 from '../tiles/flower3.png'
import flower12 from '../tiles/flower3.png'
import cat from '../tiles/cat.png'

type TileContextType = {
    selected: boolean;
    setSelected: Dispatch<SetStateAction<boolean>>; 
    topRow: Array<TileType>,
    steppingStone: TileType, 
    bottomRow: Array<TileType>
    setTopRow: Dispatch<SetStateAction<Array<TileType>>>,
    setBottomRow: Dispatch<SetStateAction<Array<TileType>>>
    setSteppingStone: Dispatch<SetStateAction<TileType>>
    steppingStoneUtil: (steppingStone: TileType) => void;
    pointChanger: (tile: TileType, steppingStone: TileType) => void; 
    resetTiles: () => void; 
    isSteppingStone: (tile: TileType) => boolean;
}

const tileContextInitialValue = {
    selected: false, 
    setSelected: () => undefined,
    topRow: getTopRow(),
    bottomRow: getBottomRow(),
    steppingStone: theSteppingStone,
    setTopRow: () => {},
    setBottomRow: () => {},
    setSteppingStone: () => {},
    steppingStoneUtil: () => {},
    pointChanger: () => {},
    resetTiles: () => {},
    isSteppingStone: () => false
}

const TileContext = createContext<TileContextType>(tileContextInitialValue)


export const TileContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const [selected, setSelected] = useState(false)
    const [topRow, setTopRow] = useState<Array<TileType>>(getTopRow())
    const [bottomRow, setBottomRow] = useState<Array<TileType>>(getBottomRow())
    const [steppingStone, setSteppingStone] = useState<TileType>(theSteppingStone)

    const steppingStoneUtil = (steppingStone: TileType) => {
        if(steppingStone){
            if(topRow.includes(steppingStone.prev)) {
                const rowWithNoXs = topRow.filter((tile) => tile?.imgUrl !== pixelx && tile?.imgUrl !== pixelx)
                if(rowWithNoXs.length === 4){
                    if(topRow[2]) topRow[2].imgUrl = pixelx
                    if(topRow[3]) topRow[3].imgUrl = pixelx
                    setTopRow(topRow)
                } else {
                    if(topRow.includes(steppingStone.prev)) {
                        if(topRow[2]) topRow[2].imgUrl = flower3
                        if(topRow[3]) topRow[3].imgUrl = flower4
                        setTopRow(topRow)
                    } else {
                        if(bottomRow[2]) bottomRow[2].imgUrl = flower11
                        if(bottomRow[3]) bottomRow[3].imgUrl = flower12
                        setBottomRow(bottomRow)
                    }
                }
               
             }
             if(bottomRow.includes(steppingStone.prev)) {
                if(bottomRow[2]) bottomRow[2].imgUrl = pixelx
                if(bottomRow[3]) bottomRow[3].imgUrl = pixelx
                setBottomRow(topRow)
                setSteppingStone(steppingStone)
              }      
     }
     
    }

    const pointChanger = (tile: TileType, steppingStone: TileType) => {
        if(topRow[2] === tile && tile?.selected && !steppingStone?.selected) {
            if(topRow[3]) topRow[3].val = 3
            setTopRow(topRow)
        }
        if(bottomRow[2] === tile && tile?.selected && !steppingStone?.selected) {
            if(bottomRow[3]) bottomRow[3].val = 3
            setBottomRow(bottomRow)
        }
        if(!tile?.selected) {
            console.log('is this happening', tile)
            if(topRow.includes(tile) && topRow[3]) {
                topRow[3].val = 1
                setTopRow(topRow)
            }
            if(bottomRow.includes(tile) && bottomRow[3]) {
                bottomRow[3].val = 1
                setBottomRow(bottomRow)
            }

        }

    }

    const createSteppingStone = () => {
        let steppingStone = new Tile(2, null, topRow[2], bottomRow[2], cat)
        if(topRow[1]) topRow[1].right = steppingStone;
        if(bottomRow[1]) bottomRow[1].left = steppingStone
        setTopRow(topRow)
        setBottomRow(bottomRow)
        return steppingStone
    }

    const isSteppingStone = (tile: TileType) => {
        return tile?.imgUrl === cat
               }

    const resetTiles = () => {
        const newTopRow = getTopRow() 
        const newBottomRow = getBottomRow() 
        const newSteppingStone = createSteppingStone() 
        setTopRow(newTopRow)
        setBottomRow(newBottomRow)
        setSteppingStone(newSteppingStone)

    }




   return(
    <TileContext.Provider value={{isSteppingStone, selected, setSelected, topRow, bottomRow, steppingStone, setTopRow, setBottomRow, setSteppingStone, steppingStoneUtil, pointChanger, resetTiles }}>
        { children }
    </TileContext.Provider>
   ) 
   }

export const useTileContext = () => {
    const { isSteppingStone,  selected, setSelected, topRow, bottomRow, steppingStone, setTopRow, setBottomRow, setSteppingStone, steppingStoneUtil, pointChanger, resetTiles} = useContext(TileContext)
    return { isSteppingStone, selected, setSelected, topRow, bottomRow, steppingStone, setTopRow, setBottomRow, setSteppingStone, steppingStoneUtil, pointChanger, resetTiles }
  }