import React, { useState, useEffect, useCallback } from 'react';
import { AutoCompleteInput } from './../components';
const AutoCompleteInputScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState([]);

  const debounce = (func, wait) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const fetchData = async (q) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${q}`
      );
      const data = await response.json();
      console.log('data- ', data?.recipes);
      setList(data?.recipes);
    } catch (error) {
      console.log('error occurred- ', error);
    }
  };

  const debouncedFetchDataFunc = useCallback(debounce(fetchData, 500), []);

  useEffect(() => {
    debouncedFetchDataFunc(searchTerm);
  }, [searchTerm]);

  const handleOnInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  const handleOnSelect = useCallback((text) => {
    console.log('Selected value: ', text);
    setSearchTerm(text);
  }, []);

  return (
    <div>
      <AutoCompleteInput
        searchTerm={searchTerm}
        data={list}
        onChangeHandler={handleOnInputChange}
        handleOnSelect={handleOnSelect}
      ></AutoCompleteInput>
    </div>
  );
};

export default AutoCompleteInputScreen;
