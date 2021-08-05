import React from 'react'
import { LabelArea, Title, Input } from './styled'

export default ({ title, type }) => {
    const isButton = type == 'button'
    const isCheckbox = type == 'checkbox'
    return(
        <LabelArea>
            <Title>{!isButton && title}</Title>
            <Input checkbox={isCheckbox}>
                {!isButton && <input type={type} />}
                {isButton && <button>{title}</button>}
            </Input>
        </LabelArea>
    );
}
