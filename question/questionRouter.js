const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const fs = require('fs');
const router = express.Router();
//http://localhost:3000/questionのミドルウェア群
//質問作成
router.post('/',(req,res,next)=>{
    //POSTで送信されたデータをjson形式(オブジェクト)に整形する(expressの内蔵ミドルウェア　express.json())
    questionObj = req.body;
    //idを生成し、質問データにパラメータとして付与
    const questionId = uuidv4();
    questionObj.id = questionId;
    choicesList = req.body.choice;
    //選択肢に連番IDと投票数のパラメータを作成
    const choices = [];
    choicesList.forEach((element,index )=> {
        choices.push({id:index,content:element,count:0});
    });
    delete questionObj.choice;
    questionObj.choices = choices;
    //オブジェクトからJSON文字列に変換
    const questionJson = JSON.stringify(questionObj);
    //ファイル書き込み
    try{
        fs.writeFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${questionId}.json`,questionJson,'utf8');
        res.send({id:questionId});
    }catch(err){
        console.log(err);
    }
});
//投票機能
router.put('/:id',(req,res,next)=>{
    try{
        //jsonファイル読み込み・変換
        const questionJsonStr = fs.readFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        //投票
        questionJson.choices[req.body.id].count++;
        //ファイル上書き
        fs.writeFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${req.params.id}.json`,JSON.stringify(questionJson),'utf8');
        console.log(questionJson);
        //json返却
        res.json(questionJson);
    }catch(err){
        console.log(err);
    }
});
module.exports = router;