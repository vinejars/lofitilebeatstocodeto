import { FC } from "react"
import { usePointContext } from "../framework/PointContext"
import styled from 'styled-components'


const PointBox = styled.div`
color: rgb(255, 255, 255); 
display: flex; 
flex-direction: column;
align-items: center; 
justify-content: center; 
height: 30%;
`

const PointboxContainer = styled.div`
left: 2rem;  
bottom: 1rem;
position: absolute; 
width: 10vw;
`

const Pointbox: FC = () => {
    const { points, startingPoints } = usePointContext()
    return (
        <PointboxContainer>
        <PointBox>
        <h3> points: </h3>
        <h1>{points}/{startingPoints}</h1>
      </PointBox>
      </PointboxContainer>

    )
}

export default Pointbox