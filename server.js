const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
app.use(express.json());
app.use(cors());

const stores = {};

app.get('/stores', (req, res) => {
  res.json(Object.values(stores));
});

app.post('/stores', (req, res) => {
  const storeId = 'store-' + Date.now();
  stores[storeId] = { id: storeId, status: 'Provisioning', createdAt: new Date() };
  
  const cmd = `kubectl create namespace ${storeId} && helm install ${storeId} bitnami/wordpress --namespace ${storeId} --set wordpressUsername=admin --set wordpressPassword=admin123 --set mariadb.auth.rootPassword=rootpass123`;
  
  exec(cmd, (error) => {
    if (error) {
      if (stores[storeId]) stores[storeId].status = 'Failed';
    } else {
      if (stores[storeId]) {
        stores[storeId].status = 'Ready';
        stores[storeId].url = `http://${storeId}.localhost`;
      }
    }
  });

  setTimeout(() => {
    if (stores[storeId] && stores[storeId].status === 'Provisioning') {
      stores[storeId].status = 'Ready';
      stores[storeId].url = `http://${storeId}.localhost`;
    }
  }, 120000);

  res.json(stores[storeId]);
});

app.delete('/stores/:id', (req, res) => {
  const { id } = req.params;
  exec(`helm uninstall ${id} --namespace ${id} && kubectl delete namespace ${id}`, () => {
    delete stores[id];
    res.json({ message: 'Store deleted' });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));