// This file should remain a server component (do not add 'use client')
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import DatasetPageWrapper from '@/components/DatasetPageWrapper';

export default async function DatasetPage({ params }: { params: { id: string | string[] } }) {
  const idString = Array.isArray(params?.id) ? params.id[0] : params.id;
  const id = Number(idString.replace(/[^\d]/g, ''));

  console.log(`Parsed ID: ${id}`); // Log the ID being queried

  if (Number.isNaN(id)) {
    console.log('ID is NaN, returning 404');
    return notFound();
  }

  try {
    // Fetch dataset details on the server
    const dataset = await prisma.dataset.findUnique({ where: { id } });
    if (!dataset) {
      console.log('Dataset not found, returning 404');
      return notFound();
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? Number(session.user.id) : null;
    console.log('Passing userId to DatasetPageWrapper:', userId); // Confirm userId is available

    let isFavorite = false;
    if (userId) {
      const userWithFavorites = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          favorites: {
            where: { id },
            select: { id: true },
          },
        },
      });
      isFavorite = (userWithFavorites?.favorites?.length ?? 0) > 0; // Check if there are any favorites matching the dataset id
    }

    // Add type check for csvData property to ensure it is an array of objects
    const csvData = Array.isArray(dataset.csvData) ? (dataset.csvData as { [key: string]: string | number }[]) : [];

    // Pass dataset and userId to the client component
    return <DatasetPageWrapper dataset={{ ...dataset, csvData }} userId={userId} initialIsFavorite={isFavorite} />;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return notFound();
  }
}
