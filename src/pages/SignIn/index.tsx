import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Loading } from "#/components/Loading";
import { Container } from '#/components/Container';
import { User } from '#/models/user';
import styles from './styles.module.scss'

type State = {
    user: User;
};

export const SignIn: React.FC = () => {
    const [isLoading, setLoading] = useState(false);

    const [state, setState] = useState<State>({
        user: {} as User
    });

    const schema = Yup.object().shape({
        email: Yup.string().required("Preencha o campo para continuar."),
        name: Yup.string().required("Preencha o campo para continuar."),
    });

    const {
        errors,
        setFieldValue,
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        touched,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (user: User) => {
            try {
                axios.post('', user)
                    .then(res => {

                        window.location.href = "/"
                    })
            } catch (err) {
                console.log(`😱 Axios request failed: ${err}`)
            }
        },
    });

    return (
        <>
            {isLoading
                ? { Loading }
                : <Container>

                    <h2>SignIn</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group controlId="email" as={Col}>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    value={values.email}
                                    isInvalid={!!touched.email && !!errors.email}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="password" as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} value={values.password} />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            SignIn
                        </Button>
                    </Form>
                </Container>
            }
        </>
    );
}

export default SignIn;