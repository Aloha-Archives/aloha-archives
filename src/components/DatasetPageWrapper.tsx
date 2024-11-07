'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Histogram from '@/components/Histogram';
import Scatterplot from '@/components/Scatterplot';

interface Dataset {
  id: number;
  name: string;
  url: string;
  viewCount: number;
  topic: string;
  csvData: Array<{ [key: string]: string | number }>; // Flexible type for csvData
  description: string;
  org: string;
  orgIcon: string;
}

interface DatasetPageWrapperProps {
  dataset: Dataset;
}

export default function DatasetPageWrapper({ dataset }: DatasetPageWrapperProps) {
  const [chartType, setChartType] = useState<'histogram' | 'scatterplot'>('histogram');
  const [selectedVariable, setSelectedVariable] = useState<string>('AGEP'); // Default for histogram
  const [xVariable, setXVariable] = useState<string>('AGEP'); // Default for scatterplot x-axis
  const [yVariable, setYVariable] = useState<string>('PWGTP'); // Default for scatterplot y-axis
  const [chartData, setChartData] = useState<number[]>([]);
  const [scatterData, setScatterData] = useState<Array<[number, number]>>([]);

  const variables = dataset.csvData.length > 0 ? Object.keys(dataset.csvData[0]) : [];

  // Update data based on chart type and selected variables
  useEffect(() => {
    if (chartType === 'histogram') {
      const variableData = dataset.csvData
        .map((item) => parseInt(item[selectedVariable] as string, 10))
        .filter((value) => !Number.isNaN(value));
      setChartData(variableData);
    } else if (chartType === 'scatterplot') {
      const scatterPoints: [number, number][] = dataset.csvData
        .map<[number, number]>((item) => [parseFloat(item[xVariable] as string), parseFloat(item[yVariable] as string)]);

      setScatterData(scatterPoints);
    }
  }, [dataset.csvData, chartType, selectedVariable, xVariable, yVariable]);

  return (
    <main className="container dataset-table-container">
      <h2 className="text-center">{dataset.name}</h2>
      <div className="d-flex justify-content-center mb-3">
        <Image src={dataset.orgIcon} alt={`${dataset.org} logo`} className="org-icon" width={150} height={150} />
      </div>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr>
            <th scope="row">Organization</th>
            <td>{dataset.org}</td>
          </tr>
          <tr>
            <th scope="row">Topic</th>
            <td>{dataset.topic}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{dataset.description}</td>
          </tr>
          <tr>
            <th scope="row">Views</th>
            <td>{dataset.viewCount}</td>
          </tr>
          <tr>
            <th scope="row">Link</th>
            <td>
              <a href={dataset.url} target="_blank" rel="noopener noreferrer">
                View External Dataset
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Chart type selector */}
      <div className="chart-type-selector mt-4">
        <label htmlFor="histogram-radio">
          <input
            type="radio"
            id="histogram-radio" // Unique ID for histogram radio button
            value="histogram"
            checked={chartType === 'histogram'}
            onChange={() => setChartType('histogram')}
          />
          Histogram
        </label>
        <label htmlFor="scatterplot-radio">
          <input
            type="radio"
            id="scatterplot-radio" // Unique ID for scatterplot radio button
            value="scatterplot"
            checked={chartType === 'scatterplot'}
            onChange={() => setChartType('scatterplot')}
          />
          Scatterplot
        </label>
      </div>

      {/* Variable selection based on chart type */}
      {chartType === 'histogram' && (
        <div className="variable-selector mt-4">
          <label htmlFor="variable-select">
            Select Variable:
            <select
              id="variable-select"
              value={selectedVariable}
              onChange={(e) => setSelectedVariable(e.target.value)}
            >
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {chartType === 'scatterplot' && (
        <div className="variable-selectors mt-4">
          <label htmlFor="x-variable-select">
            Select X Variable:
            <select
              id="x-variable-select"
              value={xVariable}
              onChange={(e) => setXVariable(e.target.value)}
            >
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="y-variable-select">
            Select Y Variable:
            <select
              id="y-variable-select"
              value={yVariable}
              onChange={(e) => setYVariable(e.target.value)}
            >
              {variables.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Render Histogram or Scatterplot based on chart type */}
      {chartType === 'histogram' && chartData.length > 0 && (
        <div className="histogram-container mt-4 d-flex justify-content-center">
          <Histogram data={chartData} variable={selectedVariable} />
        </div>
      )}
      {chartType === 'scatterplot' && scatterData.length > 0 && (
        <div className="scatterplot-container mt-4 d-flex justify-content-center">
          <Scatterplot data={scatterData} xVariable={xVariable} yVariable={yVariable} />
        </div>
      )}
    </main>
  );
}
