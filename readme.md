# /投票WebAppApiガイド

## データ構造　　

___

 /vote/UUID 等でgetした際に返却するjsonは以下の通り  

```
{
    "questionsId": "UUID",
    "questions": [
        {
            "questionID": 0,
            "subject": "example",
            "choices": [
                {
                    "id": 0,
                    "content": "example_1",
                    "count": 0
                },
                {
                    "id": 1,
                    "content": "example_2",
                    "count": 0
                },
                {
                    "id": 2,
                    "content": "example_3",
                    "count": 0
                },
                {
                    "id": 3,
                    "content": "example_4",
                    "count": 0
                }
            ]
        },
        {
            "questionID": 1,
            "subject": "example",
            "choices": [
                {
                    "id": 0,
                    "content": "example_1",
                    "count": 0
                },
                {
                    "id": 1,
                    "content": "example_2",
                    "count": 0
                },
                {
                    "id": 2,
                    "content": "example_3",
                    "count": 0
                },
                {
                    "id": 3,
                    "content": "example_4",
                    "count": 0
                }
            ]
        }
    ]
}
```  
## 要素の説明  
questionID  
: 質問ファイルを特定するためのID
　





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



