# 🏥 India Hospital Management System

**Production-Ready Full-Stack Real-Time Hospital Management Platform for India**

Built by senior developers for immediate deployment. Uses Nominatim/OpenStreetMap for real hospital data across India.

## 🎯 What You Get

### Complete Full-Stack Application
- ✅ **React Frontend** - Modern UI with Tailwind CSS, real-time updates
- ✅ **NestJS Backend** - TypeScript API with Swagger docs
- ✅ **Real Hospital Data** - Nominatim/OSM API integration for Indian hospitals
- ✅ **Firebase Firestore** - Cloud database with real-time sync
- ✅ **Socket.IO** - WebSocket for instant updates across all clients
- ✅ **10 Indian Cities** - Pre-configured (Delhi, Mumbai, Bengaluru, etc.)

### Key Features
1. **Search Real Hospitals** - Uses Nominatim to find actual hospitals in Indian cities
2. **Bed Management** - Track ICU, Emergency, and General bed capacity in real-time
3. **Doctor Management** - Manage doctor availability and on-call status
4. **Readiness Engine** - Compute hospital readiness for emergency routing
5. **Real-Time Updates** - All changes propagate instantly via WebSocket
6. **Transaction-Safe** - Prevents race conditions with Firestore transactions

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed ([Download](https://nodejs.org/))
- Firebase account (free tier works) ([Sign up](https://firebase.google.com/))
- 10 minutes of your time

### Step 1: Extract & Install

```bash
# Extract the ZIP file
cd india-hospital-system

# Install all dependencies (takes 3-5 minutes)
npm run setup
```

This installs:
- Root dependencies (concurrently)
- Backend dependencies (NestJS, Firebase, Socket.IO, etc.)
- Frontend dependencies (React, Vite, Tailwind, etc.)

### Step 2: Firebase Setup

#### Create Firebase Project (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Project name: `india-hospital-system`
4. Disable Google Analytics (not needed)
5. Click "Create project"
6. Wait ~30 seconds for creation

#### Enable Firestore (1 minute)

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Select "Start in **production mode**"
4. Choose location: **asia-south1 (Mumbai)** (best for India)
5. Click "Enable"

#### Get Service Account Credentials (1 minute)

1. Click ⚙️ (Settings) → "Project settings"
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Click "Generate key" (downloads JSON file)

#### Configure Backend Environment

```bash
cd backend
cp .env.example .env
nano .env  # or use any text editor
```

Open the downloaded Firebase JSON file and copy values:

```env
FIREBASE_PROJECT_ID=india-hospital-system-xxxxx
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@india-hospital-system-xxxxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...(paste entire key)...\n-----END PRIVATE KEY-----\n"
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

**CRITICAL:** The private key must be on ONE line with `\n` for line breaks.

### Step 3: Run the Application

```bash
# From project root
npm run dev
```

This starts:
- ✅ Backend API → http://localhost:3000
- ✅ Frontend UI → http://localhost:3001

You should see:
```
[Backend] 🏥 India Hospital System: http://localhost:3000
[Backend] 🔥 Firebase initialized for India Hospital System
[Backend] ✅ Nominatim service initialized for India
[Backend] 🔌 WebSocket initialized
[Frontend] VITE v5.0.8 ready in XXX ms
[Frontend] ➜ Local: http://localhost:3001/
```

### Step 4: Test the System

1. Open browser: **http://localhost:3001**
2. You'll see the India Hospital System dashboard
3. Click "Hospitals" tab
4. Select city: "Delhi"
5. Click "Search Real Hospitals (OSM)"
6. **Real hospitals from OpenStreetMap will appear!**
7. Click "Import to System" on any hospital
8. Go to "Beds" tab → Manage bed capacity
9. Go to "Doctors" tab → Add doctors
10. Watch real-time updates across browser tabs!

## 📁 Project Structure

```
india-hospital-system/
├── backend/                      # NestJS API Server
│   ├── src/
│   │   ├── modules/
│   │   │   ├── hospital/        # Hospital CRUD + Nominatim integration
│   │   │   ├── beds/            # Real-time bed capacity management
│   │   │   ├── doctors/         # Doctor availability tracking
│   │   │   └── readiness/       # Readiness computation engine
│   │   ├── shared/
│   │   │   ├── firebase/        # Firestore integration
│   │   │   ├── nominatim/       # Nominatim/OSM API client
│   │   │   └── realtime/        # Socket.IO gateway
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                     # YOUR FIREBASE CREDENTIALS
│
├── frontend/                     # React Application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Dashboard.tsx   # Stats and metrics
│   │   │   ├── BedManagement.tsx
│   │   │   └── DoctorManagement.tsx
│   │   ├── services/
│   │   │   ├── api.ts          # Axios HTTP client
│   │   │   └── socket.ts       # Socket.IO client
│   │   ├── App.tsx             # Main application
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Tailwind styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── BACKEND_ALL_IN_ONE.ts        # All backend code (consolidated)
├── FRONTEND_ALL_IN_ONE.tsx      # All frontend code (consolidated)
├── package.json                 # Root package (runs both)
├── README.md                    # This file
└── SETUP_GUIDE.md              # Detailed setup instructions
```

## 🔧 How It Works

### Architecture

```
┌─────────────────────────────────────┐
│   React Frontend (Port 3001)        │
│   - Dashboard, Hospital List        │
│   - Bed/Doctor Management UI        │
│   - Socket.IO client                │
└──────────────┬──────────────────────┘
               │ HTTP REST + WebSocket
┌──────────────▼──────────────────────┐
│   NestJS Backend (Port 3000)        │
│   - REST API with Swagger           │
│   - Socket.IO server                │
│   - Business logic                  │
└──────────────┬──────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼─────────┐   ┌───────▼──────────┐
│  Firebase   │   │   Nominatim/OSM  │
│  Firestore  │   │   (Real Hospital │
│  (Database) │   │   Data for India)│
└─────────────┘   └──────────────────┘
```

### Data Flow

1. **User searches hospitals** → Frontend calls `/api/hospitals/search/india?city=Delhi`
2. **Backend queries Nominatim** → Gets real hospitals from OpenStreetMap
3. **Results returned** → User sees actual Indian hospitals with addresses
4. **User imports hospital** → Saved to Firebase Firestore
5. **User manages beds/doctors** → Updates saved with Firestore transactions
6. **WebSocket broadcasts** → All connected clients update in real-time

### Nominatim Integration

Uses [Nominatim](https://nominatim.org/) and [Overpass API](https://overpass-api.de/) for:
- ✅ Real hospital data from OpenStreetMap
- ✅ Accurate Indian addresses
- ✅ GPS coordinates
- ✅ No API key required (free, rate-limited)
- ✅ Falls back to sample data if API unavailable

### Real-Time Updates

Every change triggers WebSocket events:
```
Bed Update → Firebase Transaction → Socket Emit → All Clients Update
```

Open multiple browser tabs to see instant synchronization!

## 🌐 API Endpoints

### Hospitals

```bash
# Search real hospitals in Indian cities (Nominatim/OSM)
GET /api/hospitals/search/india?city=Delhi

# Get list of Indian cities
GET /api/hospitals/cities

# Create hospital in system
POST /api/hospitals
Body: { name, address, city, state, location, departments, services, emergencyCapability }

# Get all system hospitals
GET /api/hospitals

# Get single hospital
GET /api/hospitals/:id

# Update hospital
PUT /api/hospitals/:id
```

### Beds

```bash
# Get bed capacity for hospital
GET /api/beds/:hospitalId

# Update bed capacity
PUT /api/beds/:hospitalId
Body: { icuBeds, emergencyBeds, generalBeds }

# Atomic increment/decrement (prevents race conditions)
POST /api/beds/:hospitalId/increment
Body: { bedType: "icu", field: "occupied", count: 1 }
```

### Doctors

```bash
# Create doctor
POST /api/doctors
Body: { name, hospitalId, specialization, status, emergencyOnCall }

# Get doctors by hospital
GET /api/doctors?hospitalId=xxx

# Update doctor status
PUT /api/doctors/status/:id
Body: { status: "AVAILABLE", emergencyOnCall: true }

# Get doctor summary for hospital
GET /api/doctors/summary/:hospitalId
```

### Readiness

```bash
# Compute hospital readiness
POST /api/readiness/compute
Body: { hospitalId: "xxx" }

# Get cached readiness
GET /api/readiness/:hospitalId

# Get all hospitals readiness
GET /api/readiness
```

## 🧪 Testing

### Manual Testing

```bash
# Test 1: Check backend is running
curl http://localhost:3000/api/hospitals/cities

# Test 2: Search REAL hospitals in Delhi (uses Nominatim)
curl "http://localhost:3000/api/hospitals/search/india?city=Delhi"

# Test 3: Create a hospital
curl -X POST http://localhost:3000/api/hospitals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Hospital",
    "city": "Mumbai",
    "state": "Maharashtra",
    "location": {"lat": 19.0760, "lng": 72.8777},
    "address": "Mumbai, Maharashtra",
    "departments": [{"name": "Emergency", "operational": true}],
    "services": ["Emergency", "ICU"],
    "emergencyCapability": "FULL"
  }'

# Copy the "id" from response, then:

# Test 4: Update beds
curl -X PUT http://localhost:3000/api/beds/HOSPITAL_ID \
  -H "Content-Type: application/json" \
  -d '{
    "icuBeds": {"total": 10, "occupied": 5, "free": 5},
    "emergencyBeds": {"total": 20, "occupied": 10, "free": 10},
    "generalBeds": {"total": 30, "occupied": 15, "free": 15}
  }'

# Test 5: Compute readiness
curl -X POST http://localhost:3000/api/readiness/compute \
  -H "Content-Type: application/json" \
  -d '{"hospitalId": "HOSPITAL_ID"}'
```

### API Documentation

Visit: **http://localhost:3000/api/docs**

Interactive Swagger UI with all endpoints, request/response schemas, and "Try it out" functionality.

## 📊 Features in Detail

### 1. Hospital Search (Nominatim/OSM)

- Searches real hospitals from OpenStreetMap database
- Covers all major Indian cities
- Returns actual addresses and GPS coordinates
- Falls back to sample data if API rate-limited
- No API key needed (free service)

### 2. Bed Management

- Three bed types: ICU, Emergency, General
- Track Total, Occupied, Free counts
- Real-time synchronization across clients
- Atomic operations prevent race conditions
- Auto-calculates free beds

### 3. Doctor Management

- Specializations: Emergency, Cardiologist, Neurologist, Surgeon, Pediatrician
- Status: Available, Busy, On Call, Off Duty
- Emergency on-call flag
- Shift timings (optional)
- Real-time status updates

### 4. Readiness Engine

Computes hospital readiness based on:
- Bed availability ≥ 10%
- At least 1 available doctor
- At least 1 emergency on-call doctor

Readiness score (0-100):
- 40% bed availability
- 30% doctor availability  
- 30% emergency doctor ratio

### 5. Real-Time Updates (Socket.IO)

Events:
- `hospital:created` - New hospital added
- `hospital:updated` - Hospital info changed
- `beds:updated` - Bed capacity changed
- `doctor:created` - New doctor added
- `doctor:updated` - Doctor status changed
- `readiness:updated` - Readiness recomputed

Clients subscribe to specific hospitals:
```javascript
socket.emit('subscribe:hospital', { hospitalId: 'xxx' });
```

## 🐛 Troubleshooting

### Backend won't start

**Error: Firebase authentication failed**
- ✅ Check `.env` file exists in `backend/` folder
- ✅ Verify `FIREBASE_PRIVATE_KEY` is on ONE line with `\n` escapes
- ✅ Ensure no extra spaces in credentials
- ✅ Private key should start with `"-----BEGIN PRIVATE KEY-----\n`

**Error: Port 3000 already in use**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or change port in backend/.env
PORT=3001
```

### Frontend won't start

**Error: Port 3001 already in use**
```bash
# Edit frontend/vite.config.ts and change port
server: { port: 3002 }
```

**Error: Cannot connect to backend**
- ✅ Ensure backend is running on port 3000
- ✅ Check console for CORS errors
- ✅ Verify `backend/.env` has `CORS_ORIGIN=http://localhost:3001`

### Nominatim returns no results

**No hospitals found or empty array**
- ⚠️ Nominatim/Overpass API may be rate-limited (wait 5 minutes)
- ⚠️ System will use fallback sample hospitals
- ✅ Try different city
- ✅ Check backend logs for specific error

### Socket.IO not connecting

**Real-time updates not working**
- ✅ Check browser console (F12) for WebSocket errors
- ✅ Backend should log "Client connected: ..."
- ✅ Try restarting backend
- ✅ Clear browser cache

### Firebase errors

**Permission denied**
- ✅ Go to Firebase Console → Firestore → Rules
- ✅ Temporarily set to allow all (development only):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
- ⚠️ Secure rules before production!

## 🚢 Production Deployment

### Backend (Railway, Heroku, AWS)

```bash
cd backend
npm run build
npm run start:prod
```

Set environment variables in hosting platform:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `PORT`
- `CORS_ORIGIN` (your frontend URL)

### Frontend (Vercel, Netlify, Cloudflare)

```bash
cd frontend
npm run build
# Upload 'dist' folder to hosting
```

Update API base URL in `frontend/src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'https://your-backend.com/api',
});
```

## 🛠️ Development

### Adding New Features

1. **Backend Module**: Add to `backend/src/modules/`
2. **Frontend Component**: Add to `frontend/src/components/`
3. **API Endpoint**: Add to respective controller
4. **Socket Event**: Emit from backend, listen in frontend

### Code Organization

- **BACKEND_ALL_IN_ONE.ts**: Contains ALL backend code with clear section markers
- **FRONTEND_ALL_IN_ONE.tsx**: Contains ALL frontend code with section markers
- Each section is labeled with its target file path
- Production-ready code, can run as-is or split into individual files

### Running in Development Mode

```bash
# Backend with hot reload
cd backend && npm run start:dev

# Frontend with hot reload
cd frontend && npm run dev
```

## 📚 Technologies Used

### Backend
- **NestJS 10.3** - Progressive Node.js framework
- **TypeScript 5.3** - Type-safe JavaScript
- **Firebase Admin SDK 12.0** - Firestore database
- **Socket.IO 4.6** - Real-time WebSocket
- **Axios** - HTTP client for Nominatim API
- **Class Validator** - DTO validation
- **Swagger** - API documentation

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Vite 5.0** - Fast build tool
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Socket.IO Client 4.6** - WebSocket client
- **Axios 1.6** - HTTP client
- **Lucide React** - Icon library

### External APIs
- **Nominatim** - Free geocoding (OpenStreetMap)
- **Overpass API** - Query OSM hospital data
- **Firebase Firestore** - Cloud NoSQL database

## 📝 License

This project is built for educational and commercial use.

## 🙋 Support

### Documentation
- API Docs: http://localhost:3000/api/docs
- Nominatim: https://nominatim.org/release-docs/latest/
- Firebase: https://firebase.google.com/docs/firestore
- Socket.IO: https://socket.io/docs/

### Common Questions

**Q: Do I need Google API key?**  
A: No! Uses Nominatim (OpenStreetMap) which is free and requires no API key.

**Q: How many hospitals can I store?**  
A: Unlimited on Firebase free tier (up to 1GB storage, plenty for thousands of hospitals).

**Q: Can I customize for other countries?**  
A: Yes! Update `INDIAN_CITIES` in `nominatim.service.ts` with your cities.

**Q: Is this production-ready?**  
A: Yes! Built with:
- ✅ Proper error handling
- ✅ Transaction-safe database operations
- ✅ Type safety (TypeScript)
- ✅ Input validation
- ✅ Real-time data synchronization
- ✅ Scalable architecture

**Q: Can I see the code structure?**  
A: Yes! Check:
- `BACKEND_ALL_IN_ONE.ts` - Complete backend (all modules)
- `FRONTEND_ALL_IN_ONE.tsx` - Complete frontend (all components)
- Each section is clearly labeled with file paths

## ✨ What Makes This Special

✅ **ZERO Configuration** - Works out of the box with just Firebase credentials  
✅ **REAL Data** - Uses Nominatim/OSM for actual Indian hospitals  
✅ **Production-Ready** - Transaction-safe, type-safe, error-handled  
✅ **Real-Time** - Instant updates across all clients  
✅ **India-Focused** - 10 major cities pre-configured  
✅ **Free APIs** - No paid API keys needed  
✅ **Full-Stack** - Complete frontend + backend in one package  
✅ **Modern Stack** - Latest React, NestJS, TypeScript  
✅ **Well-Documented** - Comprehensive guides and API docs  

## 🎯 Quick Reference

```bash
# Setup
npm run setup

# Run both frontend and backend
npm run dev

# Run separately
cd backend && npm run start:dev
cd frontend && npm run dev

# Build for production
npm run build

# Access points
Frontend: http://localhost:3001
Backend: http://localhost:3000
API Docs: http://localhost:3000/api/docs
```

---

**Built with ❤️ for Indian Healthcare**

Ready to deploy. Ready to scale. Ready to save lives.
