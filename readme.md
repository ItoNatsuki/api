# 投票WebAppApiガイド

## データ構造　　

___

 /vote/questionsId 等でgetした際に返却するjsonは以下の通り  

```json
{
    "questionsId": "UUID",
    "deadlineFlag":false,
    "settings":{
        "test1":true,
        "test2":false,
        "test3":true,
        "test4":false
    },
    "questions": [
        {
            "questionID": 0,
            "deadlineFlag":false,
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
            "deadlineFlag":false,
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

```json
{
    "questionsID":"UUID",
    "questions":[...],
    "settings":{...}
}
```

questionsID
:   質問ファイルを特定するためのID。UUIDで実装  
questions:[...]
:   質問を格納する配列  
settings:{...}
:   質問の詳細設定を持つオブジェクト

```json
"questions": [
        {
            "questionID": 0,
            "deadlineFlag":false,
            "subject": "example",
            "choices":[{"id":0,"content":"example","count":0},...]}
]
```

questions[n].questionID  
:   質問単体を特定するためのID。連番で実装  

questions[n].deadlineFlag  
:質問締め切りフラグ  

questions[n].subject  
:   質問内容  

questions[n].choices[...]  
:   選択肢。特定用の連番`id`と内容の`content`、そして集計用の`count`をひとまとめにしたオブジェクトを格納するリスト

## apis/create

___

**初めて質問を作成する際**にPOSTメソッドを用いて送信する。
パラメータ(name属性)は以下の通り  

* **subject**  

    主に質問内容を記述する

* **choice**
  
    選択肢を記述する。 **同じname**属性で複数可  

リクエストが成功すると200OKとともに以下のjsonを返す  
`{questionsId:questionsId}`

## apis/questionsId

___
(未実装)`/questionId/n`で質問をピンポイントで選択することも可能  

(例:`/questionID/3`で`questionId=3`の質問だけの集計状況確認、削除ができる)  

**GET**
: リクエストを飛ばすと質問の集計状況がかえって来る。  

(未実装)**DELETE**
:質問を削除したい場合に使う

## apis/title_list/questionId/　(未実装)

___

(未実装) **GET**
:すべての質問の主題と問題IDを返す

