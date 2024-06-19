import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import './LiftingData.css';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Helmet } from 'react-helmet';

const LiftingData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState('2011');
  const [data, setData] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const fetchData = async (year) => {
    setIsLoading(true);
    setError('');
    try {
      console.log('fetching data');
      console.log(year);
      const response = await axios.get(`http://localhost:5000/data/${year}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTagClick = (code) => {
    setSelectedCodes((prev) => 
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const filteredData = data.filter((item) => selectedCodes.length === 0 || selectedCodes.includes(item.Code));

  const plotData = {
    x: filteredData.map((item) => item.Fatalities),
    y: filteredData.map((item) => item.Title),
    type: 'bar',
    orientation: 'h',
  };

  const layout = {
    title: `Fatalities by Category in ${year}`,
    xaxis: {
      title: 'Number of Fatalities',
      titlefont: { size: 16 },
      tickfont: { size: 14 },
    },
    yaxis: {
      title: 'Category',
      titlefont: { size: 16 },
      tickfont: { size: 14 },
      
    },
    margin: {
      l: 200, // Increased for better readability
      r: 50,
      b: 100,
      t: 50,
      pad: 10,
    },
    height: 800, // Adjust height for more space
    width: 1000, // Adjust width if necessary
  };

  return (
    <Container component="main" className="main">
      <Helmet>
        <title>Ofek Lift Data Bank</title>
        <meta name="description" content="Get yourself familiar with all the lifting data we have." />
      </Helmet>
      <Box component="section" className="openMessage">
        <Typography variant="h2" className="welcomeText">Welcome to Ofek Lift Lifting Data Center</Typography>
        <Typography variant="h5" className="descriptionText">
          This is an OIICS Data Dashboard.
        </Typography>
      </Box>

      {isLoading ? (
        <Box className="loadingBox">
          <CircularProgress />
          <Typography variant="h5" className="loadingText">Loading...</Typography>
        </Box>
      ) : error ? (
        <Box className="errorBox">
          <Typography variant="h5" className="errorText">{error}</Typography>
        </Box>
      ) : (
        <Box component="section" className="dataSection">
          <Typography variant="h5" className="dataDescription">
            Here you can find all the lifting data you need.
          </Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="year-label">Select Year</InputLabel>
            <Select labelId="year-label" value={year} onChange={handleYearChange} label="Select Year">
              <MenuItem value="2011">2011</MenuItem>
              <MenuItem value="2010">2010</MenuItem>
            </Select>
          </FormControl>
          <Plot
            data={[plotData]}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
          />
          <Typography variant="h6">Filter by Codes:</Typography>
          <Box className="codeFilterBox">
            {data.map((item) => (
              <Chip
                key={item.Code}
                label={`${item.Code} - ${item.Title}`}
                clickable
                onClick={() => handleTagClick(item.Code)}
                color={selectedCodes.includes(item.Code) ? 'primary' : 'default'}
                variant={selectedCodes.includes(item.Code) ? 'filled' : 'outlined'}
                style={{ margin: '4px' }}
              />
            ))}
          </Box>
    
        </Box>
      )}
    </Container>
  );
};

export default LiftingData;
