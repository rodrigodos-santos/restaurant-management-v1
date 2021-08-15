import React, { useState } from 'react'
import { PageArea } from './styled'

import FieldForm from '../../components/FieldForm'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/Helpers/MainComponent'
import RestautantAPI from '../../components/Helpers/RestaurantAPI'
import { doLogin } from '../../components/Helpers/AuthHandler'

export default () => {
    const api = RestautantAPI()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)

        const json = await api.login(email, password)

        if(json.error){
            setError(json.error)
        }else{
            doLogin(json.token, rememberPassword) 
            window.location.href = '/'
        }
        setDisabled(false)
    }

    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <FieldForm title="E-mail">
                        <input
                            type="email"
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                        />
                    </FieldForm>
                    <FieldForm title="Senha">
                        <input
                            type="password"
                            disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                        />
                    </FieldForm>
                    <FieldForm title="Lembrar Senha" type="checkbox">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            checked={rememberPassword}
                            onChange={()=>setRememberPassword(!rememberPassword)}
                        />
                    </FieldForm>
                    <FieldForm>
                        <button disabled={disabled}>Fazer Login</button>
                    </FieldForm>
                </form>
            </PageArea>
        </PageContainer>
    )
}