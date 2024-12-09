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
    const textWrapper = document.querySelector('.ml11 .letters');
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent
        ?.replace(/([\w‘’]+(?:['’]\w+)?|[‘’—,.])/g, "<span class='letter'>$&</span>") || '';

      anime.timeline({ loop: true })
        .add({
          targets: '.ml11 .line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 1000,
        })
        .add({
          targets: '.ml11 .line',
          translateX: [0, textWrapper.getBoundingClientRect().width + 10],
          easing: 'easeOutExpo',
          duration: 2500,
          delay: 201,
        })
        .add({
          targets: '.ml11 .letter',
          opacity: [0, 1],
          translateY: ['1.2em', 0],
          easing: 'easeOutExpo',
          duration: 1000,
          offset: '+=100',
          delay: (el, i) => 40 * i,
        })
        .add({
          targets: '.ml11',
          opacity: [1, 0],
          duration: 1500,
          easing: 'easeOutExpo',
          delay: 1000,
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
