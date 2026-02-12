# <img src="https://raw.githubusercontent.com" alt="Urumi" width="50" align="center" /> URUMI STORE PLATFORM

> **A High-Performance Kubernetes-native engine for automated WooCommerce deployments. Created by @Sakshi983-cmd**

---

## 📸 Dashboard Preview
<p align="center">
  <img src="assets/Screenshot 2026-02-12 182104.png" width="48%" style="border-radius:10px; border: 1px solid #ddd;" />
  <img src="assets/Screenshot 2026-02-12 134502.png" width="48%" style="border-radius:10px; border: 1px solid #ddd;" />
</p>

---

## 🚀 Tech Stack
![K8s](https://img.shields.io)
![NodeJS](https://img.shields.io)
![React](https://img.shields.io)
![Helm](https://img.shields.io)

---

## 🧠 System Design
Urumi uses an **Isolate-and-Provision** logic to ensure every store is secure.

```mermaid
graph TD
    A[React UI] -->|Trigger| B[Express API]
    B -->|Helm Install| C[K8s Engine]
    subgraph "Individual Store Sandbox"
    C --> D[Isolated Namespace]
    D --> E[WordPress Pod]
    D --> F[MariaDB StatefulSet]
    end


