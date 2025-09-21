import socket

class DomainScanner:
    def __init__(self):
        pass
    
    def _get_whois_info(self, domain):
        """Get WHOIS information for domain"""
        # In a real implementation, this would use the whois library
        # For this example, we'll simulate the result
        return {
            'registrar': 'Simulated Registrar, Inc.',
            'creation_date': '2020-01-01',
            'expiration_date': '2025-01-01',
            'name_servers': ['ns1.example.com', 'ns2.example.com'],
            'status': 'Active'
        }
    
    def _check_domain_age(self, creation_date):
        """Check domain age and potential risks"""
        # In a real implementation, this would calculate actual domain age
        # For this example, we'll simulate the result
        return {
            'age_days': 365 * 2,  # 2 years
            'risk_factor': 'Low'  # New domains are often riskier
        }
    
    def _check_domain_reputation(self, domain):
        """Check domain reputation"""
        # In a real implementation, this would check against threat intelligence feeds
        # For this example, we'll simulate the result
        return {
            'reputation': 'Good',
            'threats': [],
            'risk_score': 15  # Lower is better (0-100 scale)
        }
    
    def _analyze_domain_structure(self, domain):
        """Analyze domain structure for potential issues"""
        issues = []
        
        # Check domain length
        if len(domain) > 25:
            issues.append("Domain name is unusually long")
        
        # Check for suspicious keywords
        suspicious_keywords = ['login', 'secure', 'account', 'update', 'verify', 'paypal', 'google', 'amazon']
        for keyword in suspicious_keywords:
            if keyword in domain.lower():
                issues.append(f"Contains suspicious keyword: {keyword}")
        
        # Check for excessive hyphens or numbers
        if domain.count('-') > 2:
            issues.append("Contains excessive hyphens")
        
        if any(char.isdigit() for char in domain):
            issues.append("Contains numbers")
        
        return issues
    
    def _check_dns_resolution(self, domain):
        """Check if domain resolves properly"""
        try:
            ip = socket.gethostbyname(domain)
            return {
                'resolves': True,
                'ip_address': ip
            }
        except Exception as e:
            return {
                'resolves': False,
                'error': str(e)
            }
    
    def scan(self, domain):
        """Perform comprehensive domain scan"""
        # Get WHOIS information
        whois_info = self._get_whois_info(domain)
        
        # Check domain age
        age_info = self._check_domain_age(whois_info.get('creation_date'))
        
        # Check domain reputation
        reputation = self._check_domain_reputation(domain)
        
        # Analyze domain structure
        structural_issues = self._analyze_domain_structure(domain)
        
        # Check DNS resolution
        dns_resolution = self._check_dns_resolution(domain)
        
        # Calculate overall risk score
        risk_score = reputation['risk_score']
        if age_info['risk_factor'] == 'High':
            risk_score += 30
        elif age_info['risk_factor'] == 'Medium':
            risk_score += 15
        
        risk_score += len(structural_issues) * 10
        
        if not dns_resolution['resolves']:
            risk_score += 20
        
        # Cap risk score at 100
        risk_score = min(risk_score, 100)
        
        result = {
            'domain': domain,
            'whois_info': whois_info,
            'age_info': age_info,
            'reputation': reputation,
            'structural_issues': structural_issues,
            'dns_resolution': dns_resolution,
            'risk_score': risk_score,
            'overall_assessment': 'Low Risk' if risk_score < 30 else 'Medium Risk' if risk_score < 70 else 'High Risk'
        }
        
        return result