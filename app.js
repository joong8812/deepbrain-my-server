require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const { PORT, MONGO_URI } = process.env;
const fs = require('fs')
const csvParser = require('./utils/csvParser')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 

const APP = './app/routes'
const nodes = []
for(const leaf of nodes){
  require(`${APP}/${leaf}.route`)({url:`/api/${leaf}`,app})
}
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

app.listen(PORT, () => {
  console.log('***************** ***************** *****************')
  console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
  console.log('***************** ***************** *****************')
})
app.get('/', (req, res) => {
  res.json({"현재 시간 : ":new Date().toLocaleString()})
})
app.get('/api/now', cors(corsOptions),(req, res) => {
  res.json({"now":new Date().toLocaleString()})
})
app.get('/api/board/list', cors(corsOptions),(req, res) => {
  const resArray = []
  let idx = 0
  fs.readFile('./public/data/campingsite_all_region.csv', 'utf-8', (err, data) => {
    let dataArray = data.split('\r\n')
    for (let i=1; i<11; i++){
      info = csvParser(dataArray[i])
      resArray.push({
        'id': idx++,
        'name': info[0],
        'type': info[1],
        'address': info[4],
        'glamping': info[7],
        'caravan': info[8],
        'toilet': info[9],
        'shower': info[10],
        'wash': info[11],
      })
    }
    res.json({"boards":resArray})
  })
})