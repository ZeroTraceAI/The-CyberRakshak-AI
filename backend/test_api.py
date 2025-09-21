#!/usr/bin/env python3
"""
Test script to verify all backend API endpoints are working correctly.
"""

import requests
import json
import os

# API base URL
BASE_URL = "http://localhost:5000/api"

def test_file_scan():
    """Test file scanning endpoint"""
    print("Testing file scan...")
    try:
        # Create a test file
        with open("test_file.txt", "w") as f:
            f.write("This is a test file for scanning")
        
        # Upload file for scanning
        with open("test_file.txt", "rb") as f:
            files = {"file": f}
            response = requests.post(f"{BASE_URL}/scan/file", files=files)
        
        # Clean up test file
        os.remove("test_file.txt")
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ File scan test passed")
                return True
            else:
                print(f"✗ File scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ File scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ File scan test failed with exception: {e}")
        return False

def test_url_scan():
    """Test URL scanning endpoint"""
    print("Testing URL scan...")
    try:
        data = {"url": "https://example.com"}
        response = requests.post(f"{BASE_URL}/scan/url", json=data)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ URL scan test passed")
                return True
            else:
                print(f"✗ URL scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ URL scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ URL scan test failed with exception: {e}")
        return False

def test_email_scan():
    """Test email scanning endpoint"""
    print("Testing email scan...")
    try:
        data = {
            "sender": "test@example.com",
            "headers": ["From: test@example.com", "To: recipient@example.com"],
            "content": "This is a test email content"
        }
        response = requests.post(f"{BASE_URL}/scan/email", json=data)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ Email scan test passed")
                return True
            else:
                print(f"✗ Email scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ Email scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Email scan test failed with exception: {e}")
        return False

def test_dns_scan():
    """Test DNS scanning endpoint"""
    print("Testing DNS scan...")
    try:
        data = {"domain": "example.com"}
        response = requests.post(f"{BASE_URL}/scan/dns", json=data)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ DNS scan test passed")
                return True
            else:
                print(f"✗ DNS scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ DNS scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ DNS scan test failed with exception: {e}")
        return False

def test_ip_scan():
    """Test IP scanning endpoint"""
    print("Testing IP scan...")
    try:
        data = {"ip": "8.8.8.8"}
        response = requests.post(f"{BASE_URL}/scan/ip", json=data)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ IP scan test passed")
                return True
            else:
                print(f"✗ IP scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ IP scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ IP scan test failed with exception: {e}")
        return False

def test_domain_scan():
    """Test domain scanning endpoint"""
    print("Testing domain scan...")
    try:
        data = {"domain": "example.com"}
        response = requests.post(f"{BASE_URL}/scan/domain", json=data)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✓ Domain scan test passed")
                return True
            else:
                print(f"✗ Domain scan test failed: {result.get('message')}")
                return False
        else:
            print(f"✗ Domain scan test failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Domain scan test failed with exception: {e}")
        return False

def main():
    """Run all API tests"""
    print("Running CyberRakshak API tests...\n")
    
    tests = [
        test_file_scan,
        test_url_scan,
        test_email_scan,
        test_dns_scan,
        test_ip_scan,
        test_domain_scan
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()  # Add blank line between tests
    
    print(f"Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The API is working correctly.")
        return True
    else:
        print("❌ Some tests failed. Please check the API implementation.")
        return False

if __name__ == "__main__":
    main()