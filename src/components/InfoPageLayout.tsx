'use client';

import React from 'react';
import { Container, Card } from 'react-bootstrap';

interface InfoPageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ children, title }) => (
  <Container className="py-5">
    <Card className="info-page-card">
      <Card.Body>
        <h1 className="info-page-title mb-4">{title}</h1>
        <div className="info-page-content">
          {children}
        </div>
      </Card.Body>
    </Card>
  </Container>
);

export default InfoPageLayout;
