\# Urumi Store Provisioning Platform — Round 1



A Kubernetes-native store provisioning platform that automatically deploys WooCommerce stores using Helm.



\## Architecture



```

\[React Dashboard] → \[Backend API (Node.js)] → \[Kubernetes API]

&nbsp;                                                     ↓

&nbsp;                                         \[Namespace per Store]

&nbsp;                                         ├── WordPress (WooCommerce)

&nbsp;                                         ├── MariaDB (StatefulSet + PVC)

&nbsp;                                         ├── Service

&nbsp;                                         └── Ingress

```



\## Tech Stack



\- \*\*Local Kubernetes\*\*: k3d (mirrors production k3s)

\- \*\*Package Manager\*\*: Helm (bitnami/wordpress chart)

\- \*\*Backend\*\*: Node.js + Express

\- \*\*Frontend\*\*: React

\- \*\*Isolation\*\*: Namespace per store



---



\## Local Setup Instructions



\### Prerequisites



\- Windows 11

\- Docker Desktop (with WSL2)

\- kubectl

\- k3d

\- Helm

\- Node.js v18+



\### Step 1: Start Kubernetes Cluster



```bash

k3d cluster create urumi-cluster

kubectl get nodes

```



\### Step 2: Add Helm Repo



```bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update

```



\### Step 3: Start Backend API



```bash

cd urumi-project

npm install

node server.js

```



\### Step 4: Start React Dashboard



```bash

cd urumi-project/dashboard

npm install

npm start

```



\### Step 5: Open Dashboard



```

http://localhost:3001

```



Click \*\*"+ Create New Store"\*\* to provision a new WooCommerce store.



---



\## How to Create a Store and Place an Order



1\. Open dashboard at `http://localhost:3001`

2\. Click \*\*"+ Create New Store"\*\*

3\. Wait 2-3 minutes for status to change to \*\*Ready\*\*

4\. Access WooCommerce via port-forward:

&nbsp;  ```bash

&nbsp;  kubectl port-forward --namespace <store-id> svc/<store-id>-wordpress 9090:80

&nbsp;  ```

5\. Open `http://localhost:9090/shop`

6\. Add product to cart → Checkout → Place Order (Cash on Delivery)

7\. Verify order in WooCommerce admin: `http://localhost:9090/wp-admin`



---



\## VPS / Production Setup (k3s)



\### Step 1: Install k3s on VPS



```bash

curl -sfL https://get.k3s.io | sh -

```



\### Step 2: Deploy using production values



```bash

helm install <store-id> bitnami/wordpress \\

&nbsp; --namespace <store-id> \\

&nbsp; --values helm/store-chart/values-prod.yaml

```



\### Key differences (Local vs Production)



| Setting | Local (values-local.yaml) | Production (values-prod.yaml) |

|---------|--------------------------|-------------------------------|

| Service Type | LoadBalancer | ClusterIP |

| Ingress | Disabled | Enabled with domain |

| Passwords | Simple (dev only) | Strong passwords |

| Resources | Low limits | Higher limits |



---



\## System Design \& Tradeoffs



\### Architecture Choice

\- \*\*Namespace per store\*\* for strong isolation

\- \*\*Helm\*\* for repeatable, versioned deployments

\- \*\*k3d locally / k3s in production\*\* — same charts, different values



\### Idempotency \& Failure Handling

\- Store creation uses unique timestamp-based IDs — no duplicates

\- If Helm install fails → status set to `Failed`

\- Namespace deletion guarantees complete cleanup of all resources



\### What Changes for Production

\- Ingress enabled with real domain

\- Strong secrets (not hardcoded)

\- TLS via cert-manager

\- Higher resource limits



---



\## Store Isolation



Each store gets its own Kubernetes namespace containing:

\- `Deployment` — WordPress

\- `StatefulSet` — MariaDB

\- `PVC` — Persistent storage for database

\- `Secret` — DB credentials

\- `Service` — Internal networking



Deleting a store = deleting the namespace = all resources gone instantly.

