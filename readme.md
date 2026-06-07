# 📦 Version Control Web — API de Temas
 
API REST construida con **Node.js + Express** que expone temas educativos sobre versionamiento de software, CI/CD y contenedores. Incluye pipelines automatizados para ambientes de QA (Vercel) y Producción (Azure VM + Docker).
 
---
 
## 📁 Estructura del proyecto
 
```
├── app.js              # Configuración de Express y rutas
├── server.js           # Punto de entrada, inicia el servidor
├── data/
│   └── topics.js       # Datos estáticos de los temas
└── .github/
    └── workflows/
        └── ci-cd.yml   # Pipeline de CI/CD con GitHub Actions
```
 
---
 
## 🚀 Endpoints disponibles
 
### `GET /api/topics`
Retorna todos los temas disponibles.
 
**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Antes del versionamiento",
    "description": "Código enviado por correo, USB o archivos duplicados...",
    "link": "https://git-scm.com/"
  },
  ...
]
```
 
---
 
### `GET /api/topics/:id`
Retorna un tema específico por su ID.
 
**Ejemplo:** `GET /api/topics/3`
 
```json
{
  "id": 3,
  "title": "Git",
  "description": "Sistema distribuido de control de versiones que guarda snapshots del código.",
  "link": "https://git-scm.com/"
}
```
 
**Si el ID no existe:** responde con `404` y `{ "message": "Tema no encontrado" }`.
 
---
 
## 📚 Temas incluidos
 
| ID | Título | Descripción breve |
|----|--------|-------------------|
| 1 | Antes del versionamiento | Problemas del pasado: USB, correos, sobrescrituras |
| 2 | Herramientas de versionamiento | Historial, colaboración y rollback |
| 3 | Git | Sistema distribuido de control de versiones |
| 4 | Conventional Commits | Mensajes de commit estructurados |
| 5 | Plataformas de repositorios | GitHub, GitLab, Bitbucket, SVN |
| 6 | Git Flow | Modelo de ramas para proyectos grandes |
| 7 | Trunk Based Development | Integración frecuente en `main` |
| 8 | Versionamiento Semántico | Formato `MAJOR.MINOR.PATCH` |
| 9 | CI/CD | Automatización de build, pruebas y despliegue |
| 10 | Docker | Contenedores para empaquetar aplicaciones |
| 11 | Kubernetes | Orquestación y escalado de contenedores |
 
---
 
## ▶️ Correr localmente
 
```bash
# Instalar dependencias
npm install
 
# Iniciar el servidor
node server.js
```
 
La API queda disponible en: `http://localhost:3001`
 
---
 
## 🔁 Pipeline CI/CD
 
El archivo `.github/workflows/ci-cd.yml` define dos pipelines completamente automatizados que se activan según el tipo de push en el repositorio.
 
---
 
### 🟡 Pipeline QA — activado al hacer push a `qa`
 
```
push → qa branch
        │
        ▼
  [test-qa]
  ├── Checkout del código
  ├── Setup Node.js 20
  ├── npm ci (instalar dependencias)
  ├── npm audit (auditoría de seguridad)
  ├── npm test (pruebas unitarias)
  └── npm run test:coverage (cobertura de código)
        │
        ▼
  [deploy-qa] → Vercel (preview)
  ├── Instalar Vercel CLI
  ├── vercel pull (descarga configuración del proyecto)
  ├── vercel build (construye el proyecto)
  └── vercel deploy --prebuilt (despliega en ambiente preview)
```
 
**Secrets requeridos para QA:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID_QA`
- `VERCEL_PROJECT_ID_QA`
---
 
### 🟢 Pipeline Producción — activado al crear un tag `v*`
 
```
git tag v1.0.0 && git push --tags
        │
        ▼
  [test-prod]
  ├── (mismos pasos que test-qa)
  └── Sonar Scan (análisis estático de código con SonarQube)
        │
        ▼
  [build-and-push]
  ├── Login en DockerHub
  ├── docker build → shaggymission/version-control-web:v1.0.0
  └── docker push → DockerHub
        │
        ▼
  [deploy-prod] → Azure VM (SSH)
  ├── Verificar/instalar Docker en la VM
  ├── docker pull (descarga la nueva imagen)
  ├── docker stop + docker rm (detiene el contenedor anterior)
  └── docker run -d -p 3001:3001 (inicia el nuevo contenedor)
        │
        ▼
  [release]
  └── Crea un GitHub Release con notas autogeneradas
```
 
**Secrets requeridos para Producción:**
- `SONAR_TOKEN`
- `DOCKER_USERNAME`
- `DOCKERHUB_TOKEN`
- `AZURE_VM_IP`
- `AZURE_VM_USER`
- `AZURE_VM_SSH_KEY`
---
 
## 🐳 Docker
 
La aplicación se empaqueta en una imagen Docker y se sube a DockerHub con el tag de la versión:
 
```
shaggymission/version-control-web:v1.0.0
```
 
En producción el contenedor se llama `apitopics` y expone el puerto `3001`.
 
Para correr la imagen manualmente:
 
```bash
docker pull shaggymission/version-control-web:v1.0.0
docker run -d --name apitopics -p 3001:3001 shaggymission/version-control-web:v1.0.0
```
 
---
 
## 🏷️ Versionamiento semántico
 
Este proyecto usa tags de Git con el formato `vMAJOR.MINOR.PATCH` para disparar el pipeline de producción:
 
```bash
git tag v1.2.0
git push origin v1.2.0
```
 
---
 
## 🔐 Secrets de GitHub Actions requeridos
 
| Secret | Uso |
|--------|-----|
| `VERCEL_TOKEN` | Autenticación con Vercel |
| `VERCEL_ORG_ID_QA` | ID de organización en Vercel (QA) |
| `VERCEL_PROJECT_ID_QA` | ID de proyecto en Vercel (QA) |
| `SONAR_TOKEN` | Análisis de calidad con SonarQube |
| `DOCKER_USERNAME` | Login en DockerHub |
| `DOCKERHUB_TOKEN` | Token de acceso a DockerHub |
| `AZURE_VM_IP` | IP pública de la VM en Azure |
| `AZURE_VM_USER` | Usuario SSH de la VM |
| `AZURE_VM_SSH_KEY` | Clave privada SSH para acceder a la VM |
 
---
 
## 🛠️ Tecnologías usadas
 
- **Node.js + Express** — API REST
- **GitHub Actions** — CI/CD
- **Vercel** — Deploy de QA (preview)
- **Docker + DockerHub** — Empaquetado de la aplicación
- **Azure VM** — Servidor de producción
- **SonarQube** — Análisis estático de código
 