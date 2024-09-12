import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default apiClient;
