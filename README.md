# 당직 레이스 3D

사무실 당직을 정하는 실시간 3D 레이싱 게임입니다. 각자 휴대폰이나 PC로 같은 주소를 열고, 같은 트랙에서 동시에 달립니다.

## 파일 구성

- `index.html`: 게임 목록(첫 화면)
- `race.html`: 당직 레이스 3D
- `bumper.html`: 범퍼카 아레나
- `archery.html`: 바람의 양궁
- `spot.html`: 틀린그림찾기
- `mole.html`: 두더지 잡기
- `timer.html`: 10초 맞추기
- `quiz.html`: 퀴즈 센터 (건축안전·상식·역사·넌센스)
(세 파일을 모두 저장소에 올리면 됩니다)
- `database.rules.json`: Firebase 보안 규칙(Firebase 콘솔에 붙여넣기용)

## 1. Firebase 준비 (실시간 통신, 무료)

1. https://console.firebase.google.com 에서 **프로젝트 추가** (이름 예: duty-race). Google 애널리틱스는 꺼도 됩니다.
2. 왼쪽 메뉴 **빌드 > Realtime Database > 데이터베이스 만들기**
   - 위치: `asia-southeast1 (싱가포르)` 권장(한국과 가장 가까움)
   - 보안 규칙: **잠금 모드**로 시작
3. Realtime Database의 **규칙** 탭에서 기존 내용을 지우고 `database.rules.json` 내용을 붙여넣은 뒤 **게시**
4. 톱니바퀴 **프로젝트 설정 > 일반 > 내 앱 > 웹(</>)** 으로 앱 등록 (호스팅 체크 불필요)
5. 화면에 나오는 `firebaseConfig = { ... }` 내용을 복사

## 2. index.html에 설정 붙여넣기

`index.html` 위쪽의 `FIREBASE_CONFIG` 부분을 복사한 값으로 채웁니다.

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "duty-race.firebaseapp.com",
  databaseURL: "https://duty-race-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "duty-race",
  ...
};
```

`databaseURL`이 빠져 있으면 Realtime Database 화면 맨 위에 보이는 주소(https://...firebasedatabase.app)를 직접 넣어주세요.

## 3. GitHub Pages에 올리기

1. GitHub에서 새 저장소 생성 (예: `duty-race`, Public)
2. `index.html` 업로드 (Add file > Upload files)
3. 저장소 **Settings > Pages > Branch: main / (root) > Save**
4. 1~2분 뒤 `https://<아이디>.github.io/duty-race/` 로 접속

## 사용법

- 주소를 동료들에게 공유 → 각자 이름, 차종(세단·해치백·SUV·스포츠카·픽업트럭), 색상(빨강·초록·파랑·흰색·검정) 선택 → 대기실 입장
- 아무나 **레이스 시작**을 누르면 전원 동시 출발 (시작한 사람의 바퀴 수·당직 방식 적용)
- 주소 뒤에 `?room=팀이름` 을 붙이면 다른 방으로 분리됩니다 (예: `.../duty-race/?room=jangone`)
- 인터넷이 안 되거나 설정 전에는 "한 명씩 돌아가며" 모드로 기기 하나를 돌려가며 할 수 있습니다

## 참고

- Firebase 무료 요금제(Spark)로 동시 접속 100명까지 충분합니다.
- `apiKey` 등 설정값은 웹페이지에 공개되는 값이라 GitHub에 올라가도 괜찮습니다. 대신 보안 규칙으로 `rooms` 경로만 읽고 쓸 수 있게 제한해 두었습니다.
- 주소를 아는 사람은 누구나 들어올 수 있으니, 주소는 사내에만 공유하세요.

## 앱으로 설치 (아이콘 만들기)

- `manifest.json`, `sw.js`, 아이콘 png 파일들이 함께 있어야 합니다.
- 안드로이드(크롬, 삼성 인터넷): 게임 목록 화면의 "설치" 버튼, 또는 메뉴 → 홈 화면에 추가
- 아이폰(사파리): 아래쪽 공유 버튼 → 홈 화면에 추가
- PC(크롬, 엣지): 주소창 오른쪽의 설치 아이콘, 또는 게임 목록 화면의 "설치" 버튼
