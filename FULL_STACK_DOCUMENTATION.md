# CyberRakshak Full-Stack Application

## Overview

CyberRakshak is now a full-stack cybersecurity scanning application with a React frontend and Python/Flask backend. It provides real-time threat detection for files, URLs, emails, DNS records, IP addresses, and domains.

## Architecture

```
CyberRakshak/
├── backend/                 # Python/Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── scanners/           # Scanning modules
│   │   ├── file_scanner.py
│   │   ├── url_scanner.py
│   │   ├── email_scanner.py
│   │   ├── dns_scanner.py
│   │   ├── ip_scanner.py
│   │   └── domain_scanner.py
│   ├── utils/              # Utility modules
│   │   └── database.py     # SQLite database integration
│   └── temp/               # Temporary file storage
├── src/                    # React frontend
│   ├── pages/              # Page components
│   ├── components/         # UI components
│   ├── services/           # API service
│   └── App.tsx             # Main application component
├── package.json            # Frontend dependencies
└── README.md              # Project documentation
```

## Features

### File Scanning
- YARA rule-based malware detection
- Hash calculation (MD5, SHA1, SHA256)
- File type detection
- Real-time scanning with progress indicators

### URL Scanning
- SSL certificate validation
- Domain reputation checking
- URL structure analysis
- Safety scoring system

### Email Scanning
- Header analysis
- Content scanning for phishing indicators
- Authentication verification (SPF, DKIM, DMARC)

### DNS Scanning
- Record analysis (A, MX, TXT, NS, CNAME)
- Security feature checking
- Anomaly detection

### IP Scanning
- Geolocation information
- Reputation checking
- Open port detection
- Risk assessment

### Domain Scanning
- WHOIS information
- Domain age analysis
- Reputation checking
- DNS resolution verification

## Technology Stack

### Frontend
- React with TypeScript
- Vite build tool
- shadcn/ui components
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- Python 3.8+
- Flask web framework
- YARA for pattern matching
- python-magic for file type detection
- dnspython for DNS queries
- SQLite for data storage

## Installation

### Prerequisites
1. Node.js and npm
2. Python 3.8 or higher
3. pip (Python package manager)

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd cyber-rakshak
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

## Running the Application

### Development Mode
Run both frontend and backend simultaneously:
```
npm run dev
```

This will start:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

### Separate Processes
1. Start the backend:
   ```
   cd backend
   python app.py
   ```

2. Start the frontend:
   ```
   npm run dev
   ```

## API Endpoints

### File Scanning
- **Endpoint**: `POST /api/scan/file`
- **Body**: Multipart form data with file
- **Response**: File analysis results

### URL Scanning
- **Endpoint**: `POST /api/scan/url`
- **Body**: JSON with `url` field
- **Response**: URL safety analysis

### Email Scanning
- **Endpoint**: `POST /api/scan/email`
- **Body**: JSON with email data
- **Response**: Email threat analysis

### DNS Scanning
- **Endpoint**: `POST /api/scan/dns`
- **Body**: JSON with `domain` field
- **Response**: DNS record analysis

### IP Scanning
- **Endpoint**: `POST /api/scan/ip`
- **Body**: JSON with `ip` field
- **Response**: IP address analysis

### Domain Scanning
- **Endpoint**: `POST /api/scan/domain`
- **Body**: JSON with `domain` field
- **Response**: Domain reputation analysis

## Database

The application uses SQLite for data storage with the following tables:

### Scans Table
Stores scan results with:
- Scan type (file, url, email, dns, ip, domain)
- Target (file name, URL, email address, etc.)
- Result (JSON serialized scan results)
- Timestamp

### Users Table (Future Implementation)
For user authentication and scan history.

## Security Features

### Backend Security
- CORS protection
- Input validation
- Secure file handling
- Error handling

### Frontend Security
- Secure API communication
- Input sanitization
- Protected routes

## High Accuracy Implementation

### File Scanning
- Uses YARA rules for pattern matching
- Multiple hash algorithms for file identification
- File type detection with libmagic

### URL Scanning
- SSL certificate validation
- Domain reputation checking against threat feeds
- URL structure analysis for phishing indicators

### Email Scanning
- Header analysis for anomalies
- Content scanning for malicious patterns
- Authentication verification (SPF, DKIM, DMARC)

### DNS Scanning
- Comprehensive record analysis
- Security feature checking
- Anomaly detection algorithms

### IP Scanning
- Geolocation services
- Reputation checking against multiple threat feeds
- Port scanning for open services

### Domain Scanning
- WHOIS data analysis
- Domain age verification
- DNS resolution checking

## Future Enhancements

1. User authentication system
2. Scan history and reporting
3. Scheduled scans
4. Alerting system
5. Integration with additional threat intelligence feeds
6. Machine learning-based detection
7. Admin dashboard
8. Mobile application