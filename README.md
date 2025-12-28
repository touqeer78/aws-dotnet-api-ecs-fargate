# AWS ECS Fargate .NET API (CDK)

This project demonstrates a **production-ready .NET API deployed on AWS ECS Fargate behind an Application Load Balancer**, fully provisioned using **AWS CDK (TypeScript)**.

It is designed as a **proof of concept (PoC)** to showcase modern cloud-native deployment patterns using Infrastructure as Code.

---

## 🚀 Architecture Overview

- **.NET 9 Minimal API** running in a Docker container
- **Amazon ECS (Fargate)** for serverless container orchestration
- **Application Load Balancer (ALB)** for traffic routing and health checks
- **Amazon VPC** with public subnets across multiple AZs
- **AWS CDK (TypeScript)** to provision all infrastructure

---

## 🧱 How It Works

1. The API is packaged into a Docker image using a multi-stage Dockerfile
2. AWS CDK builds the image and pushes it to Amazon ECR
3. ECS Fargate runs the container without managing servers
4. ALB routes traffic and performs health checks on /health
5. The service is accessible via the ALB DNS name

---

## 🧪 Deployment

````bash
cd infra/cdk
cdk deploy
```
---

## 🛠️ Tech Stack

- **Backend:** .NET 9 Minimal API
- **Containerization:** Docker (multi-stage build)
- **Infrastructure as Code:** AWS CDK (TypeScript)
- **Compute:** ECS Fargate
- **Networking:** VPC, ALB
- **Health Checks:** `/health` endpoint

---

## 📦 Project Structure

```text
.
├── app/
│   └── Api/
│       ├── Program.cs
│       ├── Api.csproj
│       └── Dockerfile
├── infra/
│   └── cdk/
│       ├── lib/
│       │   └── api-stack.ts
│       └── bin/
├── docs/
│   └── architecture.png
└── README.md
````
