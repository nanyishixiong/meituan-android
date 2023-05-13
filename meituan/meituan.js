const express = require('express')
const qrCreate = require("qr-image")
const fs = require("fs");
const path = require('path')

const app = express()

app.use(express.static('./static'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const baseUrl = "http://10.0.2.2:5000";
const list = [{
  id: 1,
  image: "img1.png",
  title: "叫了只鸡",
  deliver: "起送￥10",
  deliverTime: "配送约48分钟",
  lable: "炸物小吃好评榜第2名",
  sale: "月售1532"
}, {
  id: 2,
  image: "img2.png",
  title: "东北饺子馆",
  deliver: "起送￥10",
  deliverTime: "配送约53分钟",
  lable: "近30天999+人复购",
  sale: "月售5677"
}, {
  id: 3,
  image: "img3.png",
  title: "肥牛烤肉筋",
  deliver: "起送￥12",
  deliverTime: "配送约48分钟",
  lable: "烧烤回头率第1名",
  sale: "月售3078"
  },{
    id: 4,
    image: "img1.png",
    title: "叫了只鸡",
    deliver: "起送￥10",
    deliverTime: "配送约48分钟",
    lable: "炸物小吃好评榜第2名",
    sale: "月售1532"
  }, {
    id: 5,
    image: "img2.png",
    title: "东北饺子馆",
    deliver: "起送￥10",
    deliverTime: "配送约53分钟",
    lable: "近30天999+人复购",
    sale: "月售5677"
  }, {
    id: 6,
    image: "img3.png",
    title: "肥牛烤肉筋",
    deliver: "起送￥12",
    deliverTime: "配送约48分钟",
    lable: "烧烤回头率第1名",
    sale: "月售3078"
  }]

const details = {
  1: {
    "data": {
      "announce": "公告：炸鸡新款来了，肉和蘸料，口味，公司统一生产！",
      "list": [
        createFood(1, 1, "韩式炸鸡", "门店销量第1名", "月售656 好评度84%", "15.95"),
        createFood(2, 1, "双拼口味炸鸡", "门店销量第2名", "月售336 好评度100%", "21.95"),
        createFood(3, 1, "香酥小酥肉", "小酥肉热榜第3名", "月售72 好评度98%", "5"),
        createFood(1, 1, "韩式炸鸡2", "门店销量第1名", "月售656 好评度84%", "15.95"),
        createFood(2, 1, "双拼口味炸鸡2", "门店销量第2名", "月售336 好评度100%", "21.95"),
        createFood(3, 1, "香酥小酥肉2", "小酥肉热榜第3名", "月售72 好评度98%", "5"),
      ]
    }
  },
  2: {
    "data": {
      "announce": "公告：欢迎光临东北饺子馆 我们尽最大努力按照按时送达！",
      "list": [
        createFood(1, 2, "牛肉水饺24个", "门店销量第3名", "月售968 好评度100%", "14.98"),
        createFood(2, 2, "三陷混搭24个", "还行，吃的很饱", "月售402 好评度99%", "13.98"),
        createFood(3, 2, "韭菜鸡蛋水饺", "门店销量第1名", "月售1343 好评度95%", "4.5"),
      ]
    }
  },
  3: {
    "data": {
      "announce": "公告：下午16点到凌晨一点半都可以配送！",
      "list": [
        createFood(1, 3, "半斤肉筋", "真香，香死了", "月售508 好评度100%", "22"),
        createFood(2, 3, "翅中", "我室友特别喜欢", "月售355 好评度99%", "7"),
        createFood(3, 3, "三肉筋+火腿+面筋+饼", "好吃美滋滋", "月售247 好评度95%", "14"),
      ]
    }
  },
  4: {
    "data": {
      "announce": "公告：炸鸡新款来了，肉和蘸料，口味，公司统一生产！",
      "list": [
        createFood(1, 1, "韩式炸鸡", "门店销量第1名", "月售656 好评度84%", "15.95"),
        createFood(2, 1, "双拼口味炸鸡", "门店销量第2名", "月售336 好评度100%", "21.95"),
        createFood(3, 1, "香酥小酥肉", "小酥肉热榜第3名", "月售72 好评度98%", "5"),
        createFood(1, 1, "韩式炸鸡2", "门店销量第1名", "月售656 好评度84%", "15.95"),
        createFood(2, 1, "双拼口味炸鸡2", "门店销量第2名", "月售336 好评度100%", "21.95"),
        createFood(3, 1, "香酥小酥肉2", "小酥肉热榜第3名", "月售72 好评度98%", "5"),
      ]
    }
  },
  5: {
    "data": {
      "announce": "公告：欢迎光临东北饺子馆 我们尽最大努力按照按时送达！",
      "list": [
        createFood(1, 2, "牛肉水饺24个", "门店销量第3名", "月售968 好评度100%", "14.98"),
        createFood(2, 2, "三陷混搭24个", "还行，吃的很饱", "月售402 好评度99%", "13.98"),
        createFood(3, 2, "韭菜鸡蛋水饺", "门店销量第1名", "月售1343 好评度95%", "4.5"),
      ]
    }
  },
  6: {
    "data": {
      "announce": "公告：下午16点到凌晨一点半都可以配送！",
      "list": [
        createFood(1, 3, "半斤肉筋", "真香，香死了", "月售508 好评度100%", "22"),
        createFood(2, 3, "翅中", "我室友特别喜欢", "月售355 好评度99%", "7"),
        createFood(3, 3, "三肉筋+火腿+面筋+饼", "好吃美滋滋", "月售247 好评度95%", "14"),
      ]
    }
  },
}
app.listen(5000, () => {
  console.log("express running at port 5000...");
})

app.get('/home', function (req, res) {
  res.send({
    "data": list.map(item => createPreviewItem(item)),
    "msg": "请求成功"
  })
  res.end()
})

app.get('/detail/:id', function (req, res) {
  res.send(details[req.params.id]);
  res.end()
})

app.post('/submit', function (req, res) {
  const filename = hash(JSON.stringify(req.body)) + '.png';
  console.log(filename);
  const outputDir = path.resolve(__dirname, 'static/cart');
  const outputFile = path.resolve(outputDir, filename);
  if (!fs.existsSync(outputFile)) {
    var qr_png = qrCreate.image(JSON.stringify(req.body), { type: "png" });
    const img  = fs.createWriteStream(outputFile);
    qr_png.pipe(img);
  }
  res.send({
    "msg":"上传成功",
    "path": baseUrl + "/cart/" + filename
  })
})


function createPreviewItem({
  id,
  image,
  title,
  deliver,
  deliverTime,
  lable,
  sale
}) {
  return {
    id,
    image: baseUrl + "/preview/" + image,
    title,
    deliver,
    deliverTime,
    lable,
    sale,
    detailUrl: baseUrl + "/detail/" + id,
  }
}

function createFood(id, parentId, title, lable, subTitle, price) {
  return {
    "image": baseUrl + "/detail/" + parentId + "/" + id + ".png",
    "name": title,
    "price": price,
    "subTitle": subTitle,
    "lable": lable
  }
}

const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

function hash(input){
 var hash = 5381;
 var i = input.length - 1;

 if(typeof input == 'string'){
  for (; i > -1; i--)
   hash += (hash << 5) + input.charCodeAt(i);
 }
 else{
  for (; i > -1; i--)
   hash += (hash << 5) + input[i];
 }
 var value = hash & 0x7FFFFFFF;

 var retValue = '';
 do{
  retValue += I64BIT_TABLE[value & 0x3F];
 }
 while(value >>= 6);

 return retValue;
}