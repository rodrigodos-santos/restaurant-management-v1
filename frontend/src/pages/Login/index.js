import React from 'react'
import { PageArea } from './styled'

import { PageContainer, PageTitle } from '../../components/Helpers/MainComponent'
import FieldFormComponent from '../../components/FieldFormComponent'

export default () => {
    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                <form>
                    <FieldFormComponent title="E-mail" type="text"/>
                    <FieldFormComponent title="Senha" type="password"/>
                    <FieldFormComponent title="Lembrar Senha" type="checkbox"/>
                    <FieldFormComponent title="Fazer Login" type="button"/>
                </form>
            </PageArea>
        </PageContainer>
    )
}