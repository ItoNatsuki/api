const  express = require('express');
const router = express.Router();
const fs = require('fs');
    
//http://localhost:3000/vote/:idのミドルウェア群
//GETメソッド(集計状況の確認)
router.get('/:id',(req,res,next)=>{
    try{
        //JSONファイルを開く
        const questionJsonStr = fs.readFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        //httpヘッダーのcontent-typeがjsonで送信される
        res.json(questionJson);
    }catch(err){
        console.log(err);
    }
});
router.put('/:id',(req,res,next)=>{
    try{
        const questionJsonStr = fs.readFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${req.params.id}.json`,'utf8');
        const questionJson = JSON.parse(questionJsonStr);
        questionJson.choices[req.body.id].count++;
        fs.writeFileSync(`C:\\Users\\mamet\\Documents\\my_devs\\nodejs\\web_vote_app\\api\\jsons\\${req.params.id}.json`,JSON.stringify(questionJson),'utf8');
        console.log(questionJson);
    }catch(err){
        console.log(err);
    }



})

module.exports = router;