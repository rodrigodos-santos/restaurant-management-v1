import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Titulo } from './styled';

import { PageContainer, PageTitle } from '../../components/Helpers/MainComponent'

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();

    let { nome } = useParams();

    const name = useSelector(state => state.user.name);

    const handleTextChange = (e) => {
        dispatch({
            type: 'SET_NAME',
            payload:{
                name: e.target.value
            }
        });
    }

    return (
        <PageContainer>
            <PageTitle>Tela2 de {nome}</PageTitle>

            <input type="text" value={name} onChange={handleTextChange} />

            <button onClick={()=>history.goBack()}>Voltar</button>
        </PageContainer>
    );
}