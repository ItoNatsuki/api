const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const fs = require('fs');
const router = express.Router();
//http://localhost:3000/questionのミドルウェア群
router.post('/',(req,res,next)=>{
    //POSTで送信されたデータをjson形式(オブジェクト)に整形する(expressの内蔵ミドルウェア　express.json())
    questionObj = req.body;
    const questionId = uuidv4();
    questionObj.id = questionId;
    choicesList = req.body.choice;
    const choices = [];
    choicesList.forEach((element,index )=> {
        choices.push({id:index,content:element,count:0});
    });
    delete questionObj.choice;
    questionObj.choices = choices;
    const questionJson = JSON.stringify(questionObj);
    const url = 'web_vote_app\\api\\jsons\\'
    try{
        fs.writeFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${questionId}.json`,questionJson,'utf8');
        res.send({id:questionId});
    }catch(err){
        console.log(err);
    }
});
module.exports = router;