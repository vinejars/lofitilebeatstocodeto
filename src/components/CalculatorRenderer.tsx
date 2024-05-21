import { FC } from "react"
import TileType from "../tiles/tile"
import TileRenderer from "./TileRenderer"
import { useTileContext } from "../framework/TileContext"
import { usePointContext } from "../framework/PointContext"
import cat from '../tiles/cat.png'
import ErrorModal from "./ErrorModal"
import { useErrorModalContext } from "../framework/ErrorModalContext"
import styled from "styled-components"

export type CalculatorRendererProps = {
    topRow: Array<TileType>;
    steppingStone: TileType;
    bottomRow: Array<TileType>;
    clickHandler:(tile: TileType, steppingStone: TileType, topRow: Array<TileType> ) => void
} 

const Row = styled.div`
display: flex;
flex-direction: row; 
justify-content:center; 
align-items: center; 
background: transparent;`

const CalculatorRenderer: FC<CalculatorRendererProps> = ({topRow, steppingStone, bottomRow, clickHandler}) => {
    const { setSelected, pointChanger, steppingStoneUtil } = useTileContext()
    const { subtractPoints, increasePointBank } = usePointContext()
    const { setShowErrorModal } = useErrorModalContext()
    
    
    const tiles = document.getElementsByClassName('tile')
    Array.prototype.forEach.call(tiles, (tile: any) => {
        tile.addEventListener('contextmenu', (e: MouseEvent) => {
            e.preventDefault() 
        })
    })

    const handleRightClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, tile: TileType) => {
        e.preventDefault() 
        if(tile) {
            setSelected(false)
            tile.selected = false; 
            subtractPoints(tile.val)
            increasePointBank(tile.val)
            if((topRow[3] && topRow[3].val === 3) || (bottomRow[3] && bottomRow[3].val === 3)) {
              pointChanger(tile, steppingStone)
            }
            if(tile.imgUrl === cat) steppingStoneUtil(tile)
        }
    
    }

    return (
        <>
        {/* top row */}
            
        <Row>
     {topRow.map((tile) => {
         if(tile) {
             return (
              <TileRenderer tile={tile} clickHandler={clickHandler} rightClick={handleRightClick}/> 
             )
         } else {
             return <ErrorModal modalClickHandler={setShowErrorModal} message="something's borked w your top row"/>
         }
     })}
            </Row>


        {/* stepping stone */}
                <TileRenderer tile={steppingStone} clickHandler={clickHandler} rightClick={handleRightClick}/>
                

        {/* bottom row */}
            <Row>
            {bottomRow.map((tile) => {
         if(tile) {
             return (
                <TileRenderer tile={tile}  clickHandler={clickHandler} rightClick={handleRightClick}/> 

             )
         } else {
            return <ErrorModal modalClickHandler={setShowErrorModal} message="something's borked with your bottom row"/>
        }
     })}
            </Row>
            </>
    )
}

export default CalculatorRenderer