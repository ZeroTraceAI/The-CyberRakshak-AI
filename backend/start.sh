#!/bin/bash
echo "Installing Python dependencies..."
pip install -r requirements.txt
echo "Starting CyberRakshak backend..."
python app.py