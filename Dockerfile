# 가벼운 Nginx 이미지를 사용
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# index.html을 Nginx가 보여줄 폴더로 복사
COPY index.html /usr/share/nginx/html/index.html

# 80번 포트 오픈
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]