window.questions = [
    {
        id: "R7-01-a",
        genre: "法規等",
        instruction: "測量法の規定について、誤っている箇所を訂正しなさい。",
        segments: [
            { text: "「基本測量」とは、すべての測量の基礎となる測量で、", type: "static" },
            {
                text: "国が計画する全ての測量",
                type: "interactive",
                options: ["国が計画する全ての測量", "国土地理院が行う測量", "公共団体が実施する測量"],
                correctAnswer: "国土地理院が行う測量"
            },
            { text: "をいう。", type: "static" }
        ],
        explanation: "「基本測量」とは、すべての測量の基礎となる測量で、「国土地理院」が行うものを指します（測量法第4条）。国が計画するものでも、他省庁が行うものは「公共測量」に含まれることがあります。"
    },
    {
        id: "R7-01-b",
        genre: "法規等",
        instruction: "測量法の規定について、誤っている箇所を訂正しなさい。",
        segments: [
            { text: "基本測量の測量成果を使用しようとする者は、", type: "static" },
            {
                text: "あらかじめ国土地理院の長の承認",
                type: "interactive",
                options: ["あらかじめ国土地理院の長の承認", "あらかじめ国土地理院の長の許可", "あらかじめ国土交通大臣の承認"],
                correctAnswer: "あらかじめ国土地理院の長の承認"
            },
            { text: "を得なければならない。", type: "static" }
        ],
        explanation: "正しくは「承認」です。測量法第29条において、基本測量の測量成果を使用する場合、国土地理院の長の承認が必要とされています。（ただし、個人で楽しむ場合などは除く）"
    },
    {
        id: "R7-02-a",
        genre: "基準点測量",
        instruction: "GNSS測量について、誤っている箇所を訂正しなさい。",
        segments: [
            { text: "電子基準点のみを既知点として行うGNSS測量では、", type: "static" },
            {
                text: "セミ・ダイナミック補正を行わない",
                type: "interactive",
                options: ["セミ・ダイナミック補正を行わない", "セミ・ダイナミック補正を行う必要がある", "ジオイド補正を行わない"],
                correctAnswer: "セミ・ダイナミック補正を行う必要がある"
            },
            { text: "場合がある。", type: "static" }
        ],
        explanation: "電子基準点は地殻変動の影響を常時観測しているため、現在（今期）の座標値を持っています。一方、基準となる成果（元期）とのズレを補正するために「セミ・ダイナミック補正」を行う必要があります。"
    },
    {
        id: "R7-03-b",
        genre: "地図・GIS",
        instruction: "地理情報システム(GIS)について、誤っている箇所を訂正しなさい。",
        segments: [
            { text: "ラスタデータは、", type: "static" },
            {
                text: "位置と形状を座標値で表現する",
                type: "interactive",
                options: ["位置と形状を座標値で表現する", "格子状の画素（ピクセル）で表現する", "位相構造で表現する"],
                correctAnswer: "格子状の画素（ピクセル）で表現する"
            },
            { text: "データ形式である。", type: "static" }
        ],
        explanation: "「位置と形状を座標値で表現する」のは『ベクタデータ』です。ラスタデータは画像のように画素（ピクセル）の集まりで表現されます。"
    },
    {
        id: "example-05",
        genre: "応用測量",
        instruction: "河川測量について、誤っている箇所を訂正しなさい。",
        segments: [
            { text: "定期縦断測量は、", type: "static" },
            {
                text: "河川の深浅測量と同時に行う",
                type: "interactive",
                options: ["河川の深浅測量と同時に行う", "河川の法線測量と同時に行う", "距離標設置測量と同時に行う"],
                correctAnswer: "距離標設置測量と同時に行う"
            },
            { text: "のが原則である。", type: "static" }
        ],
        explanation: "河川の定期縦断測量は、通常、距離標の設置と合わせて行われます。"
    },
    {
        "id": "R7-07-a",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "光波測距儀で観測した距離は、気温が上がり大気の密度が小さくなった場合、屈折率が小さくなるので、見かけ上",
                "type": "static"
            },
            {
                "text": "短く",
                "type": "interactive",
                "options": [
                    "短く",
                    "長く",
                    "変わらなく"
                ],
                "correctAnswer": "短く"
            },
            {
                "text": "なる。",
                "type": "static"
            }
        ],
        "explanation": "気温が上がると空気密度が下がり、光の速度（位相速度）が速くなります。TSは到達時間から距離を計算するため、速く届いてしまう分、距離は実際より「短く」測定されます。"
    },
    {
        "id": "R7-07-b",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "偏心点を設ける場合、偏心距離は",
                "type": "static"
            },
            {
                "text": "測点間距離",
                "type": "interactive",
                "options": [
                    "測点間距離",
                    "既知点間距離",
                    "視準距離"
                ],
                "correctAnswer": "測点間距離"
            },
            {
                "text": "の6分の1以下を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "偏心距離が長すぎると角度誤差の影響が大きくなるため、測点間距離の1/6以下に抑えるのが標準です。"
    },
    {
        "id": "R7-09-5",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公共測量において、スタティック法による10km以上の観測を行う場合、観測に必要な衛星数はGPS衛星と準天頂衛星を合わせて最小で",
                "type": "static"
            },
            {
                "text": "5衛星",
                "type": "interactive",
                "options": [
                    "4衛星",
                    "5衛星",
                    "3衛星"
                ],
                "correctAnswer": "5衛星"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "スタティック法（10km以上）において、GPSと準天頂衛星を併用する場合の最低衛星数は「5機以上」です（GPSのみでも5機）。4機では不足しています。"
    },
    {
        "id": "R7-10-4",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "1級?4級基準点測量におけるスタティック法では、GNSS衛星の軌道情報に",
                "type": "static"
            },
            {
                "text": "放送暦",
                "type": "interactive",
                "options": [
                    "放送暦",
                    "精密暦",
                    "快速暦"
                ],
                "correctAnswer": "放送暦"
            },
            {
                "text": "を用いることができる。",
                "type": "static"
            }
        ],
        "explanation": "通常の公共測量の基準点測量では、リアルタイムに配信される「放送暦」を使用します。事後計算が必要な「精密暦」の使用は必須ではありません。"
    },
    {
        "id": "R7-12-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "直接水準測量の最大視準距離は、",
                "type": "static"
            },
            {
                "text": "水準測量の等級",
                "type": "interactive",
                "options": [
                    "機器の性能",
                    "水準測量の等級",
                    "作業員の視力"
                ],
                "correctAnswer": "水準測量の等級"
            },
            {
                "text": "によって定められている。",
                "type": "static"
            }
        ],
        "explanation": "最大視準距離は、精度確保のため等級ごとに作業規程で定められています（例：1級なら50m以内）。機器の性能任せではありません。"
    },
    {
        "id": "R7-12-d",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "標尺は2本1組とし、往路及び復路の観測において標尺を交換するのは、",
                "type": "static"
            },
            {
                "text": "零点誤差",
                "type": "interactive",
                "options": [
                    "視準軸の傾き",
                    "零点誤差",
                    "球差"
                ],
                "correctAnswer": "零点誤差"
            },
            {
                "text": "を消去するためである。",
                "type": "static"
            }
        ],
        "explanation": "標尺の底面の摩耗などで生じる「零点誤差」は、往復で標尺を交換し、かつ測点数を偶数にすることで消去できます。「視準軸の傾き」は視準距離を等しくすることで消去します。"
    },
    {
        "id": "R7-14-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "現地測量において、基準点又はTS点から地形を測定する場合、地性線及び",
                "type": "static"
            },
            {
                "text": "ジオイド高",
                "type": "interactive",
                "options": [
                    "ジオイド高",
                    "標高",
                    "楕円体高"
                ],
                "correctAnswer": "標高"
            },
            {
                "text": "を測定し、図形編集装置によって等高線描画を行う。",
                "type": "static"
            }
        ],
        "explanation": "現地測量（TS等）では、現地の「標高」や「位置」を直接測定します。ジオイド高は計算やモデルから求めるものであり、現地で直接測定するものではありません。"
    },
    {
        "id": "R7-15-2",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ネットワーク型RTK法による地形等の測定は、ある一つの点から、基準方向と各細部点との",
                "type": "static"
            },
            {
                "text": "交角及び距離を測定する手法",
                "type": "interactive",
                "options": [
                    "交角及び距離を測定する手法",
                    "座標を直接測定する手法",
                    "高低差のみを測定する手法"
                ],
                "correctAnswer": "座標を直接測定する手法"
            },
            {
                "text": "で行うことができる。",
                "type": "static"
            }
        ],
        "explanation": "「交角と距離」を測定するのはトータルステーション（TS）を用いた放射法の特徴です。GNSS（RTK法）は衛星からの電波で「座標」を直接測定します。"
    },
    {
        "id": "R7-16-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザスキャナによる計測の方向は、地形の",
                "type": "static"
            },
            {
                "text": "高い方から低い方へ",
                "type": "interactive",
                "options": [
                    "高い方から低い方へ",
                    "低い方から高い方へ",
                    "東から西へ"
                ],
                "correctAnswer": "低い方から高い方へ"
            },
            {
                "text": "の向きを原則とする。",
                "type": "static"
            }
        ],
        "explanation": "地上レーザ測量は、地形の「低い方から高い方へ（見上げるように）」計測するのが原則です。高い方から見下ろすと、足元などが死角になりやすいためです。"
    },
    {
        "id": "R7-18-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "合成開口レーダ(SAR)は、観測対象物が自ら放射する電磁波を受信して性質を調べる",
                "type": "static"
            },
            {
                "text": "受動型センサ",
                "type": "interactive",
                "options": [
                    "受動型センサ",
                    "能動型センサ",
                    "光学センサ"
                ],
                "correctAnswer": "能動型センサ"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "SAR（合成開口レーダ）は、自らマイクロ波を照射し、その反射波を受信する「能動型（アクティブ）」センサです。受動型（パッシブ）は熱赤外センサなどを指します。"
    },
    {
        "id": "R7-19-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "UAV写真点群測量において、水平位置及び標高の基準となる標定点を",
                "type": "static"
            },
            {
                "text": "検証点としても利用し",
                "type": "interactive",
                "options": [
                    "検証点としても利用し",
                    "検証点とは別の点とし",
                    "パスポイントとして利用し"
                ],
                "correctAnswer": "検証点とは別の点とし"
            },
            {
                "text": "、三次元点群データの位置精度の評価を行う。",
                "type": "static"
            }
        ],
        "explanation": "精度の評価（検証）には、計算に使用していない独立した「検証点」を使用する必要があります。計算に使った「標定点」を検証に使うと、正しい精度評価ができません。"
    },
    {
        "id": "R7-20-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "車載写真レーザ測量(MMS)では、計測した距離と角度から",
                "type": "static"
            },
            {
                "text": "三次元形状復元計算により",
                "type": "interactive",
                "options": [
                    "三次元形状復元計算により",
                    "レーザ測距データと位置姿勢データにより",
                    "航空三角測量により"
                ],
                "correctAnswer": "レーザ測距データと位置姿勢データにより"
            },
            {
                "text": "三次元点群データの座標を求めている。",
                "type": "static"
            }
        ],
        "explanation": "MMSはレーザ測距とGNSS/IMUの位置姿勢データから直接座標を計算します。「三次元形状復元計算（SfM処理）」は、写真の重なりから形状を計算する手法です。"
    },
    {
        "id": "R7-20-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "UAV写真点群測量において、隣接コースの数値写真との重複度（サイドラップ）が",
                "type": "static"
            },
            {
                "text": "40%以上",
                "type": "interactive",
                "options": [
                    "40%以上",
                    "60%以上",
                    "20%以上"
                ],
                "correctAnswer": "60%以上"
            },
            {
                "text": "となるように撮影計画を立案した。",
                "type": "static"
            }
        ],
        "explanation": "UAV写真測量において、隣接コース間の重複度（サイドラップ）は、標準で「60%以上」必要です。40%では不足しています。"
    },
    {
        "id": "R7-22-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "平面の地図上において、正角図法と正積図法の性質を同時に満足させることは、理論上",
                "type": "static"
            },
            {
                "text": "可能である",
                "type": "interactive",
                "options": [
                    "可能である",
                    "不可能である",
                    "条件付きで可能である"
                ],
                "correctAnswer": "不可能である"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "球体を平面にする際、角度（形）を正しく保つ「正角図法」と、面積を正しく保つ「正積図法」を両立させることは理論上不可能です。"
    },
    {
        "id": "R7-23-4",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "山林の崩壊土砂量は、発災前の",
                "type": "static"
            },
            {
                "text": "数値表層モデル(DSM)",
                "type": "interactive",
                "options": [
                    "数値表層モデル(DSM)",
                    "数値地形モデル(DTM)",
                    "数値地図画像"
                ],
                "correctAnswer": "数値地形モデル(DTM)"
            },
            {
                "text": "と発災後のDEMとの差分から求めることができる。",
                "type": "static"
            }
        ],
        "explanation": "土砂量の計算には、崩壊前後の「地盤高（DTM/DEM）」同士の差分が必要です。発災前が「DSM（樹木含む）」だと、樹木の高さ分だけ土砂量が多く計算されてしまい、正確ではありません。"
    },
    {
        "id": "R7-24-2",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基盤地図情報における平面位置及び高さの精度は、都市計画区域内と都市計画区域外で",
                "type": "static"
            },
            {
                "text": "同一である",
                "type": "interactive",
                "options": [
                    "同一である",
                    "異なっている",
                    "関連性がない"
                ],
                "correctAnswer": "異なっている"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "基盤地図情報の精度基準は、利用ニーズの高い「都市計画区域内」の方が厳しく設定されています（例：高さ精度など）。区域外と同一ではありません。"
    },
    {
        "id": "R7-26-4",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "用地境界仮杭設置において、視通が確保できる場合、道路計画中心線と境界線の交点に",
                "type": "static"
            },
            {
                "text": "視通法により",
                "type": "interactive",
                "options": [
                    "視通法により",
                    "放射法により",
                    "平板測量により"
                ],
                "correctAnswer": "放射法により"
            },
            {
                "text": "用地境界仮杭を設置することができる。",
                "type": "static"
            }
        ],
        "explanation": "用地境界仮杭の設置は、座標値に基づく「放射法」等で行うのが原則です。「視通法」のような簡易な方法は、精度管理の観点から用地境界仮杭の設置には用いられません。"
    },
    {
        "id": "R7-28-a",
        "genre": "応用測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "定期",
                "type": "static"
            },
            {
                "text": "横断測量",
                "type": "interactive",
                "options": [
                    "縦断測量",
                    "横断測量",
                    "深浅測量"
                ],
                "correctAnswer": "横断測量"
            },
            {
                "text": "では、水部と陸部で異なる測量を行う。水部は深浅測量を、陸部は水際杭から堤内20~50mまでを標準とする。",
                "type": "static"
            }
        ],
        "explanation": "河川を横切る方向の形状を測るのは「横断測量」です。陸上部分と水中部分（深浅測量）を組み合わせて行います。"
    },
    {
        "id": "R6-01-d",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量業者は、その営業所ごとに",
                "type": "static"
            },
            {
                "text": "測量士又は測量士補",
                "type": "interactive",
                "options": [
                    "測量士又は測量士補",
                    "測量士",
                    "実務経験者"
                ],
                "correctAnswer": "測量士"
            },
            {
                "text": "を一人以上置かなければならない。",
                "type": "static"
            }
        ],
        "explanation": "測量法により、測量業者は営業所ごとに必ず「測量士」を1名以上置く必要があります。「測量士補」では代替できません。"
    },
    {
        "id": "R6-02-3",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ITRFのY軸は、回転楕円体の中心及び",
                "type": "static"
            },
            {
                "text": "西経90°",
                "type": "interactive",
                "options": [
                    "西経90°",
                    "東経90°",
                    "経度0°"
                ],
                "correctAnswer": "東経90°"
            },
            {
                "text": "の子午線と赤道との交点を通る直線である。",
                "type": "static"
            }
        ],
        "explanation": "ITRF（国際地球基準座標系）のY軸は「東経90度」方向を正とします。西経ではありません。"
    },
    {
        "id": "R6-03-4",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "JPGISは、地球上の位置と直接的に関連付けられたオブジェクト",
                "type": "static"
            },
            {
                "text": "のみ",
                "type": "interactive",
                "options": [
                    "のみ",
                    "及び間接的に関連付けられたオブジェクト",
                    "を除くオブジェクト"
                ],
                "correctAnswer": "及び間接的に関連付けられたオブジェクト"
            },
            {
                "text": "に関する情報処理技術のための実用標準である。",
                "type": "static"
            }
        ],
        "explanation": "JPGISは、直接的な位置情報（座標）だけでなく、住所や郵便番号などの「間接的」に関連付けられたオブジェクトも対象としています。「のみ」という限定は誤りです。"
    },
    {
        "id": "R6-26-4",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "用地測量における面積計算は、原則として",
                "type": "static"
            },
            {
                "text": "三斜法",
                "type": "interactive",
                "options": [
                    "三斜法",
                    "座標法",
                    "プラニメーター法"
                ],
                "correctAnswer": "座標法"
            },
            {
                "text": "により行うものとする。",
                "type": "static"
            }
        ],
        "explanation": "用地測量の面積計算は、境界測量で得られた正確な座標値に基づく「座標法」により行います。三斜法は古い手法であり、現在は原則用いられません。"
    },
    {
        "id": "R6-28-e",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "深浅測量における水深の測定は、",
                "type": "static"
            },
            {
                "text": "電波式水位計",
                "type": "interactive",
                "options": [
                    "電波式水位計",
                    "音響測深機",
                    "水圧計"
                ],
                "correctAnswer": "音響測深機"
            },
            {
                "text": "を用いて行うものとする。",
                "type": "static"
            }
        ],
        "explanation": "水深（底までの深さ）の測定は「音響測深機（エコーサウンダー）」を用います。「電波式水位計」は水面の高さ（水位）を測るもので、水中を透過しない電波では水深は測れません。"
    },
    {
        "id": "R5-01-a",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公共測量とは、国等の費用の負担を受けて行われる測量をいい、国等からの補助を受けて行う測量を",
                "type": "static"
            },
            {
                "text": "含まない",
                "type": "interactive",
                "options": [
                    "含まない",
                    "含む",
                    "除く"
                ],
                "correctAnswer": "含む"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "公共測量の定義には、国や公共団体の費用負担だけでなく、「補助」を受けて行われる測量も含まれます（測量法第5条）。"
    },
    {
        "id": "R5-01-b",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量計画機関は、公共測量において",
                "type": "static"
            },
            {
                "text": "一時標識",
                "type": "interactive",
                "options": [
                    "一時標識",
                    "永久標識",
                    "仮設標識"
                ],
                "correctAnswer": "永久標識"
            },
            {
                "text": "を設置したときは、関係市町村長に通知するとともに、公表しなければならない。",
                "type": "static"
            }
        ],
        "explanation": "設置の通知・公表義務があるのは、永続的に使用される「永久標識」を設置した場合です。一時的な使用にとどまる「一時標識」には公表義務はありません。"
    },
    {
        "id": "R5-02-b",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "日本の測地成果は、ITRF（国際地球基準座標系）が更新されると",
                "type": "static"
            },
            {
                "text": "連動して更新される",
                "type": "interactive",
                "options": [
                    "連動して更新される",
                    "連動せず固定されている",
                    "毎年更新される"
                ],
                "correctAnswer": "連動せず固定されている"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "日本の測地成果（JGD2011）は、元期（特定の時点）の座標系に固定されています。ITRF自体が最新版に更新されても、日本の成果数値は自動的には変わりません。"
    },
    {
        "id": "R5-03-2",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "JPGISに準拠する応用スキーマで定義された地理空間データは、",
                "type": "static"
            },
            {
                "text": "統一モデル化言語(UML)",
                "type": "interactive",
                "options": [
                    "統一モデル化言語(UML)",
                    "XML等のマークアップ言語",
                    "バイナリ形式"
                ],
                "correctAnswer": "XML等のマークアップ言語"
            },
            {
                "text": "を用いて符号化される。",
                "type": "static"
            }
        ],
        "explanation": "UMLはデータの構造（スキーマ）を「記述・設計」するための言語です。データそのものの「符号化（エンコーディング）」には、XMLなどが用いられます。"
    },
    {
        "id": "R5-06-b",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公共測量における距離及び面積は、",
                "type": "static"
            },
            {
                "text": "ジオイド",
                "type": "interactive",
                "options": [
                    "ジオイド",
                    "回転楕円体",
                    "平面"
                ],
                "correctAnswer": "回転楕円体"
            },
            {
                "text": "の表面上における値で表示する。",
                "type": "static"
            }
        ],
        "explanation": "距離や面積は、水平位置の基準である「回転楕円体」面上の値で表示します。ジオイドは高さ（標高）の基準面です。"
    },
    {
        "id": "R5-07-5",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "TSによる距離測定では、測定した位相差に光波の往復にかかった",
                "type": "static"
            },
            {
                "text": "時間を乗じる",
                "type": "interactive",
                "options": [
                    "時間を乗じる",
                    "速さを乗じる",
                    "周波数を乗じる"
                ],
                "correctAnswer": "速さを乗じる"
            },
            {
                "text": "ことによって距離を求めている。",
                "type": "static"
            }
        ],
        "explanation": "距離＝速さ×時間です。位相差から「時間」を求め、それに光の「速さ」を掛けて距離を算出します。「位相差に時間を掛ける」という記述は物理的に誤りです。"
    },
    {
        "id": "R5-09-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "スタティック法による10km以上の観測において、GPS・準天頂衛星及びGLONASS衛星を用いる場合は、これらの衛星を",
                "type": "static"
            },
            {
                "text": "5衛星以上",
                "type": "interactive",
                "options": [
                    "5衛星以上",
                    "6衛星以上",
                    "4衛星以上"
                ],
                "correctAnswer": "6衛星以上"
            },
            {
                "text": "使用する。",
                "type": "static"
            }
        ],
        "explanation": "10km以上の長距離でスタティック法を行う場合、GPS単独であれば5衛星以上ですが、他システム（GLONASS等）を併用する場合は「6衛星以上」必要という規定があります。"
    },
    {
        "id": "R5-09-e",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "キネマティック法は、固定局と移動局で同時に",
                "type": "static"
            },
            {
                "text": "単独測位",
                "type": "interactive",
                "options": [
                    "単独測位",
                    "相対測位",
                    "天体測位"
                ],
                "correctAnswer": "相対測位"
            },
            {
                "text": "を行い、基線ベクトルを求める観測方法である。",
                "type": "static"
            }
        ],
        "explanation": "キネマティック法は、搬送波位相を用いた「相対測位（干渉測位）」です。精度の低い「単独測位」の差分をとる手法ではありません。"
    },
    {
        "id": "R5-11-3",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量において、電子基準点のみを既知点とする場合、セミ・ダイナミック補正を",
                "type": "static"
            },
            {
                "text": "行う必要がある",
                "type": "interactive",
                "options": [
                    "行う必要がある",
                    "行わない場合がある",
                    "行うことは禁止されている"
                ],
                "correctAnswer": "行わない場合がある"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "通常は補正を行いますが、地殻変動の影響を考慮済みの成果を使用する場合など、規定により補正が「不要」とされるケースがあります。「必ず行う必要がある」と限定している点が誤りです。"
    },
    {
        "id": "R5-12-a",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "1級水準測量及び2級水準測量における検測（点検のための観測）は、",
                "type": "static"
            },
            {
                "text": "片道観測",
                "type": "interactive",
                "options": [
                    "片道観測",
                    "往復観測",
                    "同時観測"
                ],
                "correctAnswer": "片道観測"
            },
            {
                "text": "を原則とする。",
                "type": "static"
            }
        ],
        "explanation": "本観測は「往復観測」で行いますが、検測（チェック）は効率化のため原則として「片道観測」で行います。"
    },
    {
        "id": "R5-15-2",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "RTK法による地形測定の点検において、セット間較差の許容範囲は、水平成分は20mm、高さ成分は",
                "type": "static"
            },
            {
                "text": "20mm",
                "type": "interactive",
                "options": [
                    "20mm",
                    "30mm",
                    "50mm"
                ],
                "correctAnswer": "30mm"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "GNSS測量は高さ方向の精度が出にくいため、許容範囲は水平（20mm）よりも高さ（30mm）の方が緩く設定されています。「いずれも20mm」という記述は誤りです。"
    },
    {
        "id": "R5-16-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量において同一箇所から複数回計測する場合は、それぞれ地上レーザスキャナの器械高を",
                "type": "static"
            },
            {
                "text": "変えないようにする",
                "type": "interactive",
                "options": [
                    "変えないようにする",
                    "変えて行う",
                    "最大にする"
                ],
                "correctAnswer": "変えて行う"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "器械高を変えて計測することで、データの系統的な誤差を検出したり、死角を補完したりすることができます。"
    },
    {
        "id": "R5-16-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地図情報レベル500の数値地形図データを作成する場合、標定点の精度(標準偏差)は水平位置・標高ともに",
                "type": "static"
            },
            {
                "text": "0.2m以内",
                "type": "interactive",
                "options": [
                    "0.2m以内",
                    "0.02m以内",
                    "2.0m以内"
                ],
                "correctAnswer": "0.02m以内"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "地図情報レベル500（縮尺1/500相当）は高精度な地図です。標定点の精度には数センチメートル（0.02m等）の精度が求められます。0.2m（20cm）では粗すぎます。"
    },
    {
        "id": "R5-18-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "UAV写真点群測量において、標定点は",
                "type": "static"
            },
            {
                "text": "検証点を兼ねることができる",
                "type": "interactive",
                "options": [
                    "検証点を兼ねることができる",
                    "検証点とは別の点とする",
                    "パスポイントを兼ねる"
                ],
                "correctAnswer": "検証点とは別の点とする"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "標定点（計算に使う点）と検証点（答え合わせに使う点）は、役割が異なるため、必ず別の点を使用しなければなりません。"
    },
    {
        "id": "R5-20-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "車載写真レーザ測量において、着脱式システムのキャリブレーション有効期間は",
                "type": "static"
            },
            {
                "text": "1年",
                "type": "interactive",
                "options": [
                    "1年",
                    "6ヶ月",
                    "3年"
                ],
                "correctAnswer": "6ヶ月"
            },
            {
                "text": "を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "着脱式（取り外し可能）なシステムは、固定式よりも取り付け誤差が生じやすいため、有効期間は短く設定されます（通常6ヶ月、または取り付けの都度）。"
    },
    {
        "id": "R5-22-4",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地理院地図（地理院タイル）の地図投影法は、",
                "type": "static"
            },
            {
                "text": "ユニバーサル横メルカトル図法",
                "type": "interactive",
                "options": [
                    "ユニバーサル横メルカトル図法",
                    "ウェブメルカトル図法",
                    "正距方位図法"
                ],
                "correctAnswer": "ウェブメルカトル図法"
            },
            {
                "text": "を採用している。",
                "type": "static"
            }
        ],
        "explanation": "地形図はUTM図法ですが、ウェブ地図（地理院地図やGoogleマップ等）は、計算が簡易で正方形タイルに適した「ウェブメルカトル図法」を採用しています。"
    },
    {
        "id": "R5-23-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "DTM（数値地形モデル）と基盤地図情報の建築物の外周線データのみを用いて、建物の高さを",
                "type": "static"
            },
            {
                "text": "算出することができる",
                "type": "interactive",
                "options": [
                    "算出することができる",
                    "算出することはできない",
                    "推定することができる"
                ],
                "correctAnswer": "算出することはできない"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "DTMは「地面」の高さデータです。建物の高さ（DSM等）の情報がない限り、地面のデータと建物の「位置（枠線）」だけがあっても、建物の高さは分かりません。"
    },
    {
        "id": "R5-24-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基盤地図情報の精度について、都市計画区域内における高さの誤差は",
                "type": "static"
            },
            {
                "text": "5.0m以内",
                "type": "interactive",
                "options": [
                    "5.0m以内",
                    "1.0m以内",
                    "10.0m以内"
                ],
                "correctAnswer": "1.0m以内"
            },
            {
                "text": "とされている。",
                "type": "static"
            }
        ],
        "explanation": "都市計画区域内（街中）の精度基準は厳しく、高さの誤差は1.0m以内（または地形により2.5m）などが求められます。5.0mは山間部などの基準です。"
    },
    {
        "id": "R5-26-4",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "用地測量における面積計算は、原則として",
                "type": "static"
            },
            {
                "text": "三斜法",
                "type": "interactive",
                "options": [
                    "三斜法",
                    "座標法",
                    "ヘロンの公式"
                ],
                "correctAnswer": "座標法"
            },
            {
                "text": "により行うものとする。",
                "type": "static"
            }
        ],
        "explanation": "用地測量の面積計算は、境界測量で得られた座標値に基づく「座標法」が原則です。三斜法は古い手法であり、現在は標準ではありません。"
    },
    {
        "id": "R5-28-4",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "定期横断測量において、陸部の測量範囲は、水際杭から",
                "type": "static"
            },
            {
                "text": "20m",
                "type": "interactive",
                "options": [
                    "20m",
                    "50m",
                    "堤内全域"
                ],
                "correctAnswer": "堤内全域"
            },
            {
                "text": "を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "定期横断測量では、堤防や河川敷の形状を把握するため、通常は堤防の法尻（堤内地側）まで、あるいはそれ以上の範囲を測量します。「20m」という一律の短い制限はありません。"
    },
    {
        "id": "R4-01-c",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量計画機関は、自ら測量作業機関となることは",
                "type": "static"
            },
            {
                "text": "できない",
                "type": "interactive",
                "options": [
                    "できない",
                    "できる",
                    "原則禁止されている"
                ],
                "correctAnswer": "できる"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "測量計画機関（国や地方公共団体）が、業者に委託せずに自らの職員と機材で測量を行うこと（直営測量）も法的に認められています。"
    },
    {
        "id": "R4-01-e",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量の測量成果の交付を受けようとする者は、",
                "type": "static"
            },
            {
                "text": "国土交通大臣",
                "type": "interactive",
                "options": [
                    "国土交通大臣",
                    "国土地理院の長",
                    "内閣総理大臣"
                ],
                "correctAnswer": "国土地理院の長"
            },
            {
                "text": "に申請をしなければならない。",
                "type": "static"
            }
        ],
        "explanation": "基本測量の成果（地図など）の謄本交付申請先は「国土地理院の長」です。国土交通大臣ではありません。"
    },
    {
        "id": "R4-03-a",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "JPGISにおいて、測量計画機関が公共測量を実施するときは、測量成果の品質等を示す",
                "type": "static"
            },
            {
                "text": "製品仕様書",
                "type": "interactive",
                "options": [
                    "製品仕様書",
                    "作業規定書",
                    "見積書"
                ],
                "correctAnswer": "製品仕様書"
            },
            {
                "text": "を定めている。",
                "type": "static"
            }
        ],
        "explanation": "地理情報標準プロファイル（JPGIS）では、作成するデータがどのような品質や構造を持つべきかを定義した「製品仕様書」の作成を求めています。"
    },
    {
        "id": "R4-06-a",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量及び公共測量において、位置は、地理学的経緯度及び",
                "type": "static"
            },
            {
                "text": "楕円体高",
                "type": "interactive",
                "options": [
                    "楕円体高",
                    "平均海面からの高さ",
                    "地心直交座標"
                ],
                "correctAnswer": "平均海面からの高さ"
            },
            {
                "text": "で表示する。",
                "type": "static"
            }
        ],
        "explanation": "測量法第11条により、位置の表示の原則は「経緯度」と「標高（平均海面からの高さ）」です。楕円体高ではありません。"
    },
    {
        "id": "R4-07-4",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "偏心点を設ける場合、偏心距離は測点間距離の",
                "type": "static"
            },
            {
                "text": "5分の1以下",
                "type": "interactive",
                "options": [
                    "5分の1以下",
                    "6分の1以下",
                    "10分の1以下"
                ],
                "correctAnswer": "6分の1以下"
            },
            {
                "text": "を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "偏心距離が大きすぎると角度誤差の影響が無視できなくなるため、作業規程の準則では「6分の1以下」と定められています。"
    },
    {
        "id": "R4-09-5",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "スタティック法による10km以上の観測で、GPS・準天頂・GLONASSを併用する場合、必要な衛星数は合計で",
                "type": "static"
            },
            {
                "text": "5衛星以上",
                "type": "interactive",
                "options": [
                    "5衛星以上",
                    "6衛星以上",
                    "4衛星以上"
                ],
                "correctAnswer": "6衛星以上"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "マルチGNSS（複数の衛星システム併用）で長距離（10km以上）のスタティック測量を行う場合、最低「6機以上」の衛星が必要です。"
    },
    {
        "id": "R4-11-a",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量では、",
                "type": "static"
            },
            {
                "text": "2級水準点",
                "type": "interactive",
                "options": [
                    "2級水準点",
                    "3級水準点",
                    "1級水準点"
                ],
                "correctAnswer": "3級水準点"
            },
            {
                "text": "を設置することができる。",
                "type": "static"
            }
        ],
        "explanation": "GNSS水準測量は、直接水準測量に比べて精度が劣るため、設置できるのは「3級水準点」以下に限られます。1級や2級は設置できません。"
    },
    {
        "id": "R4-11-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量の既知点として、",
                "type": "static"
            },
            {
                "text": "全ての電子基準点",
                "type": "interactive",
                "options": [
                    "全ての電子基準点",
                    "標高が決定された電子基準点",
                    "一等三角点"
                ],
                "correctAnswer": "標高が決定された電子基準点"
            },
            {
                "text": "が使用できる。",
                "type": "static"
            }
        ],
        "explanation": "使用できる電子基準点は、水準測量等により正確な標高が決定されているもの（成果表の標高区分が「水準」のもの等）に限られます。"
    },
    {
        "id": "R4-12-c",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "1級水準測量において、三脚の沈下による誤差を小さくするため、",
                "type": "static"
            },
            {
                "text": "後視→前視→前視→後視",
                "type": "interactive",
                "options": [
                    "後視→前視→前視→後視",
                    "後視→後視→前視→前視",
                    "前視→後視→前視→後視"
                ],
                "correctAnswer": "後視→前視→前視→後視"
            },
            {
                "text": "の順に標尺を読み取った。",
                "type": "static"
            }
        ],
        "explanation": "観測順序を「後・前・前・後」とすることで、観測中に三脚が沈下した場合の影響を平均化して消去できます。"
    },
    {
        "id": "R4-14-4",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "RTK法による地形・地物等の測定において、セット内の観測回数は、FIX解を得てから",
                "type": "static"
            },
            {
                "text": "5エポック以上",
                "type": "interactive",
                "options": [
                    "5エポック以上",
                    "1エポック以上",
                    "10エポック以上"
                ],
                "correctAnswer": "1エポック以上"
            },
            {
                "text": "を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "地形や地物を多数測定する細部測量では、効率重視のため、RTK法でFIX解が得られていれば「1エポック以上」の観測でよいとされています。"
    },
    {
        "id": "R4-15-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザスキャナを用いて傾斜のある地形を計測する場合、観測の方向は地形の",
                "type": "static"
            },
            {
                "text": "高い方から低い方へ",
                "type": "interactive",
                "options": [
                    "高い方から低い方へ",
                    "低い方から高い方へ",
                    "水平方向へ"
                ],
                "correctAnswer": "低い方から高い方へ"
            },
            {
                "text": "の向きを原則とする。",
                "type": "static"
            }
        ],
        "explanation": "高い位置から見下ろすと足元の地形が死角になりやすいため、地上レーザ測量は「低い位置から高い位置（法面など）を見上げる」ように計測するのが原則です。"
    },
    {
        "id": "R4-17-b",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "空中写真測量において、標定点はブロックの",
                "type": "static"
            },
            {
                "text": "四隅",
                "type": "interactive",
                "options": [
                    "四隅",
                    "中央",
                    "外側のみ"
                ],
                "correctAnswer": "四隅"
            },
            {
                "text": "に必ず配置するとともに、適切な密度で均等に配置することを標準とする。",
                "type": "static"
            }
        ],
        "explanation": "幾何学的な強度を保ち、歪みを防ぐために、標定点は撮影ブロックの「四隅」に配置するのが基本原則です。"
    },
    {
        "id": "R4-18-d",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "写真地図の作成手順として、隣接する空中写真を結合させてモザイク画像を作成し、そのモザイク画像を",
                "type": "static"
            },
            {
                "text": "正射変換して",
                "type": "interactive",
                "options": [
                    "正射変換して",
                    "色調補正して",
                    "（順序が逆である）"
                ],
                "correctAnswer": "（順序が逆である）"
            },
            {
                "text": "正射投影画像を作成する。",
                "type": "static"
            }
        ],
        "explanation": "手順が逆です。まず個々の写真を「正射変換（オルソ化）」して歪みを取り除いてから、それらを結合（モザイク）して一枚の画像にします。"
    },
    {
        "id": "R4-20-4",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "UAV写真点群測量において、同一コース内の隣接写真との重複度（オーバーラップ）を",
                "type": "static"
            },
            {
                "text": "60%以上",
                "type": "interactive",
                "options": [
                    "60%以上",
                    "80%以上",
                    "90%以上"
                ],
                "correctAnswer": "80%以上"
            },
            {
                "text": "確保するように撮影計画を立案した。",
                "type": "static"
            }
        ],
        "explanation": "UAVによる測量では、姿勢の安定性などの理由から、有人航空機よりも高い重複度が求められます。オーバーラップは「80%以上」が標準です。"
    },
    {
        "id": "R4-22-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "国土地理院が公開しているウェブ地図「地理院地図」は、地形図と同様、",
                "type": "static"
            },
            {
                "text": "ユニバーサル横メルカトル図法",
                "type": "interactive",
                "options": [
                    "ユニバーサル横メルカトル図法",
                    "ウェブメルカトル図法",
                    "正距方位図法"
                ],
                "correctAnswer": "ウェブメルカトル図法"
            },
            {
                "text": "が採用されている。",
                "type": "static"
            }
        ],
        "explanation": "ウェブ地図（地理院タイル）は、正方形のタイル画像として扱いやすい「ウェブメルカトル図法」を採用しています。UTM図法とは異なります。"
    },
    {
        "id": "R4-23-a",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "地図情報レベル2500の等高線作成には、航空レーザ測量により作成した格子間隔",
                "type": "static"
            },
            {
                "text": "2m",
                "type": "interactive",
                "options": [
                    "2m",
                    "5m",
                    "10m"
                ],
                "correctAnswer": "2m"
            },
            {
                "text": "のDTMを用いることができる。",
                "type": "static"
            }
        ],
        "explanation": "縮尺1/2500相当の詳細な地図を作成するには、地盤高データ（DTM）も細かい間隔（2m以内）である必要があります。5mや10mでは粗すぎます。"
    },
    {
        "id": "R4-24-4",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基盤地図情報の数値標高モデル(DTM)とジオイド・モデルを利用することで、",
                "type": "static"
            },
            {
                "text": "数値表層モデル(DSM)",
                "type": "interactive",
                "options": [
                    "数値表層モデル(DSM)",
                    "標高",
                    "傾斜区分図"
                ],
                "correctAnswer": "標高"
            },
            {
                "text": "を作成することができる。",
                "type": "static"
            }
        ],
        "explanation": "DTM（地面）にジオイド（基準面補正）を加えても、得られるのは正確な「標高」です。建物や木を含む「数値表層モデル(DSM)」を作るには、地物の高さ情報が別途必要です。"
    },
    {
        "id": "R4-26-d",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ネットワーク型RTK法による境界測量で2セット観測を行った。境界点の座標値には",
                "type": "static"
            },
            {
                "text": "1セット目の観測値を採用し",
                "type": "interactive",
                "options": [
                    "1セット目の観測値を採用し",
                    "両セットの平均値を採用し",
                    "2セット目の観測値を採用し"
                ],
                "correctAnswer": "両セットの平均値を採用し"
            },
            {
                "text": "、もう一方は点検値とした。",
                "type": "static"
            }
        ],
        "explanation": "2セット観測を行う場合、精度向上のため、通常は「両方の観測値の平均値」を成果として採用します。"
    },
    {
        "id": "R4-28-e",
        "genre": "応用測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "深浅測量における水深の測定は、原則として",
                "type": "static"
            },
            {
                "text": "音響測深機",
                "type": "interactive",
                "options": [
                    "音響測深機",
                    "電波式水位計",
                    "レーザ測距儀"
                ],
                "correctAnswer": "音響測深機"
            },
            {
                "text": "を用いて行う。",
                "type": "static"
            }
        ],
        "explanation": "水深を測るための標準機器は、音波の反射を利用する「音響測深機（エコーサウンダー）」です。"
    },
    {
        "id": "R3-01-c",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量業者の登録の有効期間は",
                "type": "static"
            },
            {
                "text": "3年",
                "type": "interactive",
                "options": [
                    "3年",
                    "5年",
                    "1年"
                ],
                "correctAnswer": "5年"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "測量法第55条の3により、測量業者の登録有効期間は「5年」と定められています。"
    },
    {
        "id": "R3-03-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "JPGISに準拠した製品仕様書は、作業規程にしたがってデータを作成する場合であっても、",
                "type": "static"
            },
            {
                "text": "省略することができる",
                "type": "interactive",
                "options": [
                    "省略することができる",
                    "省略することはできない",
                    "簡略化できる"
                ],
                "correctAnswer": "省略することはできない"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "製品仕様書は、データの品質や内容を定義する重要な文書であり、JPGISに準拠する公共測量においては作成を省略することはできません。"
    },
    {
        "id": "R3-06-a",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量及び公共測量における位置は、原則として地理学的経緯度及び",
                "type": "static"
            },
            {
                "text": "楕円体からの高さ",
                "type": "interactive",
                "options": [
                    "楕円体からの高さ",
                    "平均海面からの高さ",
                    "地心直交座標"
                ],
                "correctAnswer": "平均海面からの高さ"
            },
            {
                "text": "で表示する。",
                "type": "static"
            }
        ],
        "explanation": "測量法第11条の規定です。位置の表示は原則として「経緯度」と「標高（平均海面からの高さ）」を用います。楕円体高は原則的な表示方法ではありません。"
    },
    {
        "id": "R3-06-b",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ジオイドとは、地球の重力の",
                "type": "static"
            },
            {
                "text": "大きさが常に等しい面",
                "type": "interactive",
                "options": [
                    "大きさが常に等しい面",
                    "ポテンシャルが等しい面",
                    "方向が常に一定の面"
                ],
                "correctAnswer": "ポテンシャルが等しい面"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "ジオイドは「等重力ポテンシャル面」です。重力の「大きさ（強さ）」は場所によって異なります（赤道と極でも違う）が、ポテンシャル（水準的な高さエネルギー）は一定です。"
    },
    {
        "id": "R3-07-1",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "3級・4級基準点測量において、同級の基準点を既知点とする場合、その数は使用する既知点数の",
                "type": "static"
            },
            {
                "text": "4分の3以下",
                "type": "interactive",
                "options": [
                    "4分の3以下",
                    "2分の1以下",
                    "3分の1以下"
                ],
                "correctAnswer": "2分の1以下"
            },
            {
                "text": "とする。",
                "type": "static"
            }
        ],
        "explanation": "精度を維持するため、下位等級の基準点測量で同級の基準点を既知点として使える割合は「全体の半分（1/2）以下」に制限されています。"
    },
    {
        "id": "R3-09-c",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "GNSS測量において、",
                "type": "static"
            },
            {
                "text": "電離層",
                "type": "interactive",
                "options": [
                    "電離層",
                    "対流圏",
                    "成層圏"
                ],
                "correctAnswer": "電離層"
            },
            {
                "text": "における電波の伝搬遅延に起因する誤差は、2周波の観測により軽減することができる。",
                "type": "static"
            }
        ],
        "explanation": "電離層遅延は周波数に依存する性質があるため、異なる2つの周波数（L1帯とL2帯など）の差を利用することで消去・軽減できます。対流圏遅延はこの方法では消去できません。"
    },
    {
        "id": "R3-11-4",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量では、スタティック法により、",
                "type": "static"
            },
            {
                "text": "2時間以上を標準とした",
                "type": "interactive",
                "options": [
                    "2時間以上を標準とした",
                    "観測距離に応じた時間の",
                    "24時間の"
                ],
                "correctAnswer": "観測距離に応じた時間の"
            },
            {
                "text": "GNSS観測を行う必要がある。",
                "type": "static"
            }
        ],
        "explanation": "GNSS水準測量の観測時間は、一律に「2時間以上」とは決まっていません。観測距離（基線長）に応じて必要な時間が定められています。"
    },
    {
        "id": "R3-12-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "1級水準測量において再測を行った場合、往復観測における",
                "type": "static"
            },
            {
                "text": "同方向の観測値を採用する",
                "type": "interactive",
                "options": [
                    "同方向の観測値を採用する",
                    "平均値を採用する",
                    "往路の値を採用する"
                ],
                "correctAnswer": "平均値を採用する"
            },
            {
                "text": "ものとする。",
                "type": "static"
            }
        ],
        "explanation": "再測を行った場合、精度管理上問題がなければ、通常は観測値の「平均値」などを採用します。「同方向」の値だけ採用すると、定誤差（系統誤差）が残る可能性があるため不適切です。"
    },
    {
        "id": "R3-16-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量により作成する数値地形図データの地図情報レベルは、",
                "type": "static"
            },
            {
                "text": "1000",
                "type": "interactive",
                "options": [
                    "1000",
                    "500",
                    "2500"
                ],
                "correctAnswer": "500"
            },
            {
                "text": "が標準である。",
                "type": "static"
            }
        ],
        "explanation": "地上レーザ測量は非常に高密度なデータを取得できるため、より大縮尺（高精度）な「地図情報レベル500」等の作成に適しています。"
    },
    {
        "id": "R3-16-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量における斜面に対する観測の方向は、地形の",
                "type": "static"
            },
            {
                "text": "高い方から低い方へ",
                "type": "interactive",
                "options": [
                    "高い方から低い方へ",
                    "低い方から高い方へ",
                    "水平方向へ"
                ],
                "correctAnswer": "低い方から高い方へ"
            },
            {
                "text": "の向きを原則とする。",
                "type": "static"
            }
        ],
        "explanation": "レーザ測量では死角を減らすことが重要です。高い場所から見下ろすと足元の地形が陰になりやすいため、低い場所から見上げるように観測するのが原則です。"
    },
    {
        "id": "R3-17-5",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "車載写真レーザ測量(MMS)において、道路縁内外にかかわらず、得られた観測データは",
                "type": "static"
            },
            {
                "text": "すべて数値図化する",
                "type": "interactive",
                "options": [
                    "すべて数値図化する",
                    "精度確認範囲内を図化する",
                    "道路縁のみ図化する"
                ],
                "correctAnswer": "精度確認範囲内を図化する"
            },
            {
                "text": "ことを標準とする。",
                "type": "static"
            }
        ],
        "explanation": "MMSは車両から計測するため、道路から離れるほど精度が落ちたり、障害物で見えなくなったりします。無条件に「すべて」図化するのではなく、精度が確保できる範囲を対象とします。"
    },
    {
        "id": "R3-18-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "人工衛星による熱赤外線のリモートセンシングでは、電磁波を照射し反射の強さを観測するため、",
                "type": "static"
            },
            {
                "text": "夜間も観測できる",
                "type": "interactive",
                "options": [
                    "夜間も観測できる",
                    "夜間は観測できない",
                    "曇天時のみ観測できる"
                ],
                "correctAnswer": "夜間も観測できる"
            },
            {
                "text": "（※注：記述全体としての正誤を判定）。",
                "type": "static"
            }
        ],
        "explanation": "熱赤外線センサは対象物自体が出す熱を捉える「受動型」です。自ら電磁波を照射するわけではありません（照射するのはレーザやマイクロ波）。ただし、熱を捉えるため「夜間も観測できる」という結果自体は正しいですが、仕組みの説明（照射する）が誤りです。"
    },
    {
        "id": "R3-18-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "人工衛星から観測した衛星画像は、高度が非常に高いため、",
                "type": "static"
            },
            {
                "text": "オルソ画像となる",
                "type": "interactive",
                "options": [
                    "オルソ画像となる",
                    "中心投影画像となる",
                    "正射投影画像となる"
                ],
                "correctAnswer": "中心投影画像となる"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "衛星画像であっても、地形の起伏による歪みやレンズ（センサ）の幾何学的特性を持つため、そのままでは地図と重なる「オルソ画像（正射投影）」にはなりません。"
    },
    {
        "id": "R3-06-a",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量及び公共測量における位置は、原則として地理学的経緯度及び",
                "type": "static"
            },
            {
                "text": "楕円体からの高さ",
                "type": "interactive",
                "options": [
                    "楕円体からの高さ",
                    "平均海面からの高さ",
                    "地心直交座標"
                ],
                "correctAnswer": "平均海面からの高さ"
            },
            {
                "text": "で表示する。",
                "type": "static"
            }
        ],
        "explanation": "測量法第11条の規定です。位置の表示は原則として「経緯度」と「標高（平均海面からの高さ）」を用います。楕円体高は原則的な表示方法ではありません。"
    },
    {
        "id": "R3-06-b",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ジオイドとは、地球の重力の",
                "type": "static"
            },
            {
                "text": "大きさが常に等しい面",
                "type": "interactive",
                "options": [
                    "大きさが常に等しい面",
                    "ポテンシャルが等しい面",
                    "方向が常に一定の面"
                ],
                "correctAnswer": "ポテンシャルが等しい面"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "ジオイドは「等重力ポテンシャル面」です。重力の「大きさ（強さ）」は場所によって異なります（赤道と極でも違う）が、ポテンシャル（水準的な高さエネルギー）は一定です。"
    },
    {
        "id": "R3-07-1",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "3級・4級基準点測量において、同級の基準点を既知点とする場合、その数は使用する既知点数の",
                "type": "static"
            },
            {
                "text": "4分の3以下",
                "type": "interactive",
                "options": [
                    "4分の3以下",
                    "2分の1以下",
                    "3分の1以下"
                ],
                "correctAnswer": "2分の1以下"
            },
            {
                "text": "とする。",
                "type": "static"
            }
        ],
        "explanation": "精度を維持するため、下位等級の基準点測量で同級の基準点を既知点として使える割合は「全体の半分（1/2）以下」に制限されています。"
    },
    {
        "id": "R3-09-c",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "GNSS測量において、",
                "type": "static"
            },
            {
                "text": "電離層",
                "type": "interactive",
                "options": [
                    "電離層",
                    "対流圏",
                    "成層圏"
                ],
                "correctAnswer": "電離層"
            },
            {
                "text": "における電波の伝搬遅延に起因する誤差は、2周波の観測により軽減することができる。",
                "type": "static"
            }
        ],
        "explanation": "電離層遅延は周波数に依存する性質があるため、異なる2つの周波数（L1帯とL2帯など）の差を利用することで消去・軽減できます。対流圏遅延はこの方法では消去できません。"
    },
    {
        "id": "R3-11-4",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量では、スタティック法により、",
                "type": "static"
            },
            {
                "text": "2時間以上を標準とした",
                "type": "interactive",
                "options": [
                    "2時間以上を標準とした",
                    "観測距離に応じた時間の",
                    "24時間の"
                ],
                "correctAnswer": "観測距離に応じた時間の"
            },
            {
                "text": "GNSS観測を行う必要がある。",
                "type": "static"
            }
        ],
        "explanation": "GNSS水準測量の観測時間は、一律に「2時間以上」とは決まっていません。観測距離（基線長）に応じて必要な時間が定められています。"
    },
    {
        "id": "R3-12-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "1級水準測量において再測を行った場合、往復観測における",
                "type": "static"
            },
            {
                "text": "同方向の観測値を採用する",
                "type": "interactive",
                "options": [
                    "同方向の観測値を採用する",
                    "平均値を採用する",
                    "往路の値を採用する"
                ],
                "correctAnswer": "平均値を採用する"
            },
            {
                "text": "ものとする。",
                "type": "static"
            }
        ],
        "explanation": "再測を行った場合、精度管理上問題がなければ、通常は観測値の「平均値」などを採用します。「同方向」の値だけ採用すると、定誤差（系統誤差）が残る可能性があるため不適切です。"
    },
    {
        "id": "R3-16-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量により作成する数値地形図データの地図情報レベルは、",
                "type": "static"
            },
            {
                "text": "1000",
                "type": "interactive",
                "options": [
                    "1000",
                    "500",
                    "2500"
                ],
                "correctAnswer": "500"
            },
            {
                "text": "が標準である。",
                "type": "static"
            }
        ],
        "explanation": "地上レーザ測量は非常に高密度なデータを取得できるため、より大縮尺（高精度）な「地図情報レベル500」等の作成に適しています。"
    },
    {
        "id": "R3-16-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量における斜面に対する観測の方向は、地形の",
                "type": "static"
            },
            {
                "text": "高い方から低い方へ",
                "type": "interactive",
                "options": [
                    "高い方から低い方へ",
                    "低い方から高い方へ",
                    "水平方向へ"
                ],
                "correctAnswer": "低い方から高い方へ"
            },
            {
                "text": "の向きを原則とする。",
                "type": "static"
            }
        ],
        "explanation": "レーザ測量では死角を減らすことが重要です。高い場所から見下ろすと足元の地形が陰になりやすいため、低い場所から見上げるように観測するのが原則です。"
    },
    {
        "id": "R3-17-5",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "車載写真レーザ測量(MMS)において、道路縁内外にかかわらず、得られた観測データは",
                "type": "static"
            },
            {
                "text": "すべて数値図化する",
                "type": "interactive",
                "options": [
                    "すべて数値図化する",
                    "精度確認範囲内を図化する",
                    "道路縁のみ図化する"
                ],
                "correctAnswer": "精度確認範囲内を図化する"
            },
            {
                "text": "ことを標準とする。",
                "type": "static"
            }
        ],
        "explanation": "MMSは車両から計測するため、道路から離れるほど精度が落ちたり、障害物で見えなくなったりします。無条件に「すべて」図化するのではなく、精度が確保できる範囲を対象とします。"
    },
    {
        "id": "R3-18-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "人工衛星による熱赤外線のリモートセンシングでは、電磁波を照射し反射の強さを観測するため、",
                "type": "static"
            },
            {
                "text": "夜間も観測できる",
                "type": "interactive",
                "options": [
                    "夜間も観測できる",
                    "夜間は観測できない",
                    "曇天時のみ観測できる"
                ],
                "correctAnswer": "夜間も観測できる"
            },
            {
                "text": "（※注：記述全体としての正誤を判定）。",
                "type": "static"
            }
        ],
        "explanation": "熱赤外線センサは対象物自体が出す熱を捉える「受動型」です。自ら電磁波を照射するわけではありません（照射するのはレーザやマイクロ波）。ただし、熱を捉えるため「夜間も観測できる」という結果自体は正しいですが、仕組みの説明（照射する）が誤りです。"
    },
    {
        "id": "R3-18-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "人工衛星から観測した衛星画像は、高度が非常に高いため、",
                "type": "static"
            },
            {
                "text": "オルソ画像となる",
                "type": "interactive",
                "options": [
                    "オルソ画像となる",
                    "中心投影画像となる",
                    "正射投影画像となる"
                ],
                "correctAnswer": "中心投影画像となる"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "衛星画像であっても、地形の起伏による歪みやレンズ（センサ）の幾何学的特性を持つため、そのままでは地図と重なる「オルソ画像（正射投影）」にはなりません。"
    },
    {
        "id": "R3-20-c",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "航空レーザ測量において、三次元計測データの点検及び調整を行うための調整用基準点は、標準で",
                "type": "static"
            },
            {
                "text": "5点",
                "type": "interactive",
                "options": [
                    "5点",
                    "3点",
                    "1点"
                ],
                "correctAnswer": "5点"
            },
            {
                "text": "必要となる。",
                "type": "static"
            }
        ],
        "explanation": "航空レーザ測量では、四隅と中央付近でデータの歪みを補正するため、調整用基準点は標準で「5点」必要とされています。"
    },
    {
        "id": "R3-22-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地図上において、正角図法と正積図法の性質を同時に満足させることは理論的に",
                "type": "static"
            },
            {
                "text": "可能である",
                "type": "interactive",
                "options": [
                    "可能である",
                    "不可能である",
                    "条件付きで可能である"
                ],
                "correctAnswer": "不可能である"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "「形を保つ（正角）」ことと「面積を保つ（正積）」ことは、平面地図にする際の数学的なトレードオフの関係にあり、両立させることはできません。"
    },
    {
        "id": "R3-22-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "正距方位図法で作成された地図は、地図上で選んだ",
                "type": "static"
            },
            {
                "text": "どの点においても",
                "type": "interactive",
                "options": [
                    "どの点においても",
                    "中心点からのみ",
                    "赤道上においてのみ"
                ],
                "correctAnswer": "中心点からのみ"
            },
            {
                "text": "距離と方位が正しく表現されている。",
                "type": "static"
            }
        ],
        "explanation": "正距方位図法において、距離と方位が正しいのは「中心点から」の他の地点に対してのみです。任意の2点間ではありません。"
    },
    {
        "id": "R3-24-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基盤地図情報に係る項目は、測量の基準点、海岸線、道路縁など、",
                "type": "static"
            },
            {
                "text": "6項目",
                "type": "interactive",
                "options": [
                    "6項目",
                    "13項目",
                    "20項目"
                ],
                "correctAnswer": "13項目"
            },
            {
                "text": "が定められている。",
                "type": "static"
            }
        ],
        "explanation": "基盤地図情報の項目は、海岸線、道路縁、建築物の外周線など全部で「13項目」が定められています。"
    },
    {
        "id": "R3-24-e",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基盤地図情報を整備・更新する場合は、既存の成果がある場合でも、",
                "type": "static"
            },
            {
                "text": "新規で作成する",
                "type": "interactive",
                "options": [
                    "新規で作成する",
                    "既存の成果を活用する",
                    "衛星画像のみを使用する"
                ],
                "correctAnswer": "既存の成果を活用する"
            },
            {
                "text": "ことが推奨されている。",
                "type": "static"
            }
        ],
        "explanation": "基盤地図情報の整備方針として、コスト削減と効率化のため、既存の測量成果や図面等を最大限に「活用」することが推奨されています。"
    },
    {
        "id": "R3-25-3",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "密な樹木に覆われた山地において、断面図作成のための地盤データを取得するために、",
                "type": "static"
            },
            {
                "text": "UAV写真測量",
                "type": "interactive",
                "options": [
                    "UAV写真測量",
                    "航空レーザ測量",
                    "衛星画像解析"
                ],
                "correctAnswer": "航空レーザ測量"
            },
            {
                "text": "を採用した。",
                "type": "static"
            }
        ],
        "explanation": "写真測量では樹木に遮られて地盤（地面）が見えないため、正確な地形データが取得できません。樹木の間を透過できる「レーザ測量」が適しています。"
    },
    {
        "id": "R3-26-5",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "用地測量における面積計算は、原則として",
                "type": "static"
            },
            {
                "text": "倍横距法",
                "type": "interactive",
                "options": [
                    "倍横距法",
                    "座標法",
                    "三斜法"
                ],
                "correctAnswer": "座標法"
            },
            {
                "text": "により行う。",
                "type": "static"
            }
        ],
        "explanation": "現在、用地測量の面積計算は、各筆の境界点座標を用いた「座標法」で行うことが原則とされています。"
    },
    {
        "id": "R2-01-b",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "「基本測量及び公共測量以外の測量」とは、基本測量及び公共測量の測量成果",
                "type": "static"
            },
            {
                "text": "以外を使用して",
                "type": "interactive",
                "options": [
                    "以外を使用して",
                    "を使用して",
                    "を使用せずに"
                ],
                "correctAnswer": "を使用して"
            },
            {
                "text": "実施する測量をいう。",
                "type": "static"
            }
        ],
        "explanation": "測量法第6条の定義により、「以外の測量」とは、基本測量または公共測量の測量成果を「使用して」実施する測量を指します。成果を使わない測量は測量法の規制対象外です。"
    },
    {
        "id": "R2-01-d",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公共測量を実施する者は、当該測量を実施するために必要な情報の提供を",
                "type": "static"
            },
            {
                "text": "関係都道府県知事",
                "type": "interactive",
                "options": [
                    "関係都道府県知事",
                    "関係市町村長",
                    "国土地理院の長"
                ],
                "correctAnswer": "関係市町村長"
            },
            {
                "text": "に対して求めることができる。",
                "type": "static"
            }
        ],
        "explanation": "測量に必要な情報の提供を求める窓口は、現場に最も近い行政機関である「関係市町村長」等です。"
    },
    {
        "id": "R2-03-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "JPGISにおいて、品質の要求・評価・報告の方式については、",
                "type": "static"
            },
            {
                "text": "日本版メタデータプロファイル(JMP2.0)",
                "type": "interactive",
                "options": [
                    "日本版メタデータプロファイル(JMP2.0)",
                    "ISO 19157 (地理情報-データ品質)",
                    "XML仕様書"
                ],
                "correctAnswer": "ISO 19157 (地理情報-データ品質)"
            },
            {
                "text": "に準拠しなければならない。",
                "type": "static"
            }
        ],
        "explanation": "データの品質評価に関する規定は、ISO 19157等の品質規格に従います。JMP2.0はデータの「メタデータ（目録情報）」の記述ルールです。"
    },
    {
        "id": "R2-06-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量の原点は、日本経緯度原点及び日本水準原点が",
                "type": "static"
            },
            {
                "text": "唯一である",
                "type": "interactive",
                "options": [
                    "唯一である",
                    "原則である",
                    "使用されない"
                ],
                "correctAnswer": "原則である"
            },
            {
                "text": "（※離島等では他の原点が認められる）。",
                "type": "static"
            }
        ],
        "explanation": "原則は日本経緯度原点・水準原点ですが、離島など地理的に隔絶された場所では、国土地理院の長の承認を得て別の原点を定めることができます。「唯一」ではありません。"
    },
    {
        "id": "R2-06-e",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量における位置は、",
                "type": "static"
            },
            {
                "text": "天文経緯度",
                "type": "interactive",
                "options": [
                    "天文経緯度",
                    "地理学的経緯度",
                    "地心経緯度"
                ],
                "correctAnswer": "地理学的経緯度"
            },
            {
                "text": "及び平均海面からの高さで表示する。",
                "type": "static"
            }
        ],
        "explanation": "測量の基準となる経緯度は「地理学的経緯度」です。天文経緯度は重力方向（鉛直線）を基準とするもので、地図の基準とは異なります。"
    },
    {
        "id": "R2-09-4",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "RTK法では、GNSS衛星からの信号を同時に受信し、",
                "type": "static"
            },
            {
                "text": "固定局側",
                "type": "interactive",
                "options": [
                    "固定局側",
                    "移動局側",
                    "配信事業者側"
                ],
                "correctAnswer": "移動局側"
            },
            {
                "text": "において即時に基線解析を行う。",
                "type": "static"
            }
        ],
        "explanation": "RTK法では、固定局の観測データを移動局に送信し、計算処理は「移動局（ローバー）」側で行います。"
    },
    {
        "id": "R2-11-c",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS水準測量では、国土地理院が提供するジオイド・モデルを用いることにより、",
                "type": "static"
            },
            {
                "text": "2級水準点",
                "type": "interactive",
                "options": [
                    "2級水準点",
                    "3級水準点",
                    "1級水準点"
                ],
                "correctAnswer": "3級水準点"
            },
            {
                "text": "が設置できる。",
                "type": "static"
            }
        ],
        "explanation": "GNSS水準測量は、直接水準測量に比べて精度が劣るため、設置できるのは「3級水準点」までです。"
    },
    {
        "id": "R2-14-2",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ネットワーク型RTK法の単点観測法によりTS点を設置する場合、整合を確認する既知点数は",
                "type": "static"
            },
            {
                "text": "1点",
                "type": "interactive",
                "options": [
                    "1点",
                    "2点",
                    "不要"
                ],
                "correctAnswer": "2点"
            },
            {
                "text": "を標準とする。",
                "type": "static"
            }
        ],
        "explanation": "ネットワーク型RTK観測の現場検定（整合確認）では、座標のズレや回転を検出するため、既知点「2点以上」での確認が求められます。"
    },
    {
        "id": "R2-16-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "地上レーザスキャナから同じ水平距離内においては、上り斜面（こちらを向いている面）よりも",
                "type": "static"
            },
            {
                "text": "下り斜面",
                "type": "interactive",
                "options": [
                    "下り斜面",
                    "上り斜面",
                    "垂直な壁面"
                ],
                "correctAnswer": "上り斜面"
            },
            {
                "text": "に向けて観測を行った場合のほうが、多くの観測点を得ることができる。",
                "type": "static"
            }
        ],
        "explanation": "レーザ測量では、レーザ光が斜面に正対に近い角度で当たる「上り斜面」の方が反射を捉えやすく、データ密度が高くなります。「下り斜面（逃げる面）」はデータが粗くなります。"
    },
    {
        "id": "R2-19-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "建物の倒れ込みの影響の少ない写真地図を作成するためには、隣接写真との重複度が",
                "type": "static"
            },
            {
                "text": "小さくなるように",
                "type": "interactive",
                "options": [
                    "小さくなるように",
                    "大きくなるように",
                    "ゼロになるように"
                ],
                "correctAnswer": "大きくなるように"
            },
            {
                "text": "撮影計画を立てるとよい。",
                "type": "static"
            }
        ],
        "explanation": "写真の中心付近（鉛直に近い部分）のみを使うことで倒れ込みを軽減できます。そのためには、写真の枚数を増やして重複度を「大きく」する必要があります。"
    },
    {
        "id": "R2-19-d",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "数値地形モデル(DTM)の作成において、水面の標高は、周辺陸域の最近傍値からの",
                "type": "static"
            },
            {
                "text": "内挿処理によって求める",
                "type": "interactive",
                "options": [
                    "内挿処理によって求める",
                    "一定値（平ら）とする",
                    "ゼロとする"
                ],
                "correctAnswer": "一定値（平ら）とする"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "水面は物理的に平ら（または一定の勾配）であるため、陸地のように凸凹を内挿計算するのではなく、水際の値を用いて「平ら」に整形します。"
    },
    {
        "id": "R2-20-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "航空レーザ測量における航空機の位置は、地上固定局との基線解析を",
                "type": "static"
            },
            {
                "text": "スタティック法",
                "type": "interactive",
                "options": [
                    "スタティック法",
                    "キネマティック法",
                    "単独測位法"
                ],
                "correctAnswer": "キネマティック法"
            },
            {
                "text": "により行い求める。",
                "type": "static"
            }
        ],
        "explanation": "航空機は移動しているため、移動体の位置を決定する「キネマティック法（干渉測位）」を用います。スタティック法は静止測量の手法です。"
    },
    {
        "id": "R2-20-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "航空レーザ用数値写真の撮影範囲は必要に応じて設定し、計測対象地域の",
                "type": "static"
            },
            {
                "text": "80%を標準とする",
                "type": "interactive",
                "options": [
                    "80%を標準とする",
                    "全域（100%）とする",
                    "50%程度とする"
                ],
                "correctAnswer": "全域（100%）とする"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "航空レーザ測量と同時に撮影する写真は、地物の確認や解析の補助に使用するため、計測対象地域の「全域」をカバーする必要があります。"
    },
    {
        "id": "R2-24-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公共測量に使用する基盤地図情報の整備に、他の公共測量成果が使用されていたとしても、元の計画機関に対して使用承認申請を",
                "type": "static"
            },
            {
                "text": "行わなければならない",
                "type": "interactive",
                "options": [
                    "行わなければならない",
                    "行う必要はない",
                    "事後報告でよい"
                ],
                "correctAnswer": "行う必要はない"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "基盤地図情報は、円滑な流通・利用を目的として整備されたデータであり、公共測量で使用する場合でも、原典となった測量の計画機関への使用承認申請は不要とされています（国土地理院への申請も不要な場合が多いですが、規定を確認）。"
    },
    {
        "id": "R2-26-1",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公図等転写連続図の作成において、隣接する公図間の境界線が整合しない部分があったため、接合部が合致するように",
                "type": "static"
            },
            {
                "text": "字界を編集した",
                "type": "interactive",
                "options": [
                    "字界を編集した",
                    "そのまま転写した",
                    "平均値をとった"
                ],
                "correctAnswer": "そのまま転写した"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "公図の転写においては、たとえ不整合（ズレ）があっても、測量作業者が勝手に図面を編集・修正することは許されません。ありのままを転写します。"
    },
    {
        "id": "R2-28-1",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "河川測量において、距離標の標高や、堤防の変化点・主要な構造物の地盤高を測定する作業は、",
                "type": "static"
            },
            {
                "text": "定期縦断測量",
                "type": "interactive",
                "options": [
                    "定期縦断測量",
                    "定期横断測量",
                    "深浅測量"
                ],
                "correctAnswer": "定期横断測量"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "堤防の形状（法肩、法尻など）や河川敷の地盤高を、距離標からの距離とともに測定するのは「横断測量」の内容です。縦断測量は河川の中心線に沿った高さを測ります。"
    },
    {
        "id": "R1-01-e",
        "genre": "法規等",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "基本測量の測量成果及び測量記録の謄本交付を受けようとする者は、",
                "type": "static"
            },
            {
                "text": "国土交通大臣",
                "type": "interactive",
                "options": [
                    "国土交通大臣",
                    "国土地理院の長",
                    "都道府県知事"
                ],
                "correctAnswer": "国土地理院の長"
            },
            {
                "text": "に申請をしなければならない。",
                "type": "static"
            }
        ],
        "explanation": "測量法第28条により、基本測量の成果等の交付申請先は「国土地理院の長」です。"
    },
    {
        "id": "R1-02-d",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "ITRF（国際地球基準座標系）で表される三次元直交座標(X, Y, Z)のZの値は、",
                "type": "static"
            },
            {
                "text": "標高である",
                "type": "interactive",
                "options": [
                    "標高である",
                    "地心からのZ軸成分である",
                    "楕円体高である"
                ],
                "correctAnswer": "地心からのZ軸成分である"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "ITRFは地球重心を原点とする「三次元直交座標系」です。Z座標は赤道面から北極方向への距離成分であり、海面からの高さ（標高）とは全く別の数値です。"
    },
    {
        "id": "R1-03-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "JPGISで定義する概念スキーマは、",
                "type": "static"
            },
            {
                "text": "HTML",
                "type": "interactive",
                "options": [
                    "HTML",
                    "UML",
                    "CSV"
                ],
                "correctAnswer": "UML"
            },
            {
                "text": "を使用して記述する。",
                "type": "static"
            }
        ],
        "explanation": "JPGISにおける概念スキーマ（データ構造の設計図）は、「UML（統一モデリング言語）」を用いて記述されます。Webページを作るHTMLではありません。"
    },
    {
        "id": "R1-06-e",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "測量法で規定する回転楕円体は、その中心が地球の重心と一致し、その",
                "type": "static"
            },
            {
                "text": "長軸",
                "type": "interactive",
                "options": [
                    "長軸",
                    "短軸",
                    "赤道軸"
                ],
                "correctAnswer": "短軸"
            },
            {
                "text": "が地球の自転軸と一致するものである。",
                "type": "static"
            }
        ],
        "explanation": "地球の自転軸と一致するのは、回転楕円体の「短軸（南北の軸）」です。長軸は赤道面の半径に相当します。"
    },
    {
        "id": "R1-09-1",
        "genre": "基準点測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "GNSS測量において、",
                "type": "static"
            },
            {
                "text": "対流圏",
                "type": "interactive",
                "options": [
                    "対流圏",
                    "電離層",
                    "成層圏"
                ],
                "correctAnswer": "電離層"
            },
            {
                "text": "における電波伝搬遅延誤差は、2周波の観測により軽減することができる。",
                "type": "static"
            }
        ],
        "explanation": "2周波観測（周波数による屈折率の違いを利用）で消去できるのは「電離層」の遅延です。対流圏遅延は2周波では消去できず、モデル式などで補正します。"
    },
    {
        "id": "R1-12-a",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "標尺の零目盛が正しくないために生じる「零点誤差」は、レベルの設置回数（測点数）を",
                "type": "static"
            },
            {
                "text": "偶数回",
                "type": "interactive",
                "options": [
                    "偶数回",
                    "奇数回",
                    "制限なし"
                ],
                "correctAnswer": "偶数回"
            },
            {
                "text": "にすることで消去できる。",
                "type": "static"
            }
        ],
        "explanation": "往復観測において測点数を偶数にすると、往路と復路で標尺の使用回数が釣り合い、零点誤差（底面の摩耗等によるズレ）がプラスマイナスで相殺されます。"
    },
    {
        "id": "R1-12-c",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "レベルの視準線と気泡管軸が平行でないために生じる「視準線誤差」は、前視・後視の",
                "type": "static"
            },
            {
                "text": "視準距離を等しくする",
                "type": "interactive",
                "options": [
                    "視準距離を等しくする",
                    "標尺を交換する",
                    "三脚を回転させる"
                ],
                "correctAnswer": "視準距離を等しくする"
            },
            {
                "text": "ことで消去できる。",
                "type": "static"
            }
        ],
        "explanation": "視準線が傾いていても、レベルから標尺までの距離が同じであれば、前視と後視で生じる誤差の量が同じになり、高低差（引き算）を計算する際に相殺されて消去できます。"
    },
    {
        "id": "R1-15-1",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "トータルステーション(TS)による地形・地物の測定を行う場合は、",
                "type": "static"
            },
            {
                "text": "必ずRTK法を併用する",
                "type": "interactive",
                "options": [
                    "必ずRTK法を併用する",
                    "RTK法の併用は必須ではない",
                    "GNSS測量は禁止される"
                ],
                "correctAnswer": "RTK法の併用は必須ではない"
            },
            {
                "text": "必要がある。",
                "type": "static"
            }
        ],
        "explanation": "TSのみで地形測量を行うことも可能です。RTK法（GNSS）の併用は効率化の手段の一つであり、必須義務ではありません。"
    },
    {
        "id": "R1-16-a",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "地上レーザ測量では、レーザスキャナで取得された高密度の標高値群とその",
                "type": "static"
            },
            {
                "text": "反射強度",
                "type": "interactive",
                "options": [
                    "反射強度",
                    "波長",
                    "温度"
                ],
                "correctAnswer": "反射強度"
            },
            {
                "text": "を基に、地物などの識別や描画を行っていく。",
                "type": "static"
            }
        ],
        "explanation": "レーザの反射強度（インテンシティ）は、対象物の材質や色によって異なります。これを利用して、道路の白線やアスファルトなどを識別しやすくします。"
    },
    {
        "id": "R1-19-3",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "UAV写真測量において、撮影対象の比高が大きく変化する場合、撮影基準面は",
                "type": "static"
            },
            {
                "text": "地域全体で一定とする",
                "type": "interactive",
                "options": [
                    "地域全体で一定とする",
                    "数コース単位に変更できる",
                    "自動的に調整される"
                ],
                "correctAnswer": "数コース単位に変更できる"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "地表の起伏（比高）が大きい場合、一定高度で飛ぶと画素寸法（解像度）や重複度がバラついてしまいます。地形に合わせて基準面（飛行高度）を調整することが認められています。"
    },
    {
        "id": "R1-20-a",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "光学センサ（可視光など）で使用する電磁波の波長は、マイクロ波センサで使用するものより",
                "type": "static"
            },
            {
                "text": "長いため",
                "type": "interactive",
                "options": [
                    "長いため",
                    "短いため",
                    "同じであるため"
                ],
                "correctAnswer": "短いため"
            },
            {
                "text": "、雲の影響を受けやすい。",
                "type": "static"
            }
        ],
        "explanation": "可視光や近赤外線の波長（μmオーダー）は、マイクロ波（cmオーダー）よりも圧倒的に「短い」です。波長が短いと雲の粒子に遮られやすく、透過できません。"
    },
    {
        "id": "R1-20-c",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "合成開口レーダ(SAR)において、Xバンド（約3cm）はLバンド（約24cm）より波長が",
                "type": "static"
            },
            {
                "text": "長く",
                "type": "interactive",
                "options": [
                    "長く",
                    "短く",
                    "同じで"
                ],
                "correctAnswer": "短く"
            },
            {
                "text": "、樹木などを透過しにくい。",
                "type": "static"
            }
        ],
        "explanation": "Xバンドは波長が短く、木の葉などで反射しやすいです。Lバンドは波長が長く、葉を透過して地面や幹まで届きやすい特徴があります。"
    },
    {
        "id": "R1-22-b",
        "genre": "地図・GIS",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "世界全体や大陸規模のような広い範囲における植生、人口などの分布図・密度図を示す場合に用いられるのは、",
                "type": "static"
            },
            {
                "text": "正距図法",
                "type": "interactive",
                "options": [
                    "正距図法",
                    "正積図法",
                    "正角図法"
                ],
                "correctAnswer": "正積図法"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "分布図や密度図では、面積の比率が正しく表現されていることが重要です。したがって「正積図法（モルワイデ図法など）」が適しています。"
    },
    {
        "id": "R1-26-1",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "公図等転写連続図の作成において、隣接する公図間の境界線が整合しない部分があったため、接合部が合致するように",
                "type": "static"
            },
            {
                "text": "字界を編集した",
                "type": "interactive",
                "options": [
                    "字界を編集した",
                    "そのまま転写した",
                    "平均位置をとった"
                ],
                "correctAnswer": "そのまま転写した"
            },
            {
                "text": "。",
                "type": "static"
            }
        ],
        "explanation": "公図（法務局備え付け地図等）を転写する際、たとえ図面間にズレがあっても、測量作業者が勝手に境界線を書き換える（編集する）ことは禁じられています。"
    },
    {
        "id": "R1-28-1",
        "genre": "応用測量",
        "instruction": "次の記述の誤っている部分を訂正しなさい。",
        "segments": [
            {
                "text": "河川の堤防の変化点や主要な構造物について、距離標からの距離及び標高を測定し、横断面図を作成するのは、",
                "type": "static"
            },
            {
                "text": "定期縦断測量",
                "type": "interactive",
                "options": [
                    "定期縦断測量",
                    "定期横断測量",
                    "深浅測量"
                ],
                "correctAnswer": "定期横断測量"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "「距離標からの距離（横方向）」と標高を測り、川を横切る断面図を作るのは「定期横断測量」です。縦断測量は川の流れに沿った測量です。"
    },
    {
        "id": "R7-01-c",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "公共測量を実施する者は、当該測量を実施するために必要な情報の提供を",
                "type": "static"
            },
            {
                "text": "関係市町村長",
                "type": "interactive",
                "options": [
                    "関係市町村長",
                    "都道府県知事",
                    "国土地理院の長"
                ],
                "correctAnswer": "関係市町村長"
            },
            {
                "text": "に対して求めることができる。",
                "type": "static"
            }
        ],
        "explanation": "現場の状況を最もよく知る行政機関として、情報の提供先は「関係市町村長」と定められています。"
    },
    {
        "id": "R7-01-e",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "「測量業」とは、基本測量、公共測量又は基本測量及び公共測量以外の測量を",
                "type": "static"
            },
            {
                "text": "請け負う営業",
                "type": "interactive",
                "options": [
                    "請け負う営業",
                    "自ら行う作業",
                    "管理する業務"
                ],
                "correctAnswer": "請け負う営業"
            },
            {
                "text": "をいう。",
                "type": "static"
            }
        ],
        "explanation": "測量業の定義は、測量を「請け負う（受注して営業する）」ことを指します。自己のために測量を行うことや、単に雇用されて測量することは測量業ではありません。"
    },
    {
        "id": "R7-02-a",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "ITRFにおける地球上の位置は、地球の",
                "type": "static"
            },
            {
                "text": "重心",
                "type": "interactive",
                "options": [
                    "重心",
                    "幾何学的中心",
                    "北極点"
                ],
                "correctAnswer": "重心"
            },
            {
                "text": "を原点とした三次元直交座標で表される。",
                "type": "static"
            }
        ],
        "explanation": "世界測地系（ITRF）の原点は、地球の質量中心である「重心」です。"
    },
    {
        "id": "R7-02-c",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "日本国内の座標をITRF（地心直交座標）で表すと、X座標（経度0度方向）の符号は常に",
                "type": "static"
            },
            {
                "text": "負",
                "type": "interactive",
                "options": [
                    "負",
                    "正",
                    "ゼロ"
                ],
                "correctAnswer": "負"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "日本は東経約135度付近にあり、グリニッジ子午線（X軸プラス方向）の反対側に位置するため、X座標の値はマイナス（負）になります。"
    },
    {
        "id": "R7-04-b",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "現地作業の前に、その作業に伴う危険に関する情報を共有する",
                "type": "static"
            },
            {
                "text": "危険予知活動(KY活動)",
                "type": "interactive",
                "options": [
                    "危険予知活動(KY活動)",
                    "是正処置活動",
                    "品質管理活動"
                ],
                "correctAnswer": "危険予知活動(KY活動)"
            },
            {
                "text": "を行い、安全に対する意識を高めた。",
                "type": "static"
            }
        ],
        "explanation": "作業前のミーティングで危険箇所や対策を話し合う活動を「KY（Kiken Yochi）活動」と呼び、安全管理の基本です。"
    },
    {
        "id": "R7-04-c",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "作業計画に記載している技術者が病気により対応できなくなったため、測量計画機関の",
                "type": "static"
            },
            {
                "text": "承認を得て",
                "type": "interactive",
                "options": [
                    "承認を得て",
                    "許可を得ずに",
                    "事後報告で"
                ],
                "correctAnswer": "承認を得て"
            },
            {
                "text": "作業計画を変更した。",
                "type": "static"
            }
        ],
        "explanation": "主要な技術者の変更など、作業計画の重要な変更には測量計画機関の「承認」が必要です。"
    },
    {
        "id": "R7-06-3",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "測量法で規定する回転楕円体は、その短軸が地球の",
                "type": "static"
            },
            {
                "text": "自転軸",
                "type": "interactive",
                "options": [
                    "自転軸",
                    "赤道軸",
                    "磁軸"
                ],
                "correctAnswer": "自転軸"
            },
            {
                "text": "と一致するものである。",
                "type": "static"
            }
        ],
        "explanation": "回転楕円体の「短軸（南北の軸）」は、地球の自転軸と一致するように定義されています。"
    },
    {
        "id": "R7-06-4",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "地理学的経緯度は、",
                "type": "static"
            },
            {
                "text": "世界測地系",
                "type": "interactive",
                "options": [
                    "世界測地系",
                    "日本測地系",
                    "ベッセル楕円体"
                ],
                "correctAnswer": "世界測地系"
            },
            {
                "text": "に従って測定しなければならない。",
                "type": "static"
            }
        ],
        "explanation": "測量法第11条により、日本の測量は「世界測地系」に基づいて行うことが義務付けられています（かつて使用されていた日本測地系は廃止されました）。"
    },
    {
        "id": "R6-01-b",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "「測量作業機関」とは、測量計画機関の",
                "type": "static"
            },
            {
                "text": "指示又は委託",
                "type": "interactive",
                "options": [
                    "指示又は委託",
                    "許可",
                    "黙認"
                ],
                "correctAnswer": "指示又は委託"
            },
            {
                "text": "を受けて測量作業を実施する者をいう。",
                "type": "static"
            }
        ],
        "explanation": "測量作業機関は、計画機関から仕事を頼まれた（委託された）業者、または指示を受けた部局（直営の場合）を指します。"
    },
    {
        "id": "R6-01-c",
        "genre": "法規等",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "「測量標」とは、永久標識、一時標識及び",
                "type": "static"
            },
            {
                "text": "仮設標識",
                "type": "interactive",
                "options": [
                    "仮設標識",
                    "基準杭",
                    "境界杭"
                ],
                "correctAnswer": "仮設標識"
            },
            {
                "text": "をいう。",
                "type": "static"
            }
        ],
        "explanation": "測量標には、永続的な「永久標識」、一時的な「一時標識」に加え、作業中にのみ使用する「仮設標識」も含まれます。"
    },
    {
        "id": "R6-03-2",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "JPGISでは、応用スキーマで定義された地理空間データを",
                "type": "static"
            },
            {
                "text": "XML形式",
                "type": "interactive",
                "options": [
                    "XML形式",
                    "PDF形式",
                    "UML形式"
                ],
                "correctAnswer": "XML形式"
            },
            {
                "text": "やGML形式で符号化することを推奨している。",
                "type": "static"
            }
        ],
        "explanation": "データの記述（符号化）には、コンピュータ処理に適したマークアップ言語であるXMLやGMLが用いられます。"
    },
    {
        "id": "R6-06-3",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "基本測量及び公共測量において、位置は地理学的経緯度及び平均海面からの高さで表示するほか、場合により",
                "type": "static"
            },
            {
                "text": "地心直交座標",
                "type": "interactive",
                "options": [
                    "地心直交座標",
                    "平面直角座標",
                    "極座標"
                ],
                "correctAnswer": "地心直交座標"
            },
            {
                "text": "等で表示することができる。",
                "type": "static"
            }
        ],
        "explanation": "原則は経緯度と標高ですが、GNSS測量などで用いられる「地心直交座標（XYZ）」や「平面直角座標（XY）」での表示も認められています。"
    },
    {
        "id": "R6-07-5",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "トータルステーションを用いた水平角観測においては、対回内の観測方向数は",
                "type": "static"
            },
            {
                "text": "5方向以下",
                "type": "interactive",
                "options": [
                    "5方向以下",
                    "10方向以下",
                    "制限なし"
                ],
                "correctAnswer": "5方向以下"
            },
            {
                "text": "とする。",
                "type": "static"
            }
        ],
        "explanation": "1回の観測セット（対回）で欲張って多くの点を測ると、時間がかかりすぎて機械が動いたり気象条件が変わったりして精度が落ちるため、5方向までに制限されています。"
    },
    {
        "id": "R6-08-check",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "結合多角方式の点検路線は、",
                "type": "static"
            },
            {
                "text": "既知点と既知点",
                "type": "interactive",
                "options": [
                    "既知点と既知点",
                    "既知点と新点",
                    "新点と新点"
                ],
                "correctAnswer": "既知点と既知点"
            },
            {
                "text": "を結ぶ路線を選択する。",
                "type": "static"
            }
        ],
        "explanation": "精度の点検（答え合わせ）をするためには、座標が分かっている点（既知点）からスタートし、座標が分かっている点（既知点）に到着してズレを確認する必要があります。"
    },
    {
        "id": "R5-06-d",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "平面直角座標系において、座標系のX軸は",
                "type": "static"
            },
            {
                "text": "子午線に一致する軸",
                "type": "interactive",
                "options": [
                    "子午線に一致する軸",
                    "東西方向の軸",
                    "緯度線に平行な軸"
                ],
                "correctAnswer": "子午線に一致する軸"
            },
            {
                "text": "とし、北に向かう値を正とする。",
                "type": "static"
            }
        ],
        "explanation": "数学のグラフ（Xが横、Yが縦）とは異なり、測量の座標系は「Xが縦（北）、Yが横（東）」となります。X軸は子午線（南北線）と一致します。"
    },
    {
        "id": "R5-12-b",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "1級水準測量においては、標尺補正計算および",
                "type": "static"
            },
            {
                "text": "正規正標高補正計算",
                "type": "interactive",
                "options": [
                    "正規正標高補正計算",
                    "楕円体高補正計算",
                    "ジオイド高補正計算"
                ],
                "correctAnswer": "正規正標高補正計算"
            },
            {
                "text": "を行う。",
                "type": "static"
            }
        ],
        "explanation": "水準測量の実用標準的な計算として、重力モデルを用いた「正規正標高補正」が行われます（より厳密な実測重力を使う場合は「正標高補正」）。"
    },
    {
        "id": "R4-09-1",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "GNSS測量において、準天頂衛星（QZSS）は",
                "type": "static"
            },
            {
                "text": "GPS衛星と同等",
                "type": "interactive",
                "options": [
                    "GPS衛星と同等",
                    "GLONASS衛星と同等",
                    "静止衛星と同等"
                ],
                "correctAnswer": "GPS衛星と同等"
            },
            {
                "text": "の衛星として扱うことができる。",
                "type": "static"
            }
        ],
        "explanation": "準天頂衛星システムは、GPSと互換性があるように設計されており、測量においてはGPS衛星が増えたのと同じように扱って計算できます。"
    },
    {
        "id": "R4-18-a",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "高層建物が密集している都市部で、建物による影の少ない写真地図を作成するために、太陽高度の",
                "type": "static"
            },
            {
                "text": "高い時間帯",
                "type": "interactive",
                "options": [
                    "高い時間帯",
                    "低い時間帯",
                    "正午を除く時間帯"
                ],
                "correctAnswer": "高い時間帯"
            },
            {
                "text": "を選んで空中写真撮影を行った。",
                "type": "static"
            }
        ],
        "explanation": "太陽が真上（高い位置）にあるほど、建物の影は短くなります。影による情報の欠損を防ぐため、都市部では正午前後などの太陽高度が高い時間帯が有利です。"
    },
    {
        "id": "R4-22-a",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "地図投影法とは地球を平面に表す方法だが、必ず何らかの",
                "type": "static"
            },
            {
                "text": "ひずみが生じる",
                "type": "interactive",
                "options": [
                    "ひずみが生じる",
                    "ひずみをゼロにできる",
                    "面積だけは正確になる"
                ],
                "correctAnswer": "ひずみが生じる"
            },
            {
                "text": "ため、目的に応じて選択する必要がある。",
                "type": "static"
            }
        ],
        "explanation": "球体を平面に展開する以上、距離・面積・角度の全てを同時に完璧にすることはできません。必ずどこかに歪みが出ます。"
    },
    {
        "id": "R3-04-ans",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "回転行列において、成分の配置が [[cos, sin], [-sin, cos]] の形になっている場合、これは",
                "type": "static"
            },
            {
                "text": "時計回り",
                "type": "interactive",
                "options": [
                    "時計回り",
                    "反時計回り",
                    "点対称"
                ],
                "correctAnswer": "時計回り"
            },
            {
                "text": "の回転（または座標軸の回転）を表す。",
                "type": "static"
            }
        ],
        "explanation": "通常の「反時計回り」の行列は [[cos, -sin], [sin, cos]] です。符号の位置が逆（sinの前がプラス、または転置）になっている場合は「時計回り」です。"
    },
    {
        "id": "R3-14-a",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "地形測量（細部測量）では、測定を行うほか、編集時に必要となるデータの",
                "type": "static"
            },
            {
                "text": "結線情報",
                "type": "interactive",
                "options": [
                    "結線情報",
                    "権利情報",
                    "登記情報"
                ],
                "correctAnswer": "結線情報"
            },
            {
                "text": "や、地名等の資料を作成する。",
                "type": "static"
            }
        ],
        "explanation": "点（ポイント）を測るだけでなく、どの点とどの点が繋がって線（道路や建物）になるかという「結線」の情報が地図作成には不可欠です。"
    },
    {
        "id": "R2-02-b",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "日本で採用している回転楕円体は",
                "type": "static"
            },
            {
                "text": "GRS80楕円体",
                "type": "interactive",
                "options": [
                    "GRS80楕円体",
                    "WGS84楕円体",
                    "ベッセル楕円体"
                ],
                "correctAnswer": "GRS80楕円体"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "測量法により、日本が採用する準拠楕円体は「GRS80」です（GPS等で使われるWGS84とは極めて似ていますが、厳密には定義が異なります）。"
    },
    {
        "id": "R2-03-4",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "JPGISで定義するスキーマは、",
                "type": "static"
            },
            {
                "text": "統一モデル化言語(UML)",
                "type": "interactive",
                "options": [
                    "統一モデル化言語(UML)",
                    "拡張マークアップ言語(XML)",
                    "HTML"
                ],
                "correctAnswer": "統一モデル化言語(UML)"
            },
            {
                "text": "を使用して記述する。",
                "type": "static"
            }
        ],
        "explanation": "「スキーマ（設計図）はUMLで書く」「データ（実体）はXMLで書く」。この組み合わせはJPGISの鉄板知識です。"
    },
    {
        "id": "R2-05-3sig",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "正規分布において、平均値μ±3σの範囲に入る確率は約",
                "type": "static"
            },
            {
                "text": "99.7%",
                "type": "interactive",
                "options": [
                    "99.7%",
                    "95.5%",
                    "68.3%"
                ],
                "correctAnswer": "99.7%"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "3シグマの範囲外に出るデータは、1000個に3個程度（0.3%）しかありません。ほぼ全てのデータが含まれる範囲です。"
    },
    {
        "id": "R2-18-overlap",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "空中写真撮影において、標高が高い場所ほど、写真に写る地上の範囲は",
                "type": "static"
            },
            {
                "text": "狭くなる",
                "type": "interactive",
                "options": [
                    "狭くなる",
                    "広くなる",
                    "変わらない"
                ],
                "correctAnswer": "狭くなる"
            },
            {
                "text": "ため、重複度（オーバーラップ）は減少する。",
                "type": "static"
            }
        ],
        "explanation": "山頂などカメラに近い場所は大きく写る（ズームされた状態になる）ため、1枚の写真に写る範囲が狭くなります。その結果、隣の写真との重なり（重複度）が減ってしまいます。"
    },
    {
        "id": "R1-04-rot",
        "genre": "基準点測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "平面座標の回転計算において、回転角θを求めるには",
                "type": "static"
            },
            {
                "text": "回転行列の式",
                "type": "interactive",
                "options": [
                    "回転行列の式",
                    "ピタゴラスの定理",
                    "ヘロンの公式"
                ],
                "correctAnswer": "回転行列の式"
            },
            {
                "text": "に座標値を代入して逆算する。",
                "type": "static"
            }
        ],
        "explanation": "x' = x cosθ - y sinθ 等の公式を覚えておき、わかっている数字を代入すれば、cosθの値が求まり、そこから角度が分かります。"
    },
    {
        "id": "R1-24-b",
        "genre": "地図・GIS",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "国土地理院が作成する基盤地図情報は、",
                "type": "static"
            },
            {
                "text": "基本測量成果",
                "type": "interactive",
                "options": [
                    "基本測量成果",
                    "公共測量成果",
                    "民間測量成果"
                ],
                "correctAnswer": "基本測量成果"
            },
            {
                "text": "である。",
                "type": "static"
            }
        ],
        "explanation": "国土地理院が行う測量は「基本測量」です。したがって、国土地理院が整備・提供する基盤地図情報は、法律上「基本測量の成果」として扱われます。"
    },
    {
        "id": "R1-28-3",
        "genre": "応用測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "深浅測量（水深測定）において、水深が浅すぎて音響測深機が使えない場合は、",
                "type": "static"
            },
            {
                "text": "ロッド又はレッド",
                "type": "interactive",
                "options": [
                    "ロッド又はレッド",
                    "水中カメラ",
                    "目視"
                ],
                "correctAnswer": "ロッド又はレッド"
            },
            {
                "text": "を用いて直接測定する。",
                "type": "static"
            }
        ],
        "explanation": "浅瀬ではエコーがうまく跳ね返らないため、物理的な棒（ロッド）や、紐のついた重り（レッド）を使って直接底を突いて測ります。"
    },
    {
        "id": "R1-28-5",
        "genre": "応用測量",
        "instruction": "次の記述は正しい。重要語句を確認しなさい。",
        "segments": [
            {
                "text": "河川測量において、距離標を設置するための測量には、近傍の",
                "type": "static"
            },
            {
                "text": "4級基準点",
                "type": "interactive",
                "options": [
                    "4級基準点",
                    "1級基準点",
                    "電子基準点"
                ],
                "correctAnswer": "4級基準点"
            },
            {
                "text": "等を使用することができる。",
                "type": "static"
            }
        ],
        "explanation": "距離標（川のキロポスト的なもの）の設置精度はそこまで超高精度でなくてもよいため、4級基準点などが使用可能です。"
    }
];
