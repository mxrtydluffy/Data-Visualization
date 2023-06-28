const ufoData = fetch('./viz_2/data/ufo_sightings.csv')
  .then(response => response.text())
  .then(data => {
    // Process the CSV data
    const parsedData = Papa.parse(data, { header: true });
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


const myChart = document.querySelector(".ufo-chart")

new CharacterData(myChart, {
    type: "doughnut",
    data: {
        labels: ufoData.shape,
        datasets: [
            {
                label: "Object Shape"
            }
        ]
    }
})