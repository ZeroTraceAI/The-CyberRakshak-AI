import sqlite3
import json
import os
from datetime import datetime

class Database:
    def __init__(self, db_path='cyber_rakshak.db'):
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Initialize the database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create scans table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                scan_type TEXT NOT NULL,
                target TEXT NOT NULL,
                result TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create users table (for future use)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def store_scan(self, scan_type, target, result):
        """Store scan result in database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO scans (scan_type, target, result)
            VALUES (?, ?, ?)
        ''', (scan_type, target, json.dumps(result)))
        
        conn.commit()
        conn.close()
    
    def store_file_scan(self, result):
        """Store file scan result"""
        target = result['file_info']['name']
        self.store_scan('file', target, result)
    
    def store_url_scan(self, result):
        """Store URL scan result"""
        target = result['url']
        self.store_scan('url', target, result)
    
    def store_email_scan(self, result):
        """Store email scan result"""
        target = result['sender']
        self.store_scan('email', target, result)
    
    def store_dns_scan(self, result):
        """Store DNS scan result"""
        target = result['domain']
        self.store_scan('dns', target, result)
    
    def store_ip_scan(self, result):
        """Store IP scan result"""
        target = result['ip']
        self.store_scan('ip', target, result)
    
    def store_domain_scan(self, result):
        """Store domain scan result"""
        target = result['domain']
        self.store_scan('domain', target, result)
    
    def get_scan_history(self, scan_type=None, limit=50):
        """Retrieve scan history"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        if scan_type:
            cursor.execute('''
                SELECT * FROM scans 
                WHERE scan_type = ? 
                ORDER BY timestamp DESC 
                LIMIT ?
            ''', (scan_type, limit))
        else:
            cursor.execute('''
                SELECT * FROM scans 
                ORDER BY timestamp DESC 
                LIMIT ?
            ''', (limit,))
        
        rows = cursor.fetchall()
        conn.close()
        
        # Convert to list of dictionaries
        columns = [column[0] for column in cursor.description]
        return [dict(zip(columns, row)) for row in rows]