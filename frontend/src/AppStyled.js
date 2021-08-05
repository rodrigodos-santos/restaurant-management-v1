import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100vh;
    background-color: gray;
`
export const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    max-height: 80px;
    max-width: auto;
    align-items: center;
    background: #001F02;  

    .menuItem{
        display:flex;
        margin:2%
    }
    .logo{
        margin:2%
    }
`
export const PageBody = styled.div`
    background-color: #2c3e50;
    background: linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.40)) ,url('/assets/bg.png');
    flex:1
`