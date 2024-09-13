import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 지역(구) 리스트 받아오기
export const getLocationList = async () => {
  try {
    const response = await apiClient.get('/gu');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 닉네임 중복 여부 확인 API
export const checkUserNicknameExist = async (nickname) => {
  try {
    const response = await apiClient.get(
      `/user/checkUserNicknameExist/${nickname}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 유저 존재 여부 확인 API
export const checkUserExists = async (uuid) => {
  try {
    const response = await apiClient.post('/user/exists', { uuid });
    return response.data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
};

// 사용자 가입 API 및 로그인
export const signupUser = async (uuid, nickname, address, pokemonName) => {
  try {
    const response = await apiClient.post('/user/signup', {
      uuid,
      nickname,
      address,
      pokemonName,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 기본 포켓몬 모두 불러오기
export const getPokemons = async () => {
  try {
    const response = await apiClient.get('/pokemon');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 러닝 시작
export const runningStart = async (userId, lat, lon) => {
  try {
    const response = await apiClient.post('/start-running', {
      userId,
      lat,
      lon,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 러닝 종료
export const runningEnd = async (userId) => {
  try {
    const response = await apiClient.post('/stop-running', {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// 사용자 포켓몬 모두 불러오기
export const getUserPokemons = async (userUuid) => {
  try {
    const response = await apiClient.get(`/user/pokemons/${userUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user pokemons:', error);
    return null;
  }
};

// 디폴트 포켓몬 설정하기
export const setDefaultPokemon = async (uuid, pokemonName) => {
  try {
    const response = await apiClient.put('/user/pokemon/default', {
      uuid,
      pokemonName,
    });
    return response.data;
  } catch (error) {
    console.error('Error setting default pokemon:', error);
    return null;
  }
};

// 사용자 포켓몬 추가하기
export const addUserPokemon = async (uuid, pokemonName) => {
  try {
    const response = await apiClient.post('/user/pokemon', {
      uuid,
      pokemonName,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user pokemon:', error);
    return null;
  }
};

// 사용자 런닝 기록 모두 불러오기
export const getUserRunnings = async (userUuid) => {
  try {
    const response = await apiClient.get(`/user/runnings/${userUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user runnings:', error);
    return null;
  }
};

// 지도 화면 > 각 지역(구)의 1순위 정보 불러오기
export const getLocation1stList = async () => {
  try {
    const response = await apiClient.get('/gu/boss-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching user runnings:', error);
    return null;
  }
};

export default apiClient;
