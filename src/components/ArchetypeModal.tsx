import { FC } from "react"
import { useArchetypeContext } from "../framework/ArchetypeContext"
import styled from "styled-components";
import TileType from "../tiles/tile";
import ModalWrapper from "./ModalWrapper";

type ArchetypeModalProps = {
    allTiles: Array<TileType>, 
    topRow: Array<TileType>, 
    bottomRow: Array<TileType>
    clickHandler: (allTiles: Array<TileType>, topRow: Array<TileType>, bottomRow: Array<TileType>) => void; 
}

export const ArchetypeModalButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center; 
    background: #f3488d;
    color: black; 
    border: .2rem solid;
    border-color: black;
    width: 3rem; 
    height: 3rem;
    border-radius: 50%;
    position: absolute;
    top: 1rem;
    right: 1rem;
    text-decoration: bold; 
    padding-bottom: .5rem;
    &:hover {
        color: #f3488d;
        background: black;
        border-color: #f3488d;
    }
`

export const ArchetypeHeader = styled.p`
color: white;
text-shadow: #f3488d 1rem 0 1rem;
background-color: black;
padding: 1rem;
border-radius: 1rem; 
`

const Archetype = styled(ArchetypeHeader)`
box-shadow: 0rem 0rem 1rem 0rem #f3488d;
`

const ArchetypeModal: FC<ArchetypeModalProps> = ({ clickHandler, allTiles, topRow, bottomRow }) => {
    const {archetype} = useArchetypeContext()

    return (
        <ModalWrapper> 
        <ArchetypeHeader>YOUR ARCHETYPE:</ArchetypeHeader>
        <Archetype as='h1'>{archetype?.toUpperCase()}</Archetype>
        <ArchetypeModalButton onClick={() => clickHandler(allTiles, topRow, bottomRow)}><p><b>X</b></p></ArchetypeModalButton>
        </ModalWrapper>
    )
}

export default ArchetypeModal