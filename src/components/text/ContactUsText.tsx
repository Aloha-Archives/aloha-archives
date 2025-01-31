import InfoPageLayout from '@/components/InfoPageLayout';

const ContactUsText = () => (
  <InfoPageLayout title="Contact Us">
    <h2>Get in Touch</h2>
    <p>
      Have a question, suggestion, or need assistance? We're here to help! You can reach us at{' '}
      <a href="mailto:alohaarchives@gmail.com" className="text-primary">alohaarchives@gmail.com</a>.
    </p>

    <h2>Quick Response Form</h2>
    <p>
      For faster assistance, please use our contact form below. We'll get back to you as soon as possible.
    </p>

    <div className="d-flex justify-content-center mt-4">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSf9vFMqi9qQ-Iirv3w-TZXms1KC9UKVVoRt-esB84WGYa_FDw/viewform?embedded=true"
        width="100%"
        height={1285}
        style={{ maxWidth: '640px' }}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Us Form"
      >
        Loading…
      </iframe>
    </div>
  </InfoPageLayout>
);

export default ContactUsText;
