import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import TileType from "../tiles/tile";

type ArchetypeType = null | 'heavy' | 'healer' | 'rogue' | 'wizard' 



export type ArchetypeContextType = {
    archetype: ArchetypeType;
    showArchetypeModal: boolean;
    setShowArchetypeModal: Dispatch<SetStateAction<boolean>>,
    setArchetype: Dispatch<SetStateAction<ArchetypeType>>
    determineArchetype: (topRow: Array<TileType> | undefined, steppingStone: TileType | undefined, ) => void
}
const archetypeContextInitialValue = {
    archetype: null,
    showArchetypeModal: false,
    setArchetype: () => {},
    setShowArchetypeModal: () => {},
    determineArchetype: () => null
}

const ArchetypeContext = createContext<ArchetypeContextType>(archetypeContextInitialValue)


export const ArchetypeContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const [archetype, setArchetype] = useState<ArchetypeType>(null)
    const [ showArchetypeModal, setShowArchetypeModal ] = useState(false)
    
    const determineArchetype = (topRow: Array<TileType> | undefined, steppingStone: TileType| undefined) => {
        if(steppingStone?.selected && topRow) {
            if(topRow[3] && topRow[3].selected) {
                setArchetype('heavy')
            } else {
                setArchetype('wizard')
            }
        } else if(topRow && topRow[3] && topRow[3].selected) {
            setArchetype('rogue')
        } else {
            setArchetype('healer')
        }
    }

   return(
    <ArchetypeContext.Provider value={{archetype, showArchetypeModal, setShowArchetypeModal, setArchetype, determineArchetype }}>
        { children }
    </ArchetypeContext.Provider>
   ) 
}

export const useArchetypeContext = () => {
    const { archetype, setArchetype, setShowArchetypeModal, showArchetypeModal, determineArchetype } = useContext(ArchetypeContext)
    return { archetype, setArchetype, setShowArchetypeModal, showArchetypeModal, determineArchetype }
  }