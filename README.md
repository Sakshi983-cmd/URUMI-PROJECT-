<p align="center">
  <img src="https://raw.githubusercontent.com" width="100" />
</p>

<h1 align="center">💠 URUMI STORE PROVISIONING ENGINE</h1>

<p align="center">
  <b>The next-generation Kubernetes-native platform for instant, isolated e-commerce scaling.</b>
  <br />
  <img src="https://img.shields.io" />
  <img src="https://img.shields.io" />
  <img src="https://img.shields.io" />
</p>

---

## 📽️ Platform Preview
<p align="center">
  <img src="assets/Screenshot 2026-02-12 182104.png" width="48%" style="border-radius:12px; border: 2px solid #5865F2;" />
  <img src="assets/Screenshot 2026-02-12 134502.png" width="48%" style="border-radius:12px; border: 2px solid #5865F2;" />
</p>

---

## 🏛️ Advanced System Architecture
Urumi works on a **Decoupled Orchestration Layer**. It doesn't just deploy; it manages the entire lifecycle of a WooCommerce store.

```mermaid
graph TD
    subgraph "External Access"
        User((<img src='https://raw.githubusercontent.com' width='30'/> Admin)) -->|React UI| Dashboard[Dashboard Service]
    end

    subgraph "Control Plane (Node.js)"
        Dashboard -->|REST API| API[Provisioning Engine]
        API -->|Authentication| Auth[RBAC Logic]
        API -->|K8s Client| Helm[Helm Orchestrator]
    end

    subgraph "Data Plane (Kubernetes Cluster)"
        Helm -->|Generate| NS1[Namespace: Store-Alpha]
        Helm -->|Generate| NS2[Namespace: Store-Beta]
        
        subgraph "Per Store Isolation"
            NS1 --> WP[WordPress Pod]
            NS1 --> DB[(MariaDB StatefulSet)]
            NS1 --> PVC[Persistent Volume]
        end
    end

    style Dashboard fill:#f9f,stroke:#333,stroke-width:2px
    style NS1 fill:#bbf,stroke:#333,stroke-width:2px
    style NS2 fill:#bbf,stroke:#333,stroke-width:2px


