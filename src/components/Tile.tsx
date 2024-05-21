import React, { FC } from "react"
import styled from 'styled-components'
import { useErrorModalContext } from "../framework/ErrorModalContext"
import { useTileContext } from "../framework/TileContext"
import ErrorModal from "./ErrorModal"
import { TileRendererProps } from "./TileRenderer"

type TileProps = Omit<TileRendererProps, 'children'> 

const TileWrapper = styled.div<{$selected: boolean}>`
border: 5px solid;
border-color: transparent;
background-color: rgba(220, 250, 255, 0.144);
color: white;
width: 5rem;;
height: 5rem;; 
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-image:  ${ props => props.$selected ? 'linear-gradient(rgb(148, 250, 255) 50%, white 50%, rgb(247, 153, 226) 54%, rgb(149, 71, 250))' : undefined};
border-image-slice: ${ props => props.$selected ? 1 : undefined};
background-origin: ${ props => props.$selected ? 'border-box' : undefined};
background-clip: ${ props => props.$selected ? 'content-box, border-box' : undefined};
&:hover {
    border: 5px solid;
    border-image: linear-gradient(rgb(148, 250, 255) 50%, white 50%, rgb(247, 153, 226) 54%, rgb(149, 71, 250));
    border-image-slice: 1;
    background-origin: border-box;
    background-clip: content-box, border-box;
}
&:active {
    background: rgb(63, 4, 117);
    color: rgb(113, 94, 196); 
}
`

const TilePoint = styled.div`
display: flex; 
justify-content: center; 
align-content: center; 
width: 2rem;
margin-top: 1rem;
border: .1rem solid;
border-image: linear-gradient(rgb(148, 250, 255) 50%, white 50%, rgb(247, 153, 226) 54%, rgb(149, 71, 250));
border-image-slice: 1;
background-origin: border-box;
background-clip: content-box, border-box;
background-color: black;
color: white;
`

const TileIcon = styled.img`
    width: 4rem;
    height: 4rem;
    margin: 2rem;
  `

const Tile: FC<TileProps> = ({ tile, clickHandler, rightClick }) => {
    const { topRow, steppingStone, isSteppingStone } = useTileContext();  
    const { setShowErrorModal } = useErrorModalContext() 
    
      if(tile){
        return ( 
        <>
         <TileWrapper tab-index={!isSteppingStone(tile) ? 0 : 1} key={Date.now()} $selected={tile?.selected} onClick={() => clickHandler(tile, steppingStone, topRow)} onContextMenu={(e: React.MouseEvent<HTMLElement, MouseEvent>) => rightClick(e, tile)}>
             <TileIcon src={tile?.imgUrl} alt='tile'/> 
        </TileWrapper>   
        <TilePoint>
         {tile?.val}
        </TilePoint>        
             </>
        )
      } else {
        return (
            <ErrorModal modalClickHandler={setShowErrorModal} message="how is the tile invalid in the literal tile component"/>
        )
      }
        
    }

export default Tile 