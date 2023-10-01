const CONFIG_BG_COLOR = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
];


const CONFIG_BORDER_COLOR = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
];

const CONFIG_CHART_OPTIONS = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

function renderStatsChart(i) {
    let detailPokemon = pokemonData[i];
    let statNames = detailPokemon['stats'].map(stat => stat['stat']['name']);
    let baseStatValues = detailPokemon['stats'].map(stat => stat['base_stat']);

    // Create a chart div
    let chartDiv = document.createElement('div');
    chartDiv.id = 'chartContainer';

    // Set the width and height of the chart div (adapted to the container)
    let containerDiv = document.getElementById('pokemonInfo');
    chartDiv.style.width = '100%'; // 100% of the width of the container
    chartDiv.style.height = '100%'; // 100% of the height of the container

    // Add the chart div to the HTML
    containerDiv.appendChild(chartDiv);

    // Create a canvas element for the chart
    let canvas = document.createElement('canvas');
    canvas.id = 'myChart';

    // Set the width and height of the canvas element to 100% of the chart div
    canvas.style.width = '0%';
    canvas.style.height = '0%';
    canvas.style.paddingRight = '16px';

    // Add the canvas element to the chart div
    chartDiv.appendChild(canvas);

    // Draw the chart on the canvas
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: statNames,
            datasets: [{
                label: 'Base Stats',
                data: baseStatValues,
                backgroundColor: CONFIG_BG_COLOR,
                BORDERCOLOR: CONFIG_BORDER_COLOR,
                borderWidth: 1
            }]
        },
        options: CONFIG_CHART_OPTIONS
    });
}

