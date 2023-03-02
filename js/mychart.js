
 const gradient = window['chartjs-plugin-gradient'];



let n = 100000;
let step = 1;
let max = 100;
let min = 0;
let skew_line = Math.random()*2 +0.2;
let skew_bar = Math.random()*2 +0.2;
let sample_bar = [];
let sample_line = [];



const randn_bm = (min, max, skew) => {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -1.5 * Math.log( u ) ) * Math.cos( -2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; 
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); 
    num = Math.pow(num, skew); 
    num *= max - min; 
    num += min; 
    return num;
}
const round_to_precision = (x, precision) => {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}
for (let j=min; j<max; j+=step) {
  sample_bar[j] = 0;
}
for (let j=min; j<max; j+=step) {
  sample_line[j] = 0;
}

for (i=0; i<n; i+=step) {
  let rand_num = randn_bm(min, max, skew_bar);
  let rounded = round_to_precision(rand_num, step)
  sample_bar[rounded] += 1;
}
for (i=0; i<n; i+=step) {
  let rand_num = randn_bm(min, max, skew_line);
  let rounded = round_to_precision(rand_num, step)
  sample_line[rounded] += 1;
}




Chart.register(gradient);
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  data: {
    datasets: [{
        type:'line',
        data : sample_line,
        borderWidth:4,
        pointStyle:false,
        gradient:{
          borderColor:{
            axis: 'y',
            colors: {
            0:'#e52e71',
            10000: '#ff8a00'
            }
          }
        }
      },{
        type: 'bar',
        data: sample_bar,
        borderWidth: 1,
        borderColor:'#17141d',
        gradient: {
        backgroundColor: {
          axis: 'y',
          colors: {
            0: '#ff8a00',
            10000: '#e52e71'
          }
        }
      }
      }],
    labels:sample_line
  },
  options: {
    scales: {
      y: {
        display:false,
        beginAtZero: true
      },
      x:{
         display:false
       },
       grid: false
    },
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{
        display: false
      }
    }
  }
});