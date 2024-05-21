import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type ModalWrapperProps = {
    children: Array<ReactNode>
}

const Modal = styled.div`
display: flex;
flex-direction: column; 
align-items: center; 
justify-content: center; 
height: 70vh;
width: 100vh; 
border: 1rem solid;
border-radius: 10px;
background-image: url('https://64.media.tumblr.com/332dfe8aaee1f28a52e5397a65012c62/ca5ff272999b770c-15/s1280x1920/81704a883046281635dec0e7e3cb05e7347c663d.gif');  
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

const ModalContainer = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`

const ModalWrapper: FC<ModalWrapperProps> = ({ children }) => {
    return (
        <ModalContainer>
            <Modal>
                {children}
            </Modal>
        </ModalContainer>
    )
}

export default ModalWrapper