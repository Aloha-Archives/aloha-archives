import InfoPageLayout from '@/components/InfoPageLayout';

const FeedbackText = () => (
  <InfoPageLayout title="Feedback">
    <p>
      We value your input! Please use the form below to share your thoughts, suggestions, or report any issues.
      Your feedback helps us improve Aloha Archives and better serve our community.
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
        title="Feedback Form"
      >
        Loading…
      </iframe>
    </div>
  </InfoPageLayout>
);

export default FeedbackText;
