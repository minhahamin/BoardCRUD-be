# Vercel 배포 및 프론트엔드-백엔드 연결 가이드

## 1. 백엔드 배포 (현재 프로젝트)

### Vercel에서 백엔드 배포
1. Vercel 대시보드에서 새 프로젝트 생성
2. GitHub 저장소 연결
3. 환경 변수 설정:
   ```
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   DB_DATABASE=your-database
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=1d
   NODE_ENV=production
   TYPEORM_SYNCHRONIZE=false
   TYPEORM_LOGGING=false
   ```

### 배포 후 백엔드 URL 확인
```
https://your-backend-project.vercel.app
```

## 2. 프론트엔드 프로젝트 설정

### Next.js 프로젝트 생성 (별도 저장소)
```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
```

### 환경 변수 설정 (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
```

### API 호출 함수 예시
```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/writes`);
  return response.json();
};

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_BASE_URL}/writes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });
  return response.json();
};
```

## 3. 프론트엔드 배포

### Vercel에서 프론트엔드 배포
1. 프론트엔드 프로젝트를 별도 GitHub 저장소에 푸시
2. Vercel에서 새 프로젝트 생성
3. 환경 변수 설정:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app
   ```

### 배포 후 프론트엔드 URL 확인
```
https://your-frontend-project.vercel.app
```

## 4. 연결 확인

### API 테스트
```bash
# 백엔드 API 테스트
curl https://your-backend-project.vercel.app/writes

# Swagger 문서 확인
https://your-backend-project.vercel.app/api-docs
```

### 프론트엔드에서 API 호출 테스트
브라우저 개발자 도구에서:
```javascript
fetch('https://your-backend-project.vercel.app/writes')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 5. 문제 해결

### CORS 오류
- 백엔드 CORS 설정에서 프론트엔드 도메인 추가
- Vercel 환경 변수에서 올바른 도메인 설정

### 환경 변수 문제
- Vercel 대시보드에서 환경 변수 재설정
- 프론트엔드에서 `NEXT_PUBLIC_` 접두사 확인

### 데이터베이스 연결 문제
- 프로덕션 데이터베이스 설정 확인
- Vercel 환경 변수에서 데이터베이스 정보 확인 