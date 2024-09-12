import { v4 as uuidv4 } from 'uuid';
import {
  checkUserExists,
  signupUser,
  checkUserNicknameExist,
  runningStart,
  runningEnd,
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
    console.log(deviceId, nickname, address, pokemonName);
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

/** 홈화면 > 러닝 시작 */
export const postRunningStart = async (userId, lat, lon) => {
  await runningStart(userId, lat, lon);
};

/** 홈화면 > 러닝 종료 */
export const postRunningEnd = async (userId) => {
  await runningEnd(userId);
};
