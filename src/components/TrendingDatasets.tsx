'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DatasetCard from './DatasetCard';

interface Dataset {
  id: string;
  name: string;
  description: string;
  topic: string;
  org: string;
  orgIcon: string;
  date: string;
  viewCount: number;
}

const TrendingDatasets: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch('/api/datasets');
        const { datasets: allDatasets } = await response.json();
        const sortedDatasets = [...allDatasets]
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 3);
        setDatasets(sortedDatasets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching datasets:', error);
        setIsLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  useEffect(() => {
    if (datasets.length === 0) {
      return () => {};
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % datasets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [datasets.length]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + datasets.length) % datasets.length,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % datasets.length);
  };

  if (isLoading) {
    return (
      <Container className="my-5 pt-5">
        <h2 className="text-center mb-4 text-contrast">Trending Datasets</h2>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (datasets.length === 0) {
    return null;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 text-contrast">Trending Datasets</h2>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="carousel-3d-container mt-5">
            <div
              className="carousel-3d"
              style={{
                transform: `rotateY(-${currentIndex * 120}deg)`,
              }}
            >
              {datasets.map((dataset, index) => (
                <div
                  key={dataset.id}
                  className={`carousel-3d-item ${
                    index === currentIndex ? 'active' : ''
                  }`}
                >
                  <DatasetCard
                    dataset={dataset}
                    userId=""
                    isFavoritesContext={false}
                    onRemoveFromFavorites={() => {}}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="carousel-3d-prev"
              onClick={handlePrevClick}
              aria-label="Previous dataset"
            >
              &#8249;
            </button>
            <button
              type="button"
              className="carousel-3d-next"
              onClick={handleNextClick}
              aria-label="Next dataset"
            >
              &#8250;
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TrendingDatasets;
