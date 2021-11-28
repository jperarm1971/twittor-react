import React, { useState}  from 'react'
import { Form, Button, Spinner } from "react-bootstrap"
import { values, size } from "lodash";
import { toast } from 'react-toastify';
import { signInApi, setTokenApi } from "../../api/auth"

import "./SignInForm.scss"

export default function SignInForm(props) {
    const {setShowModal,setRefreshCheckLogin}=props;
    const [formdata, setFormdata] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false)

    const onSubmit = e =>{
        e.preventDefault();
        console.log(formdata);
        //Validaciones del formulario
        let validCount=0;
        //Con esto hago una especie de bucle y cuento las claves que tengan valor
        // en formdata
        values(formdata).some(value=>{
            value && validCount++;
            return null;
        })
        if(validCount!== size(formdata)){
            toast.warning("Completa todos los campos del formulario");
        }else{
            setSignUpLoading(true);
                //y se envía al servidor, procesando la respuesta
                signInApi(formdata)
                    .then(response => {
                    if (response.message) {
                        toast.warning(response.message);
                    } else {
                        setTokenApi(response.token);
                        setRefreshCheckLogin(true);
                    }
                    })
                    .catch(() => {
                        toast.error("Error del servidor, inténtelo más tarde!");
                    })
                    .finally(() => {
                        setSignUpLoading(false);
                    });
                //setShowModal(false);
        }
    }


    return (
        <div className="sign-in-form">
            <h2>Login</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className="form-group-class">
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        defaultValue={formdata.email}
                        onChange={e=>setFormdata({...formdata,email:e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="form-group-class">
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        defaultValue={formdata.password}
                        onChange={e=>setFormdata({...formdata,password:e.target.value})}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signUpLoading ? "Iniciar sesión" : <Spinner animation="border" />}
               </Button>
            </Form>

        </div>
    )
}

function initialFormValue() {
    return {
      email: "",
      password: ""
    };
}