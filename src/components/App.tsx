import { useState } from 'react';
import '../App.css';
import TileType from '../tiles/tile';
import ArchetypeModal from './ArchetypeModal';
import CalculatorRenderer from './CalculatorRenderer';
import ErrorModal from './ErrorModal';
import Pointbox from './Pointbox';
import pixelx from '../tiles/pixelx.png'
import { usePointContext } from '../framework/PointContext';
import { useTileContext } from '../framework/TileContext';
import { useArchetypeContext } from '../framework/ArchetypeContext';
import { useErrorModalContext } from '../framework/ErrorModalContext';

function App() {
  const { startingPoints, addPoints, decreasePointBank, resetPoints } = usePointContext()
  const { setSelected, topRow, bottomRow, steppingStone, steppingStoneUtil, pointChanger, resetTiles, isSteppingStone, setSteppingStone} = useTileContext()
  const { setShowArchetypeModal, showArchetypeModal, determineArchetype } = useArchetypeContext() 
  const { setShowErrorModal, showErrorModal } = useErrorModalContext() 

 
  const tileOnClick = (tile: TileType, steppingStone: TileType, topRow: Array<TileType>) => {
    if(topRow[0] === tile) {
      if(bottomRow[0] && bottomRow[0].selected) {
        setShowErrorModal(true)
        return;
      }
    }
    if(bottomRow[0] === tile) {
      if(topRow[0] && topRow[0].selected) {
        setShowErrorModal(true)
        return;
      }
    }
    if(tile?.selected) return;
    if(tile?.imgUrl === pixelx) return;
    if(tile) {
      if(tile.prev && !tile?.prev?.selected) {
        setShowErrorModal(true)
      } else {
        setSelected(true)
        tile.selected = true;
        if(tile.left) tile.left.prev = tile;
        if(tile.right) tile.right.prev = tile;
        setSteppingStone(steppingStone)
        pointChanger(tile, steppingStone)
        if(isSteppingStone(tile)) {
          steppingStoneUtil(steppingStone)
        }
        if(startingPoints - tile.val === 0 ) {
          if(!topRow || !steppingStone) setShowErrorModal(true)
          determineArchetype(topRow, steppingStone)
          resetTiles() 
          setShowArchetypeModal(true)
        }
        addPoints(tile.val)
        decreasePointBank(tile.val)
      }
    } 
  }



  const archetypeOnClick = () => {
    resetPoints()
    resetTiles()
    setShowArchetypeModal(false)
  }


  return (
    <>
    {showErrorModal && <ErrorModal modalClickHandler={setShowErrorModal}/>}
    {showArchetypeModal && <ArchetypeModal clickHandler={archetypeOnClick} allTiles={[...topRow, steppingStone, ...bottomRow]} topRow={topRow} bottomRow={bottomRow} />}
    <CalculatorRenderer topRow={topRow} steppingStone={steppingStone} bottomRow={bottomRow} clickHandler={tileOnClick}/>
      <Pointbox/>
      </>
  );
}

export default App;
