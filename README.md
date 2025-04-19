# reflector

Reflector is the Nginx reverse proxy gateway for the mikesploit infrastructure. It acts as a centralized entry point for routing traffic to internal tools like the mikesploit console, Grafana dashboards, and future additions such as OSINT APIs and reporting systems.

This repository serves as the reference implementation of Reflector. It is intended for educational, development, and self-hosted use. For live or public deployments, additional security layers and hardening are recommended.

## 🌐 Features

- Reverse proxy for containerized tools
- Simple Nginx config for fast deployment
- Modular architecture — add more routes as needed
- Ready for TLS with certbot or self-signed certs
- Can be paired with authentication or WAF services

## 🚀 Project Structure
```
reflector/
├── console/               # Flask app container
│   ├── Dockerfile
│   ├── requirements.txt
│   └── run.py
├── nginx/                 # Nginx proxy container
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml     # Orchestrates Reflector & linked services
├── .env                   # (ignored) holds secrets if needed
└── README.md              # This file
```
## 🛠 Usage
```
git clone https://github.com/mikesploitsec/reflector.git
cd reflector
docker-compose up --build
```
The proxy will be available on port 80 by default. To test routing, pair it with a service console running on port 6969.

## 🧪 CTF / Red Team Usage

Reflector can be deployed tactically in CTFs or red team ops to maintain persistence, route traffic to remote tooling, or act as a lightweight web gateway for reverse shells, fake portals, or C2 beacons. In these scenarios, Reflector’s low profile and containerized design make it easy to spin up and tear down when needed.

Examples:

- Redirect / to a live shell or remote listener
- Proxy /admin to a decoy login page or phishing lure
- Use it as a tunnel point for exfiltration or tool drops

Note: This reference implementation does not include obfuscation, privilege escalation, or stealth deployment methods. Any offensive use should be done ethically, legally, and within engagement scope.
