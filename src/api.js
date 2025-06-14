import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1, name = '', status = '', species = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/character`, {
      params: { 
        page, 
        name, 
        status, 
        species
      }
    });
    
    return {
      results: response.data.results,
      info: {
        count: response.data.info.count,
        pages: response.data.info.pages
      }
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        results: [],
        info: { count: 0, pages: 0 }
      };
    }
    throw error;
  }
};
