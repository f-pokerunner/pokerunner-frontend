import { v4 as uuidv4 } from 'uuid';
import {
  getLocationList,
  checkUserExists,
  signupUser,
  checkUserNicknameExist,
  runningStart,
  runningEnd,
  getPokemons,
} from './apiClient';

/**  로컬 스토리지에서 기기 고유 ID 가져오기 */
const getDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');
  return deviceId;
};

/**  기기 고유 ID를 로컬 스토리지에 저장하기 */
const setDeviceId = (deviceId) => {
  localStorage.setItem('deviceId', deviceId);
};

/**  userID 로컬 스토리지에 저장 */
const setUserID = (userId) => {
  localStorage.setItem('userId', userId);
};

/**  로컬 스토리지에서 userId 가져오기 */
export const getUserID = (userId) => {
  return localStorage.getItem('userId', userId);
};

/** 지역(구) 리스트 받아오는 함수 */
export const getSeoulLocationList = async () => {
  try {
    const response = await getLocationList();
    return response;
  } catch (error) {
    console.error('Error get seoul location list:', error);
    return false;
  }
};

/** 닉네임 중복 확인 함수 */
export const checkNicknameAvailability = async (nickname) => {
  try {
    const response = await checkUserNicknameExist(nickname);
    return response;
  } catch (error) {
    console.error('Error checking nickname availability:', error);
    return false;
  }
};

/** 회원가입 or 로그인 처리 함수 */
export const handleSignup = async (nickname, address, pokemonName) => {
  let deviceId = getDeviceId();

  // 기기 ID가 없으면 새로 생성
  if (!deviceId) {
    deviceId = uuidv4();
    setDeviceId(deviceId);
  }

  // 사용자 가입 요청
  try {
    const response = await signupUser(deviceId, nickname, address, pokemonName);
    if (typeof response === 'number') {
      setUserID(response);

      return 'success'; // hsPyo: 이쪽 로직 여쭤보기. 숫자가 오면 성공이고 현재 함수를 끝내도 문제 없을지?!
    }

    console.log('Signup response:', response);
    if (response === 'User created successfully') {
      console.log('Signup successful:', response);
      return response;
    } else if (response === 'User logged in.') {
      console.log('Login successful:', response);
      return response;
    } else if (
      response === 'Username already exists' ||
      response === 'Device ID already exists'
    ) {
      // 기기 ID 또는 닉네임이 이미 존재하는 경우, 다시 확인
      const userExists = await checkUserExists(deviceId);
      if (userExists) {
        console.error('User already exists with the same device ID!');
        return null;
      }
      // 닉네임 중복 확인
      const isNicknameAvailableAfterError =
        await checkNicknameAvailability(nickname);
      if (!isNicknameAvailableAfterError) {
        console.error('Nickname is already taken!');
        return null;
      }
      // 재시도 또는 다른 처리가 필요할 수 있음
      console.error('Signup failed or user already exists:', response);
      return null;
    } else {
      console.error('Signup failed or unexpected response:', response);
      return null;
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return null;
  }
};

/** intro 화면 > 기본 포켓몬 모두 불러오기 */
export const getPokemonsAPI = async () => {
  return await getPokemons();
};

/** 홈화면 > 러닝 시작 */
export const postRunningStart = async (userId, lat, lon) => {
  await runningStart(userId, lat, lon);
};

/** 홈화면 > 러닝 종료 */
export const postRunningEnd = async (userId) => {
  await runningEnd(userId);
};
