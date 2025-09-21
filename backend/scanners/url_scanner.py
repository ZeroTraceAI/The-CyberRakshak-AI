import requests
import socket
import ssl
import urllib.parse

class UrlScanner:
    def __init__(self):
        pass
    
    def _check_ssl_certificate(self, domain):
        """Check SSL certificate validity"""
        try:
            context = ssl.create_default_context()
            with socket.create_connection((domain, 443), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=domain) as ssock:
                    cert = ssock.getpeercert()
                    # Handle certificate data safely
                    issuer_dict = {}
                    if cert is not None:
                        # Extract issuer information
                        issuer_data = cert.get('issuer', [])
                        if issuer_data:
                            for item in issuer_data:
                                if isinstance(item, tuple) and len(item) > 0 and isinstance(item[0], tuple) and len(item[0]) >= 2:
                                    issuer_dict[item[0][0]] = item[0][1]
                    
                    return {
                        'valid': True,
                        'issuer': issuer_dict,
                        'expiration': cert.get('notAfter', 'Unknown') if cert else 'Unknown'
                    }
        except Exception as e:
            return {
                'valid': False,
                'error': str(e)
            }
    
    def _check_domain_reputation(self, domain):
        """Check domain reputation (simplified)"""
        # In a real implementation, this would check against threat intelligence feeds
        suspicious_keywords = ['login', 'secure', 'account', 'update', 'verify']
        suspicious_count = sum(1 for keyword in suspicious_keywords if keyword in domain.lower())
        
        return {
            'suspicious_keywords': suspicious_count,
            'reputation_score': max(100 - (suspicious_count * 20), 0)
        }
    
    def _analyze_url_structure(self, url):
        """Analyze URL structure for suspicious patterns"""
        parsed = urllib.parse.urlparse(url)
        domain = parsed.netloc
        
        # Check for IP address in domain
        try:
            socket.inet_aton(domain)
            is_ip_domain = True
        except socket.error:
            is_ip_domain = False
        
        # Check URL length
        url_length = len(url)
        
        # Check for suspicious characters
        suspicious_chars = sum(1 for c in url if c in ['@', '-', '_', '~'])
        
        return {
            'uses_ip_address': is_ip_domain,
            'length': url_length,
            'suspicious_chars': suspicious_chars,
            'suspicious_score': min((suspicious_chars * 10) + (50 if is_ip_domain else 0) + (1 if url_length > 100 else 0) * 20, 100)
        }
    
    def scan(self, url):
        """Perform comprehensive URL scan"""
        parsed_url = urllib.parse.urlparse(url)
        domain = parsed_url.netloc
        
        # Analyze URL structure
        url_analysis = self._analyze_url_structure(url)
        
        # Check domain reputation
        reputation = self._check_domain_reputation(domain)
        
        # Check SSL certificate
        ssl_info = self._check_ssl_certificate(domain) if parsed_url.scheme == 'https' else {'valid': False, 'reason': 'Not HTTPS'}
        
        # Calculate overall safety score
        safety_score = max(100 - url_analysis['suspicious_score'] - (20 if not ssl_info['valid'] else 0), 0)
        
        # Determine threats
        threats = []
        if url_analysis['suspicious_score'] > 50:
            threats.append("Suspicious URL structure")
        if not ssl_info['valid'] and 'reason' not in ssl_info:
            threats.append("Invalid or missing SSL certificate")
        if reputation['reputation_score'] < 50:
            threats.append("Poor domain reputation")
        if not threats:
            threats.append("No immediate threats detected")
        
        result = {
            'url': url,
            'domain': domain,
            'analysis': {
                'url_structure': url_analysis,
                'domain_reputation': reputation,
                'ssl_info': ssl_info
            },
            'safety_score': safety_score,
            'threats': threats
        }
        
        return result