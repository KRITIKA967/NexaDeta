const chartForm = document.getElementById('chartForm');
const chartArea = document.getElementById('chartArea');
const csvFileInput = document.getElementById('csvFile');
const xAxisSelect = document.getElementById('xAxis');
const yAxisSelect = document.getElementById('yAxis');

let parsedData = null;  // Will hold parsed CSV data rows (array of objects)
let headers = [];       // CSV headers

// Disable selects initially until CSV is loaded
xAxisSelect.disabled = true;
yAxisSelect.disabled = true;

csvFileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      parsedData = results.data;
      headers = results.meta.fields; // Array of column names

      // Populate X and Y axis selects dynamically
      populateAxisSelects(headers);

      // Enable selects now
      xAxisSelect.disabled = false;
      yAxisSelect.disabled = false;

      // Reset chart area and selects
      chartArea.innerHTML = '<p style="text-align:center; margin-top:30px;">Your generated chart will appear here.</p>';
      xAxisSelect.value = '';
      yAxisSelect.value = '';
    },
    error: function(err) {
      alert('Error parsing CSV file: ' + err.message);
    }
  });
});

function populateAxisSelects(columns) {
  // Clear existing options except first placeholder
  [xAxisSelect, yAxisSelect].forEach(select => {
    select.innerHTML = '<option value="">Select Column</option>';
    columns.forEach(col => {
      const option = document.createElement('option');
      option.value = col;
      option.textContent = col;
      select.appendChild(option);
    });
  });
}

chartForm.addEventListener('submit', e => {
  e.preventDefault();

  const xCol = xAxisSelect.value;
  const yCol = yAxisSelect.value;
  const chartType = document.getElementById('chartType').value;

  if (!parsedData) {
    alert('Please upload a valid CSV file first.');
    return;
  }

  if (!xCol || !yCol || !chartType) {
    alert('Please select X-Axis, Y-Axis, and Chart Type.');
    return;
  }

  if (xCol === yCol) {
    alert('X-Axis and Y-Axis cannot be the same column. Please select different columns.');
    return;
  }

  // Extract labels (x axis) and data points (y axis) from parsedData
  const labels = parsedData.map(row => row[xCol]);
  const dataPointsRaw = parsedData.map(row => row[yCol]);

  // Convert dataPoints to numbers where possible
  const dataPoints = dataPointsRaw.map(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  });

  if (myChart) {
    myChart.destroy();
  }

  // Clear chart area & add canvas element
  chartArea.innerHTML = '<canvas id="chartCanvas"></canvas>';
  const ctx = document.getElementById('chartCanvas').getContext('2d');

  const type = chartType === '3d' ? 'bar' : chartType;

  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: `${yCol} vs ${xCol}`,
        data: dataPoints,
        backgroundColor: 'rgba(43, 108, 176, 0.7)',
        borderColor: 'rgba(43, 82, 130, 0.9)',
        borderWidth: 2,
        fill: chartType === 'line' ? false : true,
        pointRadius: chartType === 'scatter' ? 6 : 0
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 700,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            font: { size: 14 },
            color: '#2b6cb0'
          }
        },
        title: {
          display: true,
          text: `${chartType.toUpperCase()} Chart: ${yCol} vs ${xCol}`,
          font: {
            size: 20,
            weight: '700'
          },
          color: '#2b6cb0',
          padding: {
            top: 10,
            bottom: 30
          }
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xCol,
            font: { size: 16, weight: '600' },
            color: '#2b6cb0'
          },
          grid: {
            color: '#e2e8f0'
          }
        },
        y: {
          title: {
            display: true,
            text: yCol,
            font: { size: 16, weight: '600' },
            color: '#2b6cb0'
          },
          grid: {
            color: '#e2e8f0'
          }
        }
      }
    }
  });
});
