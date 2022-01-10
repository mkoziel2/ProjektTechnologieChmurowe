import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const EditForm = ({setPopupEditor, popupEditor, p, refreshCards}) => {

    const editCard = async (c, id) => {
        axios.put(`api/cards/${id}`, c);
    };


    const deleteCard = (c) => {
        axios.delete(`api/cards/${c._id}`)
        setTimeout(() => refreshCards(), 500);
    };

    return (
        <div style={popupEditor ? {display: 'flex'} : {display: 'none'}} className='backAdder'>
        <Formik
            initialValues={{name: p.name, date: p.date, text: p.text}}
            onSubmit={(values, { resetForm }) => {
                setPopupEditor(false);
                editCard(values, p._id);
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
                        <div className='clsr' onClick={() => {setPopupEditor(false)}}>X</div>
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
                        <div className='editorSubmit'>
                            <Button variant="contained" type="submit">
                                Edit
                            </Button>
                            <Button variant="contained" onClick={() => {deleteCard(p); setPopupEditor(false);}}>
                                Delete
                            </Button>
                        </div>
                        
                    </div>
                </Form>
            )}
        </Formik>
    </div>
    );
};

export default EditForm;