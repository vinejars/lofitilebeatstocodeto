import { FC } from "react";
import  styled  from 'styled-components'
import { ArchetypeHeader, ArchetypeModalButton } from "./ArchetypeModal";
import ModalWrapper from "./ModalWrapper";

export type ErrorModalProps = {
    modalClickHandler: (state: boolean) => void; 
    message?: string
}

const ErrorModalButton = styled(ArchetypeModalButton)`
box-shadow: 0rem 0rem 1rem 0rem #f3488d;
`
const ErrorModalText = styled(ArchetypeHeader)`
box-shadow: 0rem 0rem 1rem 0rem #f3488d;
`

const ErrorModal: FC<ErrorModalProps> = ({ modalClickHandler, message="Hey! You have to go in order!"}) => {
    
    return (
        <ModalWrapper> 
           <ErrorModalText> {message}</ErrorModalText>
           <ErrorModalButton onClick={() => modalClickHandler(false)}><p><b>X</b></p></ErrorModalButton>
        </ModalWrapper>
    )
}

export default ErrorModal;