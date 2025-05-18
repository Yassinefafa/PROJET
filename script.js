fetch('data.csv')
  .then(response => response.text())
  .then(csv => {
    const lines = csv.trim().split('\n');
    const tbody = document.querySelector('#data-table tbody');
    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
      const row = document.createElement('tr');
      data.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell.trim();
        row.appendChild(td);
      });
      tbody.appendChild(row);
    }
  })
  .catch(error => console.error('Erreur lors du chargement des données :', error));
