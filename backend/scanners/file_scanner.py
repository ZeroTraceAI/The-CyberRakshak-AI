import yara
import hashlib
import os
import magic
import json
from utils.database import Database

class FileScanner:
    def __init__(self):
        self.db = Database()
        self.rules = self._load_yara_rules()
    
    def _load_yara_rules(self):
        """Load YARA rules for malware detection"""
        try:
            # In a real implementation, you would have actual YARA rules here
            # For this example, we'll create a simple rule
            rule_content = """
            rule SimpleMalwareDetection
            {
                strings:
                    $malware_sig1 = "malicious_pattern_1"
                    $malware_sig2 = "malicious_pattern_2"
                
                condition:
                    any of them
            }
            """
            return yara.compile(source=rule_content)
        except Exception as e:
            print(f"Error loading YARA rules: {e}")
            return None
    
    def _calculate_hashes(self, file_path):
        """Calculate MD5, SHA1, and SHA256 hashes of a file"""
        hash_md5 = hashlib.md5()
        hash_sha1 = hashlib.sha1()
        hash_sha256 = hashlib.sha256()
        
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
                hash_sha1.update(chunk)
                hash_sha256.update(chunk)
        
        return {
            'md5': hash_md5.hexdigest(),
            'sha1': hash_sha1.hexdigest(),
            'sha256': hash_sha256.hexdigest()
        }
    
    def _get_file_type(self, file_path):
        """Determine file type using python-magic"""
        try:
            return magic.from_file(file_path, mime=True)
        except Exception as e:
            return f"Unknown (Error: {str(e)})"
    
    def _yara_scan(self, file_path):
        """Scan file with YARA rules"""
        if not self.rules:
            return {'matches': [], 'detection_rate': 0}
        
        try:
            matches = self.rules.match(file_path)
            return {
                'matches': [str(match) for match in matches],
                'detection_rate': len(matches) * 25  # Simplified detection rate
            }
        except Exception as e:
            return {'matches': [], 'detection_rate': 0, 'error': str(e)}
    
    def scan(self, file_path):
        """Perform comprehensive file scan"""
        # Get file information
        file_size = os.path.getsize(file_path)
        file_type = self._get_file_type(file_path)
        hashes = self._calculate_hashes(file_path)
        
        # Perform YARA scan
        yara_result = self._yara_scan(file_path)
        
        # Calculate overall detection rate
        # In a real implementation, this would be more sophisticated
        detection_rate = min(yara_result['detection_rate'] + (10 if file_size > 10000000 else 0), 100)
        
        # Prepare result
        result = {
            'file_info': {
                'name': os.path.basename(file_path),
                'size': file_size,
                'type': file_type,
                'hashes': hashes
            },
            'scan_results': {
                'yara_matches': yara_result['matches'],
                'detection_rate': detection_rate,
                'clean_rate': 100 - detection_rate
            }
        }
        
        # Store scan result in database
        self.db.store_file_scan(result)
        
        return result