const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const fs = require('fs');
const fileLeader = require('../../moduls/fileLeader');
const createQuestionObj = require('../../moduls/createQuestionObj')
const router = express.Router();
const DEFAULT_SETTINGS ={
    "test1":true,
    "test2":true,
    "test3":true
}
//http://localhost:3000/のミドルウェア群
//質問作成
router.post('/create',(req,res,next)=>{
    //POSTで送信されたデータをjson形式(オブジェクト)に整形する(expressの内蔵ミドルウェア　express.json())
    //idを生成し、質問データにパラメータとして付与
    /////////////////////////////////////////////////////////////
    const newQuestionsObj={}
    const questionId = uuidv4();
    newQuestionsObj.questionsId = questionId;
    newQuestionsObj.settings=DEFAULT_SETTINGS;
    newQuestionsObj.questions=[];
    const questionObj = createQuestionObj(req.body);
    /////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
/*
    choicesList = createObj.choice;
    //選択肢に連番IDと投票数のパラメータを作成
    const choices = [];
    choicesList.forEach((element,index )=> {
        choices.push({id:index,content:element,count:0});
    });
    delete createObj.choice;
    createObj.questionId=0;
    createObj.choices = choices;
    ////////////////////////////////////////////////////////////////////
    */
    newQuestionsObj.questions.push(questionObj);
    //オブジェクトからJSON文字列に変換
    const questionJson = JSON.stringify(newQuestionsObj);
    //ファイル書き込み
    try{
        fs.writeFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${questionId}.json`,questionJson,'utf8');
        res.send({questionsId:questionId});
    }catch(err){
        console.log(err);
    }
});
//GETメソッド(集計状況の確認)
router.get('/:id',(req,res,next)=>{
    try{
        const questionJson = fileLeader(req.params.id);
        //JSONファイルを開く
        /*
        const jsonsLocation = 'api\\jsons'
        const questionJsonStr = fs.readFileSync(`${jsonsLocation}\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        */
        //httpヘッダーのcontent-typeがjsonで送信される
        res.json(questionJson);
    }catch(err){
        console.log(err);
    }
});
//投票機能

/*router.put('/:id/add',(req,res,next)=>{
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
});*/
module.exports = router;