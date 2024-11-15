import { Container } from 'react-bootstrap';

const ContactUsText = () => (
  <Container className="info-container">
    <h1>Contact Us</h1>
    <p>
      If you have any questions or comments, please contact us at
      {' '}
      <a href="mailto:alohaarchives@gmail.com">alohaarchives@gmail.com</a>
      .
    </p>
  </Container>
);

export default ContactUsText;
