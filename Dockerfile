# ==========================================
# STAGE 1: Build the Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend dependency manifests
COPY frontend/package*.json ./

# Install all frontend dependencies cleanly
RUN npm ci

# Copy frontend source code
COPY frontend/ .

# Build the frontend production assets (generates /app/frontend/dist)
RUN npm run build

# ==========================================
# STAGE 2: Build the Production Monolith Backend
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy backend dependency manifests
COPY backend/package*.json ./backend/

# Install only production dependencies for the backend
RUN cd backend && npm ci --omit=dev

# Copy backend source code
COPY backend/ ./backend/

# AUTOMATION STEP: Copy the built frontend dist folder 
# from the Stage 1 builder into the backend's public folder
COPY --from=frontend-builder /app/frontend/dist ./backend/public

# Expose the backend port
EXPOSE 3000

# Set the execution context to the backend directory and start the server
WORKDIR /app/backend
CMD ["node", "server.js"]