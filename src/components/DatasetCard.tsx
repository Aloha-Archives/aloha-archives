// src/components/DatasetCard.tsx

import React from 'react';
import { Card, Container } from 'react-bootstrap';

interface Dataset {
  id: string;
  name: string;
  description: string;
  topic: string;
  org: string;
  orgIcon: string;
}

interface DatasetCardProps {
  dataset: Dataset;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => (
  <button
    type="button"
    style={{
      padding: 0,
      border: 'none',
      background: 'none',
      width: '18rem',
      marginLeft: '2rem',
      marginBottom: '2rem',
      height: '330px',
    }}
    onClick={() => (window.location.href = `/dataset/${dataset.id}`)}
  >
    <Card className="h-100">
      <Card.Header style={{ height: '60%' }}>
        <Container className="d-flex justify-content-center">
          <Card.Img
            variant="top"
            src={dataset.orgIcon}
            alt={`${dataset.org} logo`}
            style={{ maxWidth: '100px', height: 'auto' }}
          />
        </Container>
        <Card.Title className="pt-3">{dataset.name}</Card.Title>
      </Card.Header>
      <Card.Body style={{ height: '25%' }}>
        <Card.Text>{dataset.description}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ height: '15%' }}>
        <Card.Text>{dataset.topic}</Card.Text>
      </Card.Footer>
    </Card>
  </button>
);

export default DatasetCard;
