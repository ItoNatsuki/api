const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const fs = require('fs');
const router = express.Router();
//http://localhost:3000/questionのミドルウェア群
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
module.exports = router;