import React, { FC } from "react"
import styled from 'styled-components'
import { useErrorModalContext } from "../framework/ErrorModalContext"
import TileType from "../tiles/tile"
import { CalculatorRendererProps } from "./CalculatorRenderer"
import ErrorModal from "./ErrorModal"
import Tile from "./Tile"
import flower12 from '../tiles/flower12.png'
import flower4 from '../tiles/flower4.png'
import pixelx from '../tiles/pixelx.png'
import { useTileContext } from "../framework/TileContext"




export type TileRendererProps = {
    tile: TileType;
    rightClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, tile: TileType) => void;
} & Pick<CalculatorRendererProps, 'clickHandler'>

const TileLayout = styled.div`
display: flex;
flex-direction: column; 
align-items: center; 
justify-content: center;
`
const TileAndConnectionLayout = styled(TileLayout)`
flex-direction: row;
align-content: center; 
margin-top: 3rem;
`
const Connection = styled.div`
height: 1.5rem;
width: 5rem;
background-image: linear-gradient(90deg, rgba(148,250,255,1) 0%, rgba(247,153,226,1) 50%, rgba(149,71,250,1) 100%)
`

const TileRenderer: FC<TileRendererProps> = ({tile, clickHandler, rightClick }) => {
    const { setShowErrorModal } = useErrorModalContext()
    const { isSteppingStone, topRow, bottomRow } = useTileContext()
    const showConnection = !isSteppingStone(tile) && tile !== topRow[3] && tile !== bottomRow[3]
    if(tile) {
        return (
            <TileAndConnectionLayout>
                <TileLayout>
                    <Tile tile={tile} clickHandler={clickHandler} rightClick={rightClick} />
                </TileLayout>
              {showConnection && <Connection/>}  
            </TileAndConnectionLayout>
          )
    } else {
        return (
            <ErrorModal modalClickHandler={setShowErrorModal} message="Something's up in the TileRenderer"/>
        )
    }

        
}

export default TileRenderer