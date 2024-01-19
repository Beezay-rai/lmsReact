import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";

export const SInputField = styled.div`
    width:200px;
    margin:10px;
`

export const SPanelBody = styled.div`
    background-color:white;
    width:auto;
    height:auto;
    padding:20px;
    border-radius:20px;
`
export const TextArea = styled.textarea`
    border:1px solid silver;
    padding:10px;
    border-radius:5px;
    :focus{
        outline:2px solid #0973de;
    }
`