# /投票WebAppApiガイド

## データ構造　　

___

#　/vote/UUID 等でgetした際に返却するjsonは以下の通り  



## /create

___

**初めて質問を作成する際**にPOSTメソッドを用いて送信する。
パラメータ(name属性)は以下の通り  

* **subject**  

    - 主に質問内容を記述する

 * **choice**   

    - 選択肢を記述する。同じname属性で複数可  

リクエストが成功すると200OKとともに以下のjsonを返す  
`{id:UUID}`



