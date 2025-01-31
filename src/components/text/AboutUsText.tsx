import React from 'react';
import InfoPageLayout from '@/components/InfoPageLayout';

const AboutUsText = () => (
  <InfoPageLayout title="About Us">
    <div className="about-us-text">
      <p>
        We are a team of students in the Computer Science department at the University of Hawaii.
        Organized and captained by JR Lee, the team members include Jared Seto, Shaelyn Loo, and
        Kevin Clarkin. Sharing a class called ICS 314, we named ourselves ICS 3+1=4, since there
        were 3 of us, we added 1 more, and we are Section 4. Only after countless hours (and some
        head banging on the table) did we finally arrive at (the much catchier) Aloha Archives,
        thanks to a moment of inspiration by Shaelyn. We have carried the name with us ever since.
      </p>
      <h2>Our Mission</h2>
      <p>
        At Aloha Archives, we are driven by a passion to transform the way people
        interact with data. Our core values define our approach:
      </p>
      <ul>
        <li>
          <strong>
            Making data discovery simple and intuitive
          </strong>
          for everyone
        </li>
        <li>
          <strong>
            Building a collaborative environment
          </strong>
          for data sharing
        </li>
        <li>
          <strong>
            Continuously improving our platform
          </strong>
          with modern technology
        </li>
        <li>
          <strong>
            Ensuring high standards
          </strong>
          in data curation and presentation
        </li>
      </ul>
      <p>
        We believe that data should be accessible, understandable, and actionable.
        Our platform is designed to break down complex information into clear,
        meaningful insights that empower users across various domains.
      </p>
    </div>
  </InfoPageLayout>
);

export default AboutUsText;
