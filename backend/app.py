from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import sys

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scanners.file_scanner import FileScanner
from scanners.url_scanner import UrlScanner
from scanners.email_scanner import EmailScanner
from scanners.dns_scanner import DnsScanner
from scanners.ip_scanner import IpScanner
from scanners.domain_scanner import DomainScanner

app = Flask(__name__)
CORS(app)

# Initialize scanners
file_scanner = FileScanner()
url_scanner = UrlScanner()
email_scanner = EmailScanner()
dns_scanner = DnsScanner()
ip_scanner = IpScanner()
domain_scanner = DomainScanner()

# API Routes
@app.route('/api/scan/file', methods=['POST'])
def scan_file():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '' or file.filename is None:
            return jsonify({'success': False, 'message': 'No file selected'}), 400
        
        # Save file temporarily
        temp_path = os.path.join('temp', file.filename or 'temp_file')
        os.makedirs('temp', exist_ok=True)
        file.save(temp_path)
        
        # Scan the file
        result = file_scanner.scan(temp_path)
        
        # Clean up
        os.remove(temp_path)
        
        return jsonify({'success': True, 'data': result, 'message': 'File scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/scan/url', methods=['POST'])
def scan_url():
    try:
        data = request.get_json()
        url = data.get('url') if data else None
        
        if not url:
            return jsonify({'success': False, 'message': 'No URL provided'}), 400
        
        result = url_scanner.scan(url)
        return jsonify({'success': True, 'data': result, 'message': 'URL scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/scan/email', methods=['POST'])
def scan_email():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No email data provided'}), 400
        
        result = email_scanner.scan(data)
        return jsonify({'success': True, 'data': result, 'message': 'Email scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/scan/dns', methods=['POST'])
def scan_dns():
    try:
        data = request.get_json()
        domain = data.get('domain') if data else None
        
        if not domain:
            return jsonify({'success': False, 'message': 'No domain provided'}), 400
        
        result = dns_scanner.scan(domain)
        return jsonify({'success': True, 'data': result, 'message': 'DNS scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/scan/ip', methods=['POST'])
def scan_ip():
    try:
        data = request.get_json()
        ip = data.get('ip') if data else None
        
        if not ip:
            return jsonify({'success': False, 'message': 'No IP provided'}), 400
        
        result = ip_scanner.scan(ip)
        return jsonify({'success': True, 'data': result, 'message': 'IP scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/scan/domain', methods=['POST'])
def scan_domain():
    try:
        data = request.get_json()
        domain = data.get('domain') if data else None
        
        if not domain:
            return jsonify({'success': False, 'message': 'No domain provided'}), 400
        
        result = domain_scanner.scan(domain)
        return jsonify({'success': True, 'data': result, 'message': 'Domain scan completed'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)
    app.run(debug=True, port=5000)