'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import DatasetCard from '@/components/DatasetCard';

const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });

const ResultsPage = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState<string>('Name');

  const toggleMenu1 = () => setIsOpen1(!isOpen1);
  const toggleMenu2 = () => setIsOpen2(!isOpen2);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const fetchOrgs = async () => {
    try {
      const response = await fetch('/api/orgs');
      const data = await response.json();
      console.log('Fetched organizations:', data); // Added logging to inspect org data
      setOrgs(data);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  };

  const fetchDatasets = async (query: string, topic: string, org: string, sortBy: string) => {
    try {
      const response = await fetch('/api/datasets');
      const data = await response.json();
      const filteredData = data.filter(
        (item: { name: string; topic: string; org: string; }) => (item.name.toLowerCase().includes(query.toLowerCase())
          || item.topic.toLowerCase().includes(query.toLowerCase()))
          && (topic ? item.topic === topic : true)
          && (org ? item.org === org : true),
      );
      const sortedData = filteredData.sort(
        (
          a: { name: string; org: string; topic: string; date: string; },
          b: { name: any; org: any; topic: any; date: string; },
        ) => {
          if (sortBy === 'Name') {
            return a.name.localeCompare(b.name);
          }
          if (sortBy === 'Organization') {
            return a.org.localeCompare(b.org);
          }
          if (sortBy === 'Topic') {
            return a.topic.localeCompare(b.topic);
          }
          if (sortBy === 'Date') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return 0;
        },
      );

      setFilteredResults(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch datasets:', error);
    }
  };

  const handleTopicFilter = (topic: string) => {
    const newTopic = selectedTopic === topic ? '' : topic;
    setSelectedTopic(newTopic);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (newTopic) {
        urlParams.set('topic', newTopic);
      } else {
        urlParams.delete('topic');
      }
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    const query = new URLSearchParams(window.location.search).get('search') || '';
    fetchDatasets(query, newTopic, selectedOrg, sortCriteria);
  };

  const handleOrgFilter = (org: string) => {
    const newOrg = selectedOrg === org ? '' : org;
    setSelectedOrg(newOrg);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (newOrg) {
        urlParams.set('org', newOrg);
      } else {
        urlParams.delete('org');
      }
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    const query = new URLSearchParams(window.location.search).get('search') || '';
    const topicFromURL = new URLSearchParams(window.location.search).get('topic') || '';
    fetchDatasets(query, topicFromURL, newOrg, sortCriteria);
  };

  const handleSort = (eventKey: string | null) => {
    if (!eventKey) return;
    const criteria = eventKey;
    setSortCriteria(criteria);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('sort', criteria);
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    const sortedResults = [...filteredResults].sort((a, b) => {
      if (criteria === 'Name') {
        return a.name.localeCompare(b.name);
      }
      if (criteria === 'Organization') {
        return a.org.localeCompare(b.org);
      }
      if (criteria === 'Topic') {
        return a.topic.localeCompare(b.topic);
      }
      if (criteria === 'Date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
    setFilteredResults(sortedResults);
  };

  useEffect(() => {
    fetchTopics();
    fetchOrgs();

    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search') || '';
        const topicFromURL = urlParams.get('topic') || '';
        const orgFromURL = urlParams.get('org') || '';
        const sortFromURL = urlParams.get('sort') || '';
        setSelectedTopic(topicFromURL);
        setSelectedOrg(orgFromURL);
        setSortCriteria(sortFromURL || 'Name');
        await fetchDatasets(query, topicFromURL, orgFromURL, sortFromURL);
      }
    };

    fetchData();
  }, []); // Only runs once, on mount

  return (
    <main>
      <Container>
        <Row className="mt-5 mb-5">
          {/* Filters Sidebar */}
          <Col md={3} className="mx-auto bg-light filter-height">
            <Container className="mt-2">
              <Row>
                <h2 className="text-center">Filters</h2>
              </Row>

              {/* Topic Filter */}
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu1} className="btn btn-primary" id="filterMenu">
                  {isOpen1 ? 'Hide Topics' : 'Show Topics'}
                </button>
                {isOpen1 && (
                  <ul className="list-group mt-2 pe-0">
                    {topics.map((topic) => (
                      <button
                        type="button"
                        id="resultsFilterButton"
                        key={topic}
                        className={`list-group-item ${selectedTopic === topic ? 'active' : ''}`}
                        onClick={() => handleTopicFilter(topic)}
                      >
                        {topic}
                      </button>
                    ))}
                  </ul>
                )}
              </Row>

              {/* Organization Filter */}
              <Row className="mb-3">
                <button type="button" onClick={toggleMenu2} className="btn btn-primary" id="filterMenu">
                  {isOpen2 ? 'Hide Organizations' : 'Show Organizations'}
                </button>
                {isOpen2 && (
                  <ul className="list-group mt-2 pe-0">
                    {orgs.map((org) => (
                      <button
                        type="button"
                        id="resultsFilterButton"
                        key={org}
                        className={`list-group-item ${selectedOrg === org ? 'active' : ''}`}
                        onClick={() => handleOrgFilter(org)}
                      >
                        {org}
                      </button>
                    ))}
                  </ul>
                )}
              </Row>
            </Container>
          </Col>

          {/* Results Area */}
          <Col md={9} className="mx-auto">
            <Row className="align-items-center">
              <Col md={10}>
                <SearchBar />
              </Col>
              <Col md={2}>
                <DropdownButton
                  onSelect={(eventKey) => handleSort(eventKey)}
                  title={`Sort By: ${sortCriteria}`}
                  id="custom-dropdown"
                >
                  <Dropdown.Item
                    eventKey="Name"
                    active={sortCriteria === 'Name'}
                    id="sortButton"
                  >
                    Name: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Organization"
                    active={sortCriteria === 'Organization'}
                    id="sortButton"
                  >
                    Organization: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Topic"
                    active={sortCriteria === 'Topic'}
                    id="sortButton"
                  >
                    Topic: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date"
                    active={sortCriteria === 'Date'}
                    id="sortButton"
                  >
                    Date: Newest-Oldest
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <h1 className="ms-3 text-contrast">Results</h1>
            </Row>
            <Row>
              {isLoading && <p className="ps-5 text-contrast">Loading...</p>}
              {!isLoading && filteredResults.length > 0 && (
                filteredResults.map((item) => {
                  console.log(item);
                  return (
                    <DatasetCard
                      dataset={item}
                      isFavoritesContext={item.isFavoritesContext}
                      userId={item.userId}
                      onRemoveFromFavorites={item.onRemoveFromFavorites}
                    />
                  );
                })
              )}
              {!isLoading && filteredResults.length === 0 && (
                <p className="ps-5 text-contrast">No results found.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ResultsPage;
