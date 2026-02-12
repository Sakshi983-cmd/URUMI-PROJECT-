<p align="center">
  <img src="https://raw.githubusercontent.com" width="130" />
</p>

<h1 align="center">💠 URUMI STORE PROVISIONING ENGINE</h1>

<p align="center">
  <b>An Enterprise-Grade Kubernetes-Native Platform for Rapid, Multi-Tenant WooCommerce Orchestration.</b>
  <br />
  <br />
  <img src="https://img.shields.io" />
  <img src="https://img.shields.io" />
  <img src="https://img.shields.io" />
</p>

---

## 📖 Executive Summary
**Urumi** is a sophisticated provisioning engine designed to automate the deployment lifecycle of WooCommerce stores within a Kubernetes ecosystem. By leveraging **Helm v3** and **Node.js orchestration**, Urumi treats infrastructure as software, allowing developers to spin up isolated, production-ready e-commerce environments in under 180 seconds.

---

## 🖼️ Interface & Dashboard Preview
<p align="center">
  <img src="assets/Screenshot 2026-02-12 182104.png" width="48%" style="border-radius:15px; border: 3px solid #1a1a1a; box-shadow: 0 15px 35px rgba(0,0,0,0.6);" />
  <img src="assets/Screenshot 2026-02-12 134502.png" width="48%" style="border-radius:15px; border: 3px solid #1a1a1a; box-shadow: 0 15px 35px rgba(0,0,0,0.6);" />
</p>

---

## 🏛️ Advanced System Architecture
This platform utilizes a **Decoupled Control Plane** architecture. The diagram below illustrates the flow from high-level user intent to low-level resource scheduling.

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#0d1117', 'mainBkg': '#0d1117', 'nodeBorder': '#30363d', 'lineColor': '#58a6ff'}}}%%
graph TD
    subgraph "Application Layer"
    A[<img src='https://raw.githubusercontent.com' width='25'/> React Admin Dashboard]
    end

    subgraph "Orchestration Control Plane"
    B[Node.js Provisioning Engine] -->|Helm SDK| C[K8s API Server]
    C -->|RBAC Enforcement| D[Auth Controller]
    end

    subgraph "Infrastructure Data Plane"
    C --> E[Isolated Namespace: Store-01]
    C --> F[Isolated Namespace: Store-02]
    
    subgraph "Pod Topology"
    E --> G[WordPress Deployment]
    E --> H[MariaDB StatefulSet]
    E --> I[Persistent Volume Claims]
    end
    end

    style B fill:#000,stroke:#326ce5,stroke-width:2px,color:#fff
    style E fill:#0d1117,stroke:#58a6ff,stroke-width:2px,color:#58a6ff
    style G fill:#161b22,stroke:#30363d,color:#c9d1d9
    style H fill:#161b22,stroke:#30363d,color:#c9d1d9
