fetch('data.csv')
  .then(response => response.text())
  .then(csv => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const tbody = document.querySelector('#data-table tbody');
    const labels = [];
    const temperatures = [];

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(',');
      const row = document.createElement('tr');
      data.forEach((cell, idx) => {
        const td = document.createElement('td');
        td.textContent = cell.trim();
        row.appendChild(td);
      });
      labels.push(data[1]); // Heure
      temperatures.push(parseFloat(data[2])); // Température
      tbody.appendChild(row);
    }

    new Chart(document.getElementById('tempChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Température (°C)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  })
  .catch(error => console.error('Erreur lors du chargement des données :', error));
