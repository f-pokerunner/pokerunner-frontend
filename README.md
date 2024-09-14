# Pokerunner Frontend

해커톤 프로젝트 Pokerunner Frontend 리포지토리 입니다.

## Contributor

- @Pyo-heesu (희수)
- @SeokHoChoi (석호)

## Tech Requirement (Tech Stack)

### 프론트엔드

- **Create-next-app (cra-template-pwa)**
- **React.js**
- **ESLint**

### 백엔드

- 백엔드에 대한 자세한 내용은 [여기](https://github.com/f-pokerunner/pokerunner-backend)에서 확인하실 수 있습니다.

## Script

```
$ npm run start
```

```
$ npm run build
```

```
$ npm run lint:fix
```

## 기능 시연

이 페이지는 우리 프로젝트의 주요 기능을 시연하는 란입니다. 각 페이지의 기능을 설명하는 GIF를 확인해주세요.

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

  <!-- 인트로 페이지 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/8584db7b-db8e-4286-a7f5-974710c5a516" alt="intro" style="width: 200px; height: auto;">
    <p><strong>인트로 페이지</strong><br>
    기기고유 아이디를 대체하는 UUID와 사용자 닉네임, 지역, 기본 포켓몬을 받아서 회원가입 및 자동 로그인을 하는 페이지입니다. 가입 후 My Page의 포켓몬 도감 카드에는 나의 기본 포켓몬이 들어가 있습니다.</p>
  </div>
  <br></br>

  <!-- 포켓몬 도감 카드 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/690cf4a9-9a81-4726-ad24-e89fe6ea9ac1" alt="pokes" style="width: 200px; height: auto;">
    <p><strong>마이페이지</strong><br>
    러닝을 진행하며 이스터에그로 맵에 숨겨둔 포켓몬들을 잡을 수 있습니다. 잡은 포켓몬들은 포켓몬 도감 카드에 추가됩니다. 반짝반짝 빛나는 애니메이션을 통해 현재 디폴트 포켓몬을 알 수 있으며, 클릭하여 디폴트 포켓몬을 변경할 수 있습니다.</p>
  </div>
  <br></br>

  <!-- 포켓몬 변경 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/7ad0c0df-a82e-43ff-94de-225733dd3d96" alt="main" style="width: 200px; height: auto;">
    <img src="https://github.com/user-attachments/assets/1e33e3f1-decf-4220-b637-683b88345988" alt="main2" style="width: 200px; height: auto;">
    <p><strong>포켓몬 변경</strong><br>
    디폴트 포켓몬을 변경하면 위와 같은 화면이 나타납니다. 각 포켓몬의 레벨과 경험치는 별도로 관리되며, 러닝을 진행하며 포켓몬이 진화할 수 있습니다.</p>
  </div>
  <br></br>

  <!-- 러닝 지도 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/860fdaf4-a6ee-45bb-85f5-15fd13e524d1" alt="map" style="width: 200px; height: auto;">
    <p><strong>러닝 지도</strong><br>
    현재는 서울을 기준으로 지도를 설정해 두었습니다. 내가 달렸던 구역은 반짝반짝 애니메이션으로 표시됩니다. 포켓몬스터의 관장 시스템을 차용하여 1등이 관장 역할을 맡고 있으며, 각 구를 클릭하면 1, 2, 3위가 누구인지 확인할 수 있습니다.</p>
  </div>
  <br></br>
  
  <!-- 코멘트 작성 -->
  <div style="flex: 1; max-width: 70%;">
    <img src="https://github.com/user-attachments/assets/89b6ee0e-a1e1-4554-bae8-751e14d298f7" alt="comment" style="width: 200px; height: auto;">
    <p><strong>코멘트 작성</strong><br>
    해당 코멘트는 이곳에서 작성할 수 있으며, 내가 작성한 코멘트를 노출시키고 싶다면 달리는 지역에서 1등을 해야 합니다.</p>
  </div>

</div>
