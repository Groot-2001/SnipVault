# SnipVault / PasteBin

## Screenshots

### HomePage

![Homepage image](./frontend/public/Assets/Img/Homepage.png)

### Signup Page

![Signupform image](./frontend/public/Assets/Img/signuppage.png)

### Login Page

![Loginform image](./frontend/public/Assets/Img/Loginpage.png)

### Dashboard

![dashboard image](./frontend/public/Assets/Img/dashboardpage.png)

---

## Deploy (Docker Compose)

The fastest way to deploy the full stack (frontend + backend + MongoDB) is Docker Compose.

### 1) Prepare env files

```bash
cp Backend/.env.example Backend/.env
cp frontend/.env.example frontend/.env
```

Update secrets in `Backend/.env` before production use.

### 2) Build and run

```bash
docker compose up --build -d
```

### 3) Verify

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Health check: `http://localhost:3001/health`

### 4) Stop

```bash
docker compose down
```

---

## Deploy on a VM without Docker

### Backend

```bash
cd Backend
cp .env.example .env
npm install
npm run start
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run build
```

Serve `frontend/build` with Nginx/Apache or any static hosting provider.
