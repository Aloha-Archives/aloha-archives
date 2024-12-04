import { Container } from 'react-bootstrap';

const ContactUsText = () => (
  <Container className="info-container" style={{ maxWidth: '960px' }}>
    <h1>Contact Us</h1>
    <p>
      If you have any questions or comments, please contact us at
      {' '}
      <a href="mailto:alohaarchives@gmail.com">alohaarchives@gmail.com</a>
      .
    </p>
    <p>Feel free to provide your feedback using the form below.</p>
    { /* eslint-disable-next-line max-len */ }
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSf9vFMqi9qQ-Iirv3w-TZXms1KC9UKVVoRt-esB84WGYa_FDw/viewform?embedded=true"
      width={640}
      height={1285}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Contact Us Form"
    >
      Loading…
    </iframe>
  </Container>
);

export default ContactUsText;
