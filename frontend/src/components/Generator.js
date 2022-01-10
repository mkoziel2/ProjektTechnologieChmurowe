import { Button, TextField } from "@material-ui/core"
import { useState } from "react";

const Generator = ({setPopupGen, popupGen}) => {

    const [token, setToken] = useState('---')
    const [active, setActive] = useState('---')
    const [sendToken, setSendToken] = useState('')
    const axios = require("axios");

    const generateToken = async () => {
        const result = await axios.post('api/tokens/generate');
        setToken(result.data);
    };

    const checkToken = async (token) => {
        const result = await axios.post(`api/tokens/${token}`);
        setActive(result.data);
    };

    return (
        <div className="backGen" style={popupGen ? {display: 'flex'} : {display: 'none'}}>
            <div className="contentGen">
                <div className="clsrGen" onClick={() => setPopupGen(false)}>
                    X
                </div>
                <div className="genGen">
                    <p className='token'>Your token: {token}</p>
                    <Button className='generate' variant='contained' color='secondary' onClick={() => {generateToken()}}>
                        GENERATE
                    </Button>
                    <p className='info'>Token is active for 20 seconds.</p>
                </div>
                <div className="checkGen">
                    <TextField className='inputGen' onChange={(e) => {setSendToken(e.target.value)}}/>
                    <Button className='check' variant='contained' color='secondary' onClick={() => {checkToken(sendToken)}}>
                        CHECK
                    </Button>
                    <p className='active'>Active: {active}</p>
                </div>
            </div>
        </div>
    );
};

export default Generator;