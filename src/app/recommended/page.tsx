'use client';

import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import DatasetCard from '@/components/DatasetCard';
import PersonaForm from '@/components/PersonaForm';

type Recommendation = {
  id: number;
  persona: string;
  dataset: { id: string; name: string; description: string; topic: string; org: string; orgIcon: string; date: string };
};

type PersonaKey = 'educator' | 'researcher' | 'communityMember' | 'publicInformer' | 'businessDecisionMaker';

const RecommendationsDisplay = () => {
  const { data: session, status } = useSession();
  const [persona, setPersona] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const personaDisplayNames: Record<PersonaKey, string> = {
    educator: 'Educator',
    researcher: 'Researcher',
    communityMember: 'Community Member',
    publicInformer: 'Public Informer',
    businessDecisionMaker: 'Business Decision Maker',
  };

  const fetchPersonaAndRecommendations = async () => {
    if (!session?.user?.email) {
      console.error('User email not found in session');
      return;
    }

    try {
      // Fetch the current user's persona
      const personaResponse = await fetch(`/api/getPersona?email=${session.user.email}`);
      const personaData = await personaResponse.json();

      if (!personaData.persona) {
        console.error('Persona not found');
        setPersona(null);
        setRecommendations([]);
        return;
      }

      const currentPersona = personaData.persona;
      setPersona(currentPersona);

      // Fetch recommendations based on the persona
      const recommendationsResponse = await fetch(`/api/getRecommendations?persona=${currentPersona}`);
      const recommendationsData = await recommendationsResponse.json();

      console.log('API Response for persona:', currentPersona, recommendationsData);
      setRecommendations(recommendationsData);
    } catch (error) {
      console.error('Error fetching persona or recommendations:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPersonaAndRecommendations();
    }
  }, [session]);

  const handleQuizSubmit = () => {
    // Refresh persona and recommendations when the quiz is submitted
    fetchPersonaAndRecommendations();
  };

  if (status === 'loading') {
    return <p className="text-contrast">Loading...</p>;
  }

  if (!session) {
    return <p className="text-contrast">You must be logged in to see recommendations.</p>;
  }

  return (
    <Container id="landing-page" fluid className="py-3">
      <h2 className="text-contrast">
        Currently:
        {' '}
        {persona ? personaDisplayNames[persona as PersonaKey] : 'No persona assigned yet'}
      </h2>
      <PersonaForm onSubmitSuccess={handleQuizSubmit} />
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
