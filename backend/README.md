# CyberRakshak Backend

This is the Python backend for the CyberRakshak cybersecurity scanning application.

## Features

- File scanning with YARA rules
- URL reputation checking
- Email analysis
- DNS record analysis
- IP address scanning
- Domain reputation checking

## Installation

1. Install Python 3.8 or higher
2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

## Running the Server

```
python app.py
```

The server will start on port 5000.

## API Endpoints

- POST `/api/scan/file` - Scan a file
- POST `/api/scan/url` - Scan a URL
- POST `/api/scan/email` - Scan an email
- POST `/api/scan/dns` - Scan DNS records
- POST `/api/scan/ip` - Scan an IP address
- POST `/api/scan/domain` - Scan a domain

## Database

The application uses SQLite for data storage. The database file `cyber_rakshak.db` will be created automatically.