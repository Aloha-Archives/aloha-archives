import React from 'react';
import InfoPageLayout from '@/components/InfoPageLayout';

const ContactUsText = () => (
  <InfoPageLayout title="Contact Us">
    <div className="contact-us-text">
      <p>
        We&apos;d love to hear from you! Whether you&apos;re a researcher looking to share a dataset,
        a student seeking collaboration, or just curious about our platform,
        don&apos;t hesitate to reach out.
      </p>
      <h2>Get in Touch</h2>
      <p>
        Email us at
        {' '}
        <a
          href="mailto:alohaarchives@gmail.com"
          className="text-blue-600 hover:underline"
        >
          alohaarchives@gmail.com
        </a>
        . We aim to respond to all inquiries within 2-3 business days.
      </p>
      <h2>Connect with Us</h2>
      <p>
        Follow our journey and stay updated on the latest developments:
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/ics-314-team-4/aloha-archives"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  </InfoPageLayout>
);

export default ContactUsText;
