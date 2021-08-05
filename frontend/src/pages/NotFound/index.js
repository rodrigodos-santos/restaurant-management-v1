import React from 'react'
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();

    const backHome = () => {
        history.push('/');
    }

    return (
        <div>
            <h1>Página não encontrada</h1>
            <button onClick={backHome}>Voltar para a Home</button>
        </div>

    );
}