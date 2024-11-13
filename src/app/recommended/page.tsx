'use client';

import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import DatasetCard from '@/components/DatasetCard';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: string; name: string; description: string; topic: string; org: string; orgIcon: string };
};

const RecommendationsDisplay = () => {
  const { data: session, status } = useSession();
  const [persona, setPersona] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function fetchPersonaAndRecommendations() {
      if (!session?.user?.email) {
        console.error('User email not found in session');
        return;
      }

      if (persona) {
        console.log(`Current persona: ${persona}`);
      }

      try {
        // Step 1: Fetch the current user's persona
        const personaResponse = await fetch(`/api/getPersona?email=${session.user.email}`);
        const personaData = await personaResponse.json();

        if (!personaData.persona) {
          console.error('Persona not found');
          return;
        }

        const currentPersona = personaData.persona;
        setPersona(currentPersona);

        // Step 2: Fetch recommendations based on the persona
        const recommendationsResponse = await fetch(`/api/getRecommendations?persona=${currentPersona}`);
        const recommendationsData = await recommendationsResponse.json();

        console.log('API Response for persona:', currentPersona, recommendationsData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching persona or recommendations:', error);
      }
    }

    if (session) {
      fetchPersonaAndRecommendations();
    }
  }, [session, persona]);

  if (status === 'loading') {
    return <p className="text-contrast">Loading...</p>;
  }

  if (!session) {
    return <p className="text-contrast">You must be logged in to see recommendations.</p>;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <h1 className="text-contrast">Recommended Datasets:</h1>
      <Row>
        {recommendations.map((rec) => (
          <DatasetCard
            key={rec.dataset.id}
            dataset={rec.dataset}
            userId={session.user?.id || ''}
            isFavoritesContext={false}
            onRemoveFromFavorites={() => {}}
          />
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationsDisplay;
