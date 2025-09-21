# CyberRakshak - Full Stack Cybersecurity Scanning Application

## Project Overview

CyberRakshak is a full-stack cybersecurity scanning application built with React (TypeScript) frontend and Python (Flask) backend. It provides real-time threat detection for files, URLs, emails, DNS records, IP addresses, and domains with high accuracy scanning capabilities.

## Features

- **File Scanning**: Upload and scan files for malware using YARA rules
- **URL Scanning**: Check URLs for phishing and malware hosting
- **Email Scanning**: Analyze emails, headers and attachments
- **DNS Scanning**: Inspect DNS records and anomalies
- **IP Scanning**: Geolocation and reputation scoring
- **Domain Scanning**: Reputation, WHOIS, and intelligence analysis
- **Real-time Results**: Progress indicators and instant insights
- **Reporting**: Downloadable JSON reports and sharing capabilities

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

## How to Run

### Prerequisites
1. Node.js and npm
2. Python 3.8 or higher
3. pip (Python package manager)

### Installation

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

You can run the full stack application in development mode using:

```bash
npm run dev
```

This will start both the React frontend (on port 8080) and the Python backend (on port 5000) simultaneously.

Alternatively, you can run the frontend and backend separately:

1. Start the backend:
   ```bash
   cd backend
   python app.py
   ```

2. In a separate terminal, start the frontend:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:8080

### Backend API Endpoints

- POST `/api/scan/file` - Scan a file
- POST `/api/scan/url` - Scan a URL
- POST `/api/scan/email` - Scan an email
- POST `/api/scan/dns` - Scan DNS records
- POST `/api/scan/ip` - Scan an IP address
- POST `/api/scan/domain` - Scan a domain

The backend uses real scanning engines for high accuracy detection.

## High Accuracy Implementation

### File Scanning
- YARA rule-based malware detection
- Hash calculation (MD5, SHA1, SHA256)
- File type detection with python-magic
- Real-time threat intelligence

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

## Project Structure

```
CyberRakshak/
├── backend/                 # Python/Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── scanners/           # Scanning modules
│   ├── utils/              # Utility modules
│   └── temp/               # Temporary file storage
├── src/                    # React frontend
│   ├── pages/              # Page components
│   ├── components/         # UI components
│   ├── services/           # API service
│   └── App.tsx             # Main application component
├── package.json            # Frontend dependencies
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.