import React from 'react'
import sControls from "../../../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators";


const EditNameForm = (props) => {
    return(
        <form className="form" onSubmit={props.handleSubmit}>
            <div className="fieldWrapper">
                <Field placeholder={"New name"} name={"name"}
                    validate={[required]}
                    component={Input}/>
                
                <Field placeholder={"password"} name={"password"} type={"password"}
                    validate={[required]}
                    component={Input}/>
            </div>
            { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
            <button className="button" >Change Name</button>
        </form>
    )
}

const EditNameReduxForm =  reduxForm({form: 'update_user_data'})(EditNameForm)

 let NameForm = (props) => {
    const onSubmit = (formData) => {
        props.updateData(formData.name, props.emali, formData.password);
    }

    return (
        <div>
            <EditNameReduxForm onSubmit={onSubmit} {...props}/>
        </div>
    )
}

export default NameForm;