import React from 'react'
import { LabelArea, Title, Input } from './styled'

export default ({ children, title, type }) => {
    const isCheckBox = type == 'checkbox'
    return(
        <LabelArea>
            <Title>{title}</Title>
            <Input isCheckBox={isCheckBox}>
                {children}
            </Input>
        </LabelArea>
    );
}
