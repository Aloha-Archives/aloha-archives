import React from 'react';
import { Card, Container } from 'react-bootstrap';
import DeleteDatasetButton from './DeleteButton';

interface Dataset {
  id: string;
  name: string;
  description: string;
  topic: string;
  org: string;
  orgIcon: string;
  date: string;
}

interface DatasetCardProps {
  dataset: Dataset;
  isFavoritesContext: boolean;
  userId: string;
  onRemoveFromFavorites: (datasetId: string) => void;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, isFavoritesContext, userId, onRemoveFromFavorites }) => (
  <div style={{ position: 'relative', width: '18rem', margin: '1rem auto' }}>
    {isFavoritesContext && (
      <div style={{ position: 'absolute', top: 10, right: 25, zIndex: 1 }}>
        <DeleteDatasetButton
          datasetId={dataset.id}
          userId={userId}
          isFavoritesContext={isFavoritesContext}
          onDeleteSuccess={() => onRemoveFromFavorites(dataset.id)}
        />
      </div>
    )}
    <button
      type="button"
      style={{
        padding: 0,
        border: 'none',
        background: 'none',
        width: '100%',
        height: '420px',
      }}
      onClick={() => (window.location.href = `/dataset/${dataset.id}`)}
    >
      <Card className="h-100">
        <Card.Header style={{ height: '55%' }}>
          <Container className="d-flex justify-content-center">
            <Card.Img
              variant="top"
              src={dataset.orgIcon}
              alt={`${dataset.org} logo`}
              style={{ maxWidth: '100px', height: 'auto' }}
            />
          </Container>
          <Card.Title className="pt-3 m-0">{dataset.name}</Card.Title>
          <Card.Text className="m-0">{dataset.org}</Card.Text>
        </Card.Header>
        <Card.Body style={{ height: '28%' }}>
          <Card.Text>{dataset.description}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ height: '17%' }}>
          <Card.Text>
            {dataset.topic}
            <br />
            {dataset.date}
          </Card.Text>
        </Card.Footer>
      </Card>
    </button>
  </div>
);

export default DatasetCard;
