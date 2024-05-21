import { createContext, useContext, useState } from "react";

type PointContextType = {
    points: number;
    startingPoints: number;
    addPoints: (num: number) => void; 
    subtractPoints: (num: number) => void,
    increasePointBank: (num: number) => void,
    decreasePointBank: (num: number) => void,
    resetPoints: () => void
}

const pointContextInitialValue: PointContextType = {
    points: 0,
    startingPoints: 6,
    addPoints: (num: number) => {},
    subtractPoints: (num: number) => {},
    increasePointBank: (num: number) => {},
    decreasePointBank: (num: number) => {},
    resetPoints: () => {}
}

const PointContext = createContext<PointContextType>(pointContextInitialValue)

export const PointContextProvider =  ({ children }: { children: React.ReactNode }) => {
    const [points, setPoints] = useState(0)
    const [startingPoints, setStartingPoints] = useState(6)

    const useAddPoints = (num: number) => {
        setPoints(points + num)
    }

    const useSubtractPoints = (num: number) => {
        setPoints(points-num)
    }

    const useIncreaseStartingPoints = (num: number) => {
        setStartingPoints(startingPoints + num)
    }

    const useDecreaseStartingPoints = (num: number) => {
        setStartingPoints(startingPoints - num)
    }

    const useReset = () => {
        setPoints(0)
        setStartingPoints(6)
    }


  
   return(
    <PointContext.Provider value={{points, startingPoints, addPoints: useAddPoints, subtractPoints: useSubtractPoints, increasePointBank: useIncreaseStartingPoints, decreasePointBank: useDecreaseStartingPoints, resetPoints: useReset}}>
        { children }
    </PointContext.Provider>
   ) 
}

export const usePointContext = () => {
    const { points, startingPoints, addPoints, subtractPoints, increasePointBank, decreasePointBank, resetPoints } = useContext(PointContext)
    return { points, startingPoints, addPoints, subtractPoints, increasePointBank, decreasePointBank,  resetPoints }
  }