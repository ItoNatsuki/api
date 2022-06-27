const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const router = express.Router();
//http://localhost:3000/questionのミドルウェア群
router.post('/',(req,res,next)=>{
    //POSTで送信されたデータをjsonに整形する(expressの内蔵ミドルウェア　express.json())
    questionJson = req.body;
    const questionId = uuidv4();
    questionJson.id = questionId;
    choicesList = req.body.choice;
    const choices = [];
    choicesList.forEach((element,index )=> {
        choices.push({id:index,content:element,count:0});
    });
    delete questionJson.choice;
    questionJson.choices = choices;
    res.send({id:questionId});
})
module.exports = router;