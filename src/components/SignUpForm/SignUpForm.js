import React, { useState} from 'react';
import { Button, Row, Col, Spinner, Form } from "react-bootstrap";
import { values, size } from "lodash";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth"

import "./SignUpForm.scss";
import { toast } from 'react-toastify';

export default function SignUpForm(props) {
    const {setShowModal}=props;
    const [formdata, setFormdata] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false)
    
    const onSubmit=e=>{
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
        //si todos las claves no tienen valor, se informa que deben completar todos los 
        //datos del formulario
        if(validCount!== size(formdata)){
            toast.warning("Completa todos los campos del formulario");
        }else{
            //valido el email con la función que se ha importado de validación
            //con expresiones regulares
            if(!isEmailValid(formdata.email)){
                toast.warning("Formado de Email inválido!")
            }else if(formdata.password!==formdata.repeatPassword) {
                //Si las contraseñas no coinciden...
                toast.warning("Las contraseñas deben ser iguales")
            }else if(size(formdata.password)<6){
                //Y por último si la longitud de la contraseñas es menor a 6 caracteres
                toast.warning("La longitud mínima de la contraseña es de 6 caracteres")
            }else{
                //se cambia el icono del botón
                setSignUpLoading(true);
                //y se envía al servidor, procesando la respuesta
                signUpApi(formdata)
                    .then(response => {
                    if (response.code) {
                        toast.warning(response.message);
                    } else {
                        toast.success("El registro ha sido correcto");
                        setShowModal(false);
                        setFormdata(initialFormValue());
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


    }
    
    return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} className="pruebajosue">
        <Form.Group className="pruebajosue2"> 
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                defaultValue={formdata.nombre}
                onChange={e=>setFormdata({...formdata,nombre:e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                defaultValue={formdata.apellidos}
                onChange={e=>setFormdata({...formdata,apellidos:e.target.value})}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="pruebajosue2">
          <Form.Control
            type="email"
            placeholder="Correo electronico"
            name="email"
            defaultValue={formdata.email}
            onChange={e=>setFormdata({...formdata,email:e.target.value})}
          />
        </Form.Group>
        <Form.Group className="pruebajosue2">
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formdata.password}
                onChange={e=>setFormdata({...formdata,password:e.target.value})}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="repeatPassword"
                defaultValue={formdata.repeatPassword}
                onChange={e=>setFormdata({...formdata,repeatPassword:e.target.value})}
              />
            </Col>
          </Row>
        </Form.Group>

               <Button variant="primary" type="submit">
                   {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
               </Button>
           </Form>
        </div>
    )
}

function initialFormValue() {
    return {
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      repeatPassword: ""
    };
}