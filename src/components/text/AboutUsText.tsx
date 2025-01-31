import InfoPageLayout from '@/components/InfoPageLayout';

const AboutUsText = () => (
  <InfoPageLayout title="About Us">
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
      At Aloha Archives, we're dedicated to making data more accessible and easier to discover.
      Our platform serves as a bridge between researchers, students, and data enthusiasts,
      helping them find and utilize the datasets they need for their work.
    </p>
    <h2>Our Values</h2>
    <ul>
      <li><strong>Accessibility:</strong> Making data discovery simple and intuitive for everyone</li>
      <li><strong>Community:</strong> Building a collaborative environment for data sharing</li>
      <li><strong>Innovation:</strong> Continuously improving our platform with modern technology</li>
      <li><strong>Quality:</strong> Ensuring high standards in data curation and presentation</li>
    </ul>
  </InfoPageLayout>
);

export default AboutUsText;
