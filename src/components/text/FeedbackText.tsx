import { Container } from 'react-bootstrap';

const FeedbackText = () => (
  <Container className="info-container">
    <h1>Feedback Form</h1>
    <p>
      If you have any feedback, feel free to fill out the form below.
    </p>

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
    ;
  </Container>
);

export default FeedbackText;
