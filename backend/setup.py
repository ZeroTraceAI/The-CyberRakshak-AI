from setuptools import setup, find_packages

setup(
    name="cyber-rakshak-backend",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "flask==2.3.2",
        "flask-cors==4.0.0",
        "python-dotenv==1.0.0",
        "requests==2.31.0",
        "python-magic==0.4.27",
        "dnspython==2.3.0"
    ],
    entry_points={
        'console_scripts': [
            'cyber-rakshak=app:main',
        ],
    },
)