import styled from "styled-components"

export const LabelArea = styled.label`
    display: flex;
    align-items: center;
    padding: 10px;
    max-width: 900px;
`
export const Title = styled.div`
    width: 200px;
    text-align: right;
    padding-right: 20px;
    font-weight: bold;
    font-size: 14px;
`
export const Input = styled.div`
    flex: 1;

    input{
        width: ${props=>props.isCheckBox  ? '' : '70%'};
        font-size: 14px;
        padding: 5px;
        border: 1px solid #DDD;
        border-radius: 3px;
        outline:0;
        transition: all ease .5s;
        
        &:focus{
            border: 1px solid #333;
            color: #333
        }
    }
    
    button{
        background-color: #015508;
        border: 0;
        outline: 0;
        padding: 5px 10px;
        border-radius: 4px;
        color: #FFF;
        font-size: 15px;
        cursor: pointer;

        &:hover {
            background-color: #001F02
        }
    }
`