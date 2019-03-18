let data = { 'title': 'page1' };

setTimeout(() => {
  data.title = "2222";
}, 2000);


// setTimeout(() => {
//   data.title = "4444";
// }, 4000);


// setTimeout(() => {
//   data.title = "4444";
// }, 6000);

module.exports = data;
