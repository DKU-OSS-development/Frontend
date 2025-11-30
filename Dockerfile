# 1단계: 빌드 환경
# as builder -> AS builder (대문자 권장)
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 정보 복사 및 의존성 설치
COPY package.json package-lock.json ./

RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 빌드 결과 확인 (디버깅용)
RUN ls -la /app/dist || echo "dist folder not found!"

# 2단계: 실행 환경
FROM nginx:alpine

# 사용자 정의 nginx.conf 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 복사된 파일 확인 (디버깅용)
RUN ls -la /usr/share/nginx/html

# 80번 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]