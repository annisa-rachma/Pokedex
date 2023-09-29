// const displayStats = (idHtml, hp, attack, defense, speed) => {
//   let ctx = document.getElementById(idHtml);
//   return new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Hp', 'Attack', 'Defense', 'Speed'],
//         datasets: [{
//           label: 'Pokemon Stats',
//           data: [hp, attack, defense, speed],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

// }

function displayStats(data) {
  const ctx = document.getElementById('myChart');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Hp', 'Attack', 'Defense', 'Skill'],
      datasets: [{
        label: 'Pokemon Stats',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


  module.exports = {displayStats};