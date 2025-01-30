import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const dynamic = 'force-dynamic';

// Define interfaces for the query results
interface TopicResult {
  topic: string,
}

interface OrgResult {
  org: string,
}

// Cache the metadata queries
const getMetadata = cache(async () => {
  const [topics, orgs] = await Promise.all([
    prisma.$queryRaw<TopicResult[]>`SELECT DISTINCT topic FROM "Dataset" ORDER BY topic ASC`,
    prisma.$queryRaw<OrgResult[]>`SELECT DISTINCT org FROM "Dataset" ORDER BY org ASC`,
  ]);
  return {
    topics: topics.map((t: TopicResult) => t.topic),
    orgs: orgs.map((o: OrgResult) => o.org),
  };
});

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('query') || '';
    const topic = searchParams.get('topic') || '';
    const org = searchParams.get('org') || '';
    const sortBy = searchParams.get('sort') || 'name';
    const sortOrder = searchParams.get('order') || 'asc';

    // Build the where clause based on filters
    const whereClause: any = {};

    // Add search conditions if query exists
    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { topic: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    // Add exact match filters
    if (topic) {
      whereClause.topic = topic;
    }
    if (org) {
      whereClause.org = org;
    }

    // Build the orderBy based on sort criteria
    const orderBy: any = {};
    switch (sortBy.toLowerCase()) {
      case 'organization':
        orderBy.org = sortOrder;
        break;
      case 'topic':
        orderBy.topic = sortOrder;
        break;
      case 'date':
        orderBy.date = sortOrder;
        break;
      default:
        orderBy.name = sortOrder;
    }

    // Parallel execution of data and metadata queries
    const [datasets, metadata] = await Promise.all([
      prisma.dataset.findMany({
        where: whereClause,
        orderBy,
        select: {
          id: true,
          name: true,
          description: true,
          topic: true,
          org: true,
          orgIcon: true,
          date: true,
          viewCount: true,
        },
      }),
      getMetadata(), // This will use the cached result if called multiple times
    ]);

    return NextResponse.json({
      datasets,
      topics: metadata.topics,
      orgs: metadata.orgs,
    });
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch datasets' },
      { status: 500 },
    );
  }
};
