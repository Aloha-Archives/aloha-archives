'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import anime from 'animejs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchBar from './SearchBar';

const Explore = () => {
  const router = useRouter();

  useEffect(() => {
    // Select the text wrapper
    const textWrapper = document.querySelector('.ml11 .letters');
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent
        ?.replace(/([\w‘’]+(?:['’]\w+)?|[‘’—,.])/g, "<span class='letter'>$&</span>") || '';

      // Anime.js timeline for the animation
      anime.timeline({ loop: true })
        .add({
          targets: '.ml11 .line',
          scaleY: [0, 1], // Line grows vertically
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 1000, // Adjust the speed of line growth
        })
        .add({
          targets: '.ml11 .line',
          translateX: [0, textWrapper.getBoundingClientRect().width + 10], // Line slides across text
          easing: 'easeOutExpo',
          duration: 2500, // Slower horizontal slide for more emphasis
          delay: 200, // Pause before the slide starts
        })
        .add({
          targets: '.ml11 .letter',
          opacity: [0, 1], // Letters fade in
          translateY: ['1.2em', 0], // Letters drop in from above
          easing: 'easeOutExpo',
          duration: 1000, // Adjust speed for individual letter animations
          offset: '+=100', // Start while the line is still sliding
          delay: (el, i) => 40 * i, // Delay between each letter appearance
        })
        .add({
          targets: '.ml11',
          opacity: [1, 0], // Entire text fades out
          duration: 1500, // Slow fade-out for readability
          easing: 'easeOutExpo',
          delay: 1000, // Hold text visible for longer before fading out
        });
    }
  }, []);

  const handleTopicFilterClick = (topic: string) => {
    const urlParams = new URLSearchParams();
    urlParams.set('topic', topic);
    router.push(`/results?${urlParams.toString()}`);
  };

  return (
    <Container className="mt-1">
      <Row>
        <Col md={8} className="mx-auto text-center">
          <Image
            src="/Logo.png"
            alt="Aloha Archives Logo"
            width={300}
            height={250}
            layout="fixed"
          />
          <h1 className="ml11 fs-4 text-contrast" style={{ color: 'seashell' }}>
            <span className="text-wrapper">
              <span className="line line1" />
              <span className="letters" style={{ letterSpacing: '0.1em' }}>Hawai&lsquo;i&apos;s data, your way—simple, smart, visual.</span>
            </span>
          </h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={8} className="mx-auto">
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto d-flex justify-content-center">
          <Button type="button" onClick={() => handleTopicFilterClick('Health')} className="filter-button mx-2">
            Health
          </Button>
          <Button type="button" onClick={() => handleTopicFilterClick('Transportation')} className="filter-button mx-2">
            Transportation
          </Button>
          <Button type="button" onClick={() => handleTopicFilterClick('Demographics')} className="filter-button mx-2">
            Demographics
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
