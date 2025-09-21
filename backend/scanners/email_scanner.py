import re

class EmailScanner:
    def __init__(self):
        pass
    
    def _check_spf_record(self, domain):
        """Check SPF record for domain"""
        # In a real implementation, this would query DNS for SPF records
        # For this example, we'll simulate the result
        return {
            'has_spf': True,  # Simulated result
            'spf_record': 'v=spf1 include:_spf.example.com ~all'  # Simulated record
        }
    
    def _check_dkim_record(self, domain):
        """Check DKIM record for domain"""
        # In a real implementation, this would query DNS for DKIM records
        return {
            'has_dkim': True,  # Simulated result
            'dkim_record': 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...'  # Simulated record
        }
    
    def _check_dmarc_record(self, domain):
        """Check DMARC record for domain"""
        # In a real implementation, this would query DNS for DMARC records
        return {
            'has_dmarc': True,  # Simulated result
            'dmarc_record': 'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com'  # Simulated record
        }
    
    def _analyze_headers(self, headers):
        """Analyze email headers for anomalies"""
        suspicious_headers = []
        
        # Check for common suspicious headers
        suspicious_header_names = ['X-Authentication-Warning', 'X-Sender-IP', 'X-Received-IP']
        for header_name in suspicious_header_names:
            if any(header_name.lower() in header.lower() for header in headers):
                suspicious_headers.append(header_name)
        
        # Check for header injection patterns
        header_injection_patterns = [r'\n[^:\s]+:', r'\r[^:\s]+:']
        for header in headers:
            for pattern in header_injection_patterns:
                if re.search(pattern, header):
                    suspicious_headers.append(f"Header injection pattern in: {header[:30]}...")
        
        return suspicious_headers
    
    def _analyze_content(self, content):
        """Analyze email content for threats"""
        threats = []
        
        # Check for phishing keywords
        phishing_keywords = ['urgent', 'verify', 'account', 'password', 'click here', 'limited time']
        phishing_count = sum(1 for keyword in phishing_keywords if keyword.lower() in content.lower())
        
        if phishing_count > 3:
            threats.append("Contains multiple phishing indicators")
        
        # Check for suspicious links
        url_pattern = r'https?://[^\s]+'
        urls = re.findall(url_pattern, content)
        
        if len(urls) > 5:
            threats.append("Contains excessive number of links")
        
        # Check for suspicious attachments (in a real implementation)
        # This would analyze actual attachments
        threats.append("Attachment analysis not implemented in this example")
        
        return {
            'phishing_indicators': phishing_count,
            'urls': urls,
            'threats': threats
        }
    
    def scan(self, email_data):
        """Perform comprehensive email scan"""
        headers = email_data.get('headers', [])
        content = email_data.get('content', '')
        sender = email_data.get('sender', '')
        
        # Extract domain from sender
        domain = sender.split('@')[1] if '@' in sender else ''
        
        # Analyze headers
        suspicious_headers = self._analyze_headers(headers)
        
        # Analyze content
        content_analysis = self._analyze_content(content)
        
        # Check email authentication
        spf_result = self._check_spf_record(domain) if domain else {'has_spf': False}
        dkim_result = self._check_dkim_record(domain) if domain else {'has_dkim': False}
        dmarc_result = self._check_dmarc_record(domain) if domain else {'has_dmarc': False}
        
        # Calculate spam score
        spam_score = min(
            (len(suspicious_headers) * 20) + 
            content_analysis['phishing_indicators'] * 15 + 
            (10 if not spf_result['has_spf'] else 0) +
            (10 if not dkim_result['has_dkim'] else 0) +
            (10 if not dmarc_result['has_dmarc'] else 0),
            100
        )
        
        result = {
            'sender': sender,
            'domain': domain,
            'authentication': {
                'spf': spf_result,
                'dkim': dkim_result,
                'dmarc': dmarc_result
            },
            'header_analysis': {
                'suspicious_headers': suspicious_headers,
                'total_headers': len(headers)
            },
            'content_analysis': content_analysis,
            'spam_score': spam_score,
            'authenticity': 'High' if spam_score < 30 else 'Medium' if spam_score < 70 else 'Low'
        }
        
        return result