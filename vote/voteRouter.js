const { signedCookie } = require('cookie-parser');
const  express = require('express');
const router = express.Router();
const fileLeader = require('../../moduls/fileLeader');
const fs = require('fs');
const jsonsLocation = 'api\\jsons'
//http://localhost:3000/vote/:idのミドルウェア群
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
router.put('/add/:id',(req,res,next)=>{
    try{
        const questionJson = fileLeader(req.params.id);
        /*
        const jsonsLocation = 'api\\jsons'
        const questionJsonStr = fs.readFileSync(`${jsonsLocation}\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        */
        questionJson.choices[req.body.id].count++;
        fs.writeFileSync(`${jsonsLocation}\\${req.params.id}.json`,JSON.stringify(questionJson),'utf8');
        console.log(questionJson);
    }catch(err){
        console.log(err);
    }
});
router.put('/sub/:id',(req,res,next)=>{
    try{
        const questionJson = fileLeader(req.params.id);
        /*
        const jsonsLocation = 'api\\jsons'
        const questionJsonStr = fs.readFileSync(`${jsonsLocation}\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        */
        if(questionJson.choices[req.body.id].count>0){
            questionJson.choices[req.body.id].count--;
        }else{
            throw("もうゼロだよ");
        }
        console.log(`${jsonsLocation}\\${req.body.id}.json`);
        fs.writeFileSync(`${jsonsLocation}${req.body.id}.json`,JSON.stringify(questionJson),'utf8');
        console.log(questionJson);
    }catch(err){
        res.status(409).send(err);
    }
})

module.exports = router;