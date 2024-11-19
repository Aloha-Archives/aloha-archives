'use client';

import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import DatasetCard from '@/components/DatasetCard';

interface Dataset {
  id: string;
  name: string;
  url: string;
  topic: string;
  description: string;
  org: string;
  orgIcon: string;
  date: string;
}

interface ListFavoriteDatasetsPageProps {
  datasets: Dataset[];
  userId: string;
}

const ListFavoriteDatasetsPage: React.FC<ListFavoriteDatasetsPageProps> = ({ userId, datasets }) => {
  // Initialize state with the provided datasets
  const [favoriteDatasets, setFavoriteDatasets] = useState(datasets);

  // Handler to remove a dataset from favorites
  const handleRemoveFromFavorites = (datasetId: string) => {
    setFavoriteDatasets((prevDatasets) => prevDatasets.filter((dataset) => dataset.id !== datasetId));
  };

  return (
    <main>
      <Container id="dataset-list" fluid className="py-3">
        <h1 className="text-contrast">Favorite Datasets</h1>
        <Row>
          {favoriteDatasets.map((dataset) => (
            <DatasetCard
              userId={userId}
              isFavoritesContext
              onRemoveFromFavorites={() => handleRemoveFromFavorites(dataset.id)} // Pass handler to DatasetCard
              key={dataset.id}
              dataset={dataset}
            />
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListFavoriteDatasetsPage;
