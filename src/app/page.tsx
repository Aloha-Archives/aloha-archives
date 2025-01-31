// src/app/page.tsx

import dynamic from 'next/dynamic';
import './globals.css';
import { Container } from 'react-bootstrap';
import TrendingDatasets from '@/components/TrendingDatasets';
import styles from './page.module.css';

const Explore = dynamic(() => import('@/components/Explore'), { ssr: false });

export default function Home() {
  return (
    <main className={`${styles.main} pb-5`}>
      <Container fluid className="py-3 home-page-container">
        <Explore />
        <TrendingDatasets />
      </Container>
    </main>
  );
}
