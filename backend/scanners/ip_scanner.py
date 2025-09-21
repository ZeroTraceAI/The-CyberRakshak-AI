import socket
import requests

class IpScanner:
    def __init__(self):
        pass
    
    def _get_geolocation(self, ip):
        """Get geolocation information for IP"""
        # In a real implementation, this would use a geolocation API
        # For this example, we'll simulate the result
        return {
            'country': 'United States',
            'region': 'California',
            'city': 'Los Angeles',
            'latitude': 34.0522,
            'longitude': -118.2437,
            'isp': 'Simulated ISP'
        }
    
    def _check_ip_reputation(self, ip):
        """Check IP reputation against threat intelligence feeds"""
        # In a real implementation, this would check against multiple threat feeds
        # For this example, we'll simulate the result
        return {
            'reputation': 'Good',
            'threats': [],
            'risk_score': 10  # Lower is better (0-100 scale)
        }
    
    def _check_open_ports(self, ip):
        """Check for open ports on IP (simplified)"""
        # In a real implementation, this would perform actual port scanning
        # For this example, we'll simulate the result
        common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995]
        open_ports = []
        
        # Simulate finding some open ports
        for port in common_ports:
            if port in [22, 80, 443]:  # Simulate these as open
                open_ports.append({
                    'port': port,
                    'service': self._get_service_name(port),
                    'risk': 'Low' if port in [80, 443] else 'Medium'
                })
        
        return open_ports
    
    def _get_service_name(self, port):
        """Get service name for port"""
        services = {
            21: 'FTP',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            80: 'HTTP',
            110: 'POP3',
            143: 'IMAP',
            443: 'HTTPS',
            993: 'IMAPS',
            995: 'POP3S'
        }
        return services.get(port, 'Unknown')
    
    def _analyze_ip_threats(self, ip):
        """Analyze IP for potential threats"""
        threats = []
        
        # Check if IP is in private range
        if self._is_private_ip(ip):
            threats.append("Private IP address - not publicly accessible")
        
        # In a real implementation, this would check against threat intelligence feeds
        threats.append("Threat intelligence checking not implemented in this example")
        
        return threats
    
    def _is_private_ip(self, ip):
        """Check if IP is in private range"""
        try:
            ip_obj = socket.inet_aton(ip)
            ip_int = int.from_bytes(ip_obj, 'big')
            
            # Private IP ranges
            private_ranges = [
                (int.from_bytes(socket.inet_aton('10.0.0.0'), 'big'), int.from_bytes(socket.inet_aton('10.255.255.255'), 'big')),
                (int.from_bytes(socket.inet_aton('172.16.0.0'), 'big'), int.from_bytes(socket.inet_aton('172.31.255.255'), 'big')),
                (int.from_bytes(socket.inet_aton('192.168.0.0'), 'big'), int.from_bytes(socket.inet_aton('192.168.255.255'), 'big'))
            ]
            
            for start, end in private_ranges:
                if start <= ip_int <= end:
                    return True
            return False
        except Exception:
            return False
    
    def scan(self, ip):
        """Perform comprehensive IP scan"""
        # Get geolocation information
        geolocation = self._get_geolocation(ip)
        
        # Check IP reputation
        reputation = self._check_ip_reputation(ip)
        
        # Check for open ports
        open_ports = self._check_open_ports(ip)
        
        # Analyze for threats
        threats = self._analyze_ip_threats(ip)
        
        # Calculate overall risk score
        risk_score = reputation['risk_score']
        if open_ports:
            # Increase risk score based on open ports
            high_risk_ports = sum(1 for port in open_ports if port['risk'] == 'High')
            medium_risk_ports = sum(1 for port in open_ports if port['risk'] == 'Medium')
            risk_score += (high_risk_ports * 20) + (medium_risk_ports * 10)
        
        # Cap risk score at 100
        risk_score = min(risk_score, 100)
        
        result = {
            'ip': ip,
            'geolocation': geolocation,
            'reputation': reputation,
            'open_ports': open_ports,
            'threats': threats,
            'risk_score': risk_score,
            'overall_assessment': 'Low Risk' if risk_score < 30 else 'Medium Risk' if risk_score < 70 else 'High Risk'
        }
        
        return result