function $(id) {
  return document.getElementById(id);
}

var nations = ['Japan', 'Kenya'];
var judges = {
  true: '<i class="fa fa-check" style="color:#69b457"></i>',
  false: '<i class="fa fa-times" style="color:#bc2b0a"></i>'
};

var nation, city;
var count, score;
var resultTable;
var accepting;

function init() {
  $('result').innerHTML = '';
  
  count = 0;
  score = 0;

  $('game').style.display = 'block';
  $('result').style.display = 'none';

  resultTable = document.createElement("table");
  resultTable.style.margin = 'auto';
  resultTable.innerHTML = "<tr> <th>City</th> <th>Locate</th> <th>Your Answer</th> <th>Judge</th> <th>Maps</th> </tr>";
  
  $('button0').onclick = ()=>{ answer(0); };
  $('button1').onclick = ()=>{ answer(1); };
  
  next();
}

function next() {
  $('button0').innerHTML = nations[0];
  $('button0').classList.remove('correct');
  $('button0').classList.remove('error');
  $('button1').innerHTML = nations[1];
  $('button1').classList.remove('correct');
  $('button1').classList.remove('error');
  
  if (10 <= count) { showResult(); return; }
  count++;
  
  accepting = true;
  nation = Math.floor(data.length*Math.random());
  city = Math.floor(data[nation].length*Math.random());
  $("city_name").innerText = data[nation][city];
}

function answer(ans) {
  if (!accepting) return;
  accepting = false;
  
  if (nation == ans) {
    $('button'+ans).classList.add('correct');
    $('button'+ans).innerHTML = '<i class="fa fa-check" style="color:#bdbdbd"> ' + $('button'+ans).innerHTML ;
    score += 10;
  } else {
    $('button'+ans).classList.add('error');
    $('button'+ans).innerHTML = '<i class="fa fa-times" style="color:#bdbdbd"> ' + $('button'+ans).innerHTML;
  }

  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.innerHTML = data[nation][city]; tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = nations[nation]; tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = nations[ans]; tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = judges[nation == ans]; tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = '<a href="https://www.google.co.jp/maps/search/' + data[nation][city] + '">' + data[nation][city] + '</a>'; tr.appendChild(td);
  resultTable.appendChild(tr)
  
  setTimeout(next, 1000);
}

function showResult() {
  $('game').style.display = 'none';
  $('result').style.display = 'block';

  var span = document.createElement('span');
  span.classList.add('score');
  span.innerHTML = 'Score:' + score;
  
  var button = document.createElement('a');
  button.classList.add('button');
  button.innerHTML = 'Try again';
  button.onclick = init;
  
  $('result').appendChild(span);
  $('result').appendChild(resultTable);
  $('result').appendChild(button);
}

window.onload = init;