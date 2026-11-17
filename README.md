# 판소리대학교 홈페이지 (PANSORI UNIVERSITY)

첨부 시안을 바탕으로 만든 반응형 **정적 웹사이트**입니다. GitHub Pages에서 별도 서버나 빌드 과정 없이 실행됩니다.

## 기능
- PC·태블릿·모바일 반응형 메인 화면
- 상단 대분류 메뉴와 하위 메뉴, 전체메뉴 드로어
- 메인 배너 3개 슬라이드 (자동/수동/일시정지)
- 공지사항·학사안내·행사안내 탭
- 상단 검색(예시 메뉴·공지 데이터 검색)
- 대학소개·대학/대학원·입학안내·학사정보·판소리광장·캠퍼스생활 하위 페이지(해시 기반 전환)
- 키보드 접근성 기본 처리 및 모바일 UI

## GitHub Pages에 게시하기
1. 이 폴더의 **내용물**(`index.html`, `styles.css`, `script.js`, `assets/`, `README.md`)을 GitHub 저장소 최상위(root)에 업로드합니다.
2. GitHub 저장소에서 **Settings → Pages** 메뉴로 이동합니다.
3. **Build and deployment → Deploy from a branch**를 선택합니다.
4. Branch: `main`, Folder: `/ (root)`를 선택하고 저장합니다.
5. 배포가 완료되면 `https://사용자명.github.io/저장소명/`에 접속합니다.

## 로컬 실행
`index.html` 파일을 브라우저에서 직접 열어도 됩니다. 개발 시에는 VS Code Live Server를 사용하는 것을 권장합니다.

## 주요 파일
- `index.html`: 페이지 마크업 및 주요 시각 영역
- `styles.css`: 색상, 레이아웃, PC/모바일 스타일
- `script.js`: 메뉴 데이터, 페이지 콘텐츠, 탭, 검색, 슬라이드 로직
- `assets/`: 사용자 제공 시안을 바탕으로 재구성한 이미지

## 수정 지점
- 메뉴명과 하위 메뉴: `script.js`의 `MENU`
- 메인 공지: `script.js`의 `NEWS`
- 메인 슬라이드 글귀: `script.js`의 `SLIDES`
- 하위 페이지 본문: `script.js`의 `pageBody()`
- 색상: `styles.css` 상단 `:root`의 `--wine`, `--wine-deep`, `--navy`, `--cream`
- 이미지: `assets/hero-campus.webp`, `assets/campus-life.webp`, `assets/culture.webp`

## 유의 사항
- **판소리대학교는 가상의 대학**이며 주소, 실제 학사시스템, 입학 원서접수, 인증 기능은 연결되지 않았습니다.
- 뉴스·일정·소개 문안은 시연용 예시입니다. 배포 전 실제 운영 정보로 교체하세요.
- 참고 URL의 대학 사이트를 복제한 것이 아니라, 정보 구조와 일반적인 대학 사이트 사용 패턴을 참고한 독자적 프런트엔드입니다.
- 이미지 일부는 사용자 제공 화면 시안에서 추출했기 때문에 원본 별도 이미지로 교체하면 더 높은 화질로 운영할 수 있습니다.
