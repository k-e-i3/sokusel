window.questions = [
    {
        "id": "sample-001",
        "genre": "基準点測量",
        "instruction": "次の文の誤っている箇所を訂正しなさい。",
        "segments": [
            { "text": "トータルステーションを用いた", "type": "static" },
            {
                "text": "距離",
                "type": "interactive",
                "options": ["距離", "角度"],
                "correctAnswer": "角度"
            },
            { "text": "の観測において、", "type": "static" }
        ],
        "explanation": "トータルステーションの観測において、鉛直軸誤差は角度（水平角）の観測値に影響を与えますが、距離測定には直接的な影響を与えません。"
    }
];
