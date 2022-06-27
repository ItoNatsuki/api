const { v4: uuidv4 } = require('uuid');
const  express = require('express');
const router = express.Router();
let uuid = uuidv4();
const testJson = {
    id:uuid,
    subject:"注文したい飲み物",
    choices:[
        {id:1,content:"ビール",count:0},
        {id:2,content:"ウーロンハイ",count:0},
        {id:3,content:"焼酎",count:0},
        {id:4,content:"お冷",count:0}
    ],
    settings:{
        test:true,
        test2:true,
        test3:true,
        test4:true
    }

} 
let jsonList ={"67bc788e-877c-4dfc-af05-3d7eb845315c":testJson}
    
//http://localhost:3000/vote/:idのミドルウェア群
router.get('/:id',(req,res,next)=>{
    tempJson = jsonList[req.params.id];
    next();
});
router.get('/:id',(req,res,next)=>{
    res.send(tempJson);
})

module.exports = router;