'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import DatasetCard from '@/components/DatasetCard';
import debounce from 'lodash/debounce';

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
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleMenu1 = () => setIsOpen1(!isOpen1);
  const toggleMenu2 = () => setIsOpen2(!isOpen2);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('search') || '';
      const topic = urlParams.get('topic') || '';
      const org = urlParams.get('org') || '';
      const sort = urlParams.get('sort')?.toLowerCase() || 'name';

      // Convert sort criteria to API format
      let [sortField, order] = ['name', 'asc'];
      if (sort.includes('z-a') || sort.includes('recent')) {
        order = 'desc';
      }
      if (sort.includes('organization')) {
        sortField = 'organization';
      } else if (sort.includes('topic')) {
        sortField = 'topic';
      } else if (sort.includes('date')) {
        sortField = 'date';
      }

      const response = await fetch(
        `/api/datasets?query=${query}&topic=${topic}&org=${org}&sort=${sortField}&order=${order}`,
      );
      const data = await response.json();

      setFilteredResults(data.datasets);
      setTopics(data.topics);
      setOrgs(data.orgs);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetchRef = useRef<ReturnType<typeof debounce>>();

  // Create debouncedFetchData with useCallback to maintain reference
  const debouncedFetchData = useCallback(() => {
    if (!debouncedFetchRef.current) {
      debouncedFetchRef.current = debounce(
        async () => {
          try {
            setIsLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('search') || '';
            const topic = urlParams.get('topic') || '';
            const org = urlParams.get('org') || '';
            const sort = urlParams.get('sort')?.toLowerCase() || 'name';

            // Convert sort criteria to API format
            let [sortField, order] = ['name', 'asc'];
            if (sort.includes('z-a') || sort.includes('recent')) {
              order = 'desc';
            }
            if (sort.includes('organization')) {
              sortField = 'organization';
            } else if (sort.includes('topic')) {
              sortField = 'topic';
            } else if (sort.includes('date')) {
              sortField = 'date';
            }

            const response = await fetch(
              `/api/datasets?query=${query}&topic=${topic}&org=${org}&sort=${sortField}&order=${order}`,
            );
            const data = await response.json();

            setFilteredResults(data.datasets);
            setTopics(data.topics);
            setOrgs(data.orgs);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          } finally {
            setIsLoading(false);
          }
        },
        300,
      );
    }
    debouncedFetchRef.current?.();
  }, [setFilteredResults, setTopics, setOrgs, setIsLoading]);

  useEffect(() => debouncedFetchRef.current?.cancel(), []);

  const handleTopicFilter = useCallback((topic: string) => {
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

    debouncedFetchData();
  }, [selectedTopic, debouncedFetchData]);

  const handleOrgFilter = useCallback((org: string) => {
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

    debouncedFetchData();
  }, [selectedOrg, debouncedFetchData]);

  const handleSort = useCallback((eventKey: string | null) => {
    if (!eventKey) return;
    setSortCriteria(eventKey);

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('sort', eventKey);
      window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }

    debouncedFetchData();
  }, [debouncedFetchData]);

  useEffect(() => {
    fetchData();
    return () => debouncedFetchRef.current?.cancel();
  }, [fetchData]);

  return (
    <main>
      <Container>
        <Row className="mt-5 mb-5">
          {/* Mobile Filters Toggle */}
          <Col xs={12} className="d-md-none mb-3">
            <button
              type="button"
              className="filters-toggle-btn"
              onClick={toggleFilters}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </Col>

          {/* Filters Sidebar */}
          <div
            className={`filters-overlay ${showFilters ? 'show' : ''}`}
            onClick={toggleFilters}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleFilters();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle filters overlay"
          />
          <Col
            md={3}
            className={`filters-sidebar ${showFilters ? 'show' : ''}`}
          >
            <div className="d-md-none text-end mb-3">
              <button
                type="button"
                className="btn-close"
                onClick={toggleFilters}
                aria-label="Close filters"
              />
            </div>
            <h2 className="text-center mb-4">Filters</h2>

            {/* Topic Filter */}
            <div className="mb-4">
              <button type="button" onClick={toggleMenu1} className="btn" id="filterMenu">
                {isOpen1 ? 'Hide Topics' : 'Show Topics'}
              </button>
              {isOpen1 && (
                <ul className="list-group mt-2">
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
            </div>

            {/* Organization Filter */}
            <div className="mb-4">
              <button type="button" onClick={toggleMenu2} className="btn" id="filterMenu">
                {isOpen2 ? 'Hide Organizations' : 'Show Organizations'}
              </button>
              {isOpen2 && (
                <ul className="list-group mt-2">
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
            </div>
          </Col>

          {/* Results Area */}
          <Col md={9}>
            <div className="search-controls">
              <div className="flex-grow-1">
                <SearchBar />
              </div>
              <div style={{ minWidth: '200px' }}>
                <DropdownButton
                  onSelect={(eventKey) => handleSort(eventKey)}
                  title={`Sort By: ${sortCriteria}`}
                  id="custom-dropdown"
                >
                  <Dropdown.Item
                    eventKey="Name A-Z"
                    active={sortCriteria === 'Name A-Z'}
                    id="sortButton"
                  >
                    Name: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Name Z-A"
                    active={sortCriteria === 'Name Z-A'}
                    id="sortButton"
                  >
                    Name: Z-A
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Organization A-Z"
                    active={sortCriteria === 'Organization A-Z'}
                    id="sortButton"
                  >
                    Organization: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Organization Z-A"
                    active={sortCriteria === 'Organization Z-A'}
                    id="sortButton"
                  >
                    Organization: Z-A
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Topic A-Z"
                    active={sortCriteria === 'Topic A-Z'}
                    id="sortButton"
                  >
                    Topic: A-Z
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Topic Z-A"
                    active={sortCriteria === 'Topic Z-A'}
                    id="sortButton"
                  >
                    Topic: Z-A
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date: Recent"
                    active={sortCriteria === 'Date: Recent'}
                    id="sortButton"
                  >
                    Date: Newest-Oldest
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date: Old"
                    active={sortCriteria === 'Date: Old'}
                    id="sortButton"
                  >
                    Date: Oldest-Newest
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Row>
                {filteredResults.map((dataset) => (
                  <Col key={dataset.id} lg={6} className="mb-4">
                    <DatasetCard
                      dataset={dataset}
                      userId=""
                      isFavoritesContext={false}
                      onRemoveFromFavorites={() => {}}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ResultsPage;
