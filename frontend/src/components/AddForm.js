import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddForm = ({setPopupAdder, popupAdder, refreshCards}) => {

    const axios = require("axios");

    const sendCard = (c) => {
        axios.post("api/cards", c)
    };

    return (
        <div style={popupAdder ? {display: 'flex'} : {display: 'none'}} className='backAdder'>
        <Formik
            initialValues={{name: '', date: '', text: ''}}
            onSubmit={(values, { resetForm }) => {
                setPopupAdder(false);
                sendCard(values);
                setTimeout(() => refreshCards(), 500);
                resetForm({});
            }}
            onResetting={({ resetForm }) => {
                resetForm({});
            }}
            enableReinitialize={true}
            >
            {({ errors, touched }) => (
                <Form>
                    <div className='adderContent'>
                        <div className='clsr' onClick={() => {setPopupAdder(false)}}>X</div>
                        <div className='adderField'>
                            <Field
                                id="outlined-name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                as={TextField}
                            />
                            {errors.text && touched.text && <div style={{color: 'red'}}>{errors.text}</div>}
                        </div>
                        <div className='adderField'>
                            <Field
                                id="outlined-date"
                                name="date"
                                label="Date"
                                placeholder="DD.MM.YYYY"
                                variant="outlined"
                                as={TextField}
                            />
                            {errors.text && touched.text && <div style={{color: 'red'}}>{errors.text}</div>}
                        </div>
                        <div className='adderField'>
                            <Field
                                id="outlined-multiline-static"
                                name="text"
                                label="Text"
                                multiline
                                rows={4}
                                placeholder="Write a message"
                                variant="outlined"
                                as={TextField}
                            />
                            {errors.text && touched.text && <div style={{color: 'red'}}>{errors.text}</div>}
                        </div>
                        <div className='adderSubmit'>
                            <Button variant="contained" type="submit">
                                Add
                            </Button>
                        </div>
                        
                    </div>
                </Form>
            )}
        </Formik>
    </div>
    );
};

export default AddForm;