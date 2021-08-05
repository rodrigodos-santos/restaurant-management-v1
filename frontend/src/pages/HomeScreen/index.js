import React from 'react';
import { useHistory } from "react-router-dom";

import { PageContainer, PageTitle } from '../../components/Helpers/MainComponent'

export default () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/tela2/testador');
    }

    return (
        <PageContainer>
            <PageTitle>Homepage</PageTitle>
            <button onClick={handleButtonClick}>Ir para Tela 2</button>
        </PageContainer>
    );
}