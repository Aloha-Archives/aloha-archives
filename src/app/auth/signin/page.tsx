'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/favorites',
        email,
        password,
      });

      if (result?.error) {
        console.error('Sign in failed: ', result.error);
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center text-contrast">Sign In</h1>
            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
                className="mt-3"
              >
                {error}
              </Alert>
            )}
            <Card>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <input
                      name="email"
                      type="text"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <input
                      name="password"
                      type="password"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                    />
                  </Form.Group>
                  <Button type="submit" className="mt-3 custom-btn">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?
                {' '}
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
