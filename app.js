// 練習モード用の要素を捕まえる
const btnStart = document.querySelector(".btn-start"); // 練習スタートボタン
const practiceArea = document.getElementById("practice-area"); // 練習画面エリア
const btnBack = document.querySelector(".btn-back"); // 戻るボタン
const qText = practiceArea.querySelector("h3"); // 問題文を表示する場所

// 【ミッション13-1】すべての単語データを記憶しておく大元の箱（配列）
let wordList = [];

// 【追加】初めてアプリを開いた人向けの「初期フレーズ100選」
const presetPhrases = [
    // 挨拶・相槌
    { english: "Sounds good to me.", japanese: "それでいいよ / いいね" },
    { english: "I'll be right back.", japanese: "すぐ戻ります" },
    { english: "How's it going?", japanese: "調子はどう？" },
    { english: "Long time no see.", japanese: "久しぶり！" },
    { english: "What's up?", japanese: "最近どう？ / 何かあった？" },
    { english: "I'm good, thanks.", japanese: "元気だよ、ありがとう" },
    { english: "Same as usual.", japanese: "相変わらずだよ" },
    { english: "Not bad.", japanese: "悪くないね" },
    { english: "Take care.", japanese: "気をつけてね / じゃあね" },
    { english: "Have a good one.", japanese: "良い一日を" },
    { english: "Absolutely.", japanese: "絶対にそう / もちろんです" },
    { english: "Exactly.", japanese: "その通り！" },
    { english: "I think so too.", japanese: "私もそう思う" },
    { english: "No way!", japanese: "まさか！ / 信じられない！" },
    { english: "You're right.", japanese: "あなたの言う通りです" },
    { english: "Makes sense.", japanese: "なるほどね / 筋が通っているね" },
    { english: "I get it.", japanese: "分かった" },
    { english: "I have no idea.", japanese: "全然分からない" },
    { english: "Let me see.", japanese: "えーっと / 見せて" },
    { english: "Sounds fun.", japanese: "楽しそう！" },

    // 感情・意見
    { english: "I'm exhausted.", japanese: "クタクタに疲れた" },
    { english: "I'm starving.", japanese: "お腹ペコペコ" },
    { english: "I'm full.", japanese: "お腹いっぱい" },
    { english: "I'm looking forward to it.", japanese: "楽しみにしています" },
    { english: "I can't wait.", japanese: "待ちきれない！" },
    { english: "That's hilarious.", japanese: "それめっちゃウケる" },
    { english: "That's a bummer.", japanese: "それは残念だね / がっかり" },
    { english: "I'm worried.", japanese: "心配です" },
    { english: "I'm relieved.", japanese: "ホッとした" },
    { english: "I'm confused.", japanese: "混乱しています / よく分からない" },
    { english: "To be honest,", japanese: "正直に言うと、" },
    { english: "In my opinion,", japanese: "私の意見としては、" },
    { english: "I'm not sure.", japanese: "確信はないな / よく分からないな" },
    { english: "It depends.", japanese: "場合によるね" },
    { english: "I don't care.", japanese: "気にしないよ / どっちでもいいよ" },
    { english: "That's annoying.", japanese: "それイライラする" },
    { english: "I'm proud of you.", japanese: "あなたのことを誇りに思うよ" },
    { english: "Don't worry about it.", japanese: "気にしないで" },
    { english: "It's up to you.", japanese: "あなた次第だよ / 任せるよ" },
    { english: "I changed my mind.", japanese: "気が変わった" },

    // 日常生活・行動
    { english: "I'm off to work.", japanese: "仕事に行ってきます" },
    { english: "I'm heading home.", japanese: "今から家に帰るよ" },
    { english: "Let's grab a bite.", japanese: "軽く何か食べよう" },
    { english: "I need a coffee.", japanese: "コーヒー飲みたい" },
    { english: "Can I have a sip?", japanese: "一口もらっていい？" },
    { english: "I overslept.", japanese: "寝坊した！" },
    { english: "I stayed up late.", japanese: "夜更かしした" },
    { english: "I have a hangover.", japanese: "二日酔いだ…" },
    { english: "Let's split the bill.", japanese: "割り勘にしよう" },
    { english: "It's on me.", japanese: "ここは私のおごりだよ" },
    { english: "I'm doing the laundry.", japanese: "洗濯をしています" },
    { english: "I have to clean my room.", japanese: "部屋を掃除しなきゃ" },
    { english: "I'm just browsing.", japanese: "見てるだけです（店員に）" },
    { english: "I'm almost there.", japanese: "もうすぐ着くよ" },
    { english: "I'm running late.", japanese: "少し遅れます" },
    { english: "Take your time.", japanese: "ゆっくりでいいよ / 急がないで" },
    { english: "Are you ready?", japanese: "準備できた？" },
    { english: "Hold on a second.", japanese: "ちょっと待って" },
    { english: "Let's wrap it up.", japanese: "そろそろ終わりにしよう" },
    { english: "Let's call it a day.", japanese: "今日はここまでにしよう" },

    // お願い・質問・トラブル
    { english: "Could you do me a favor?", japanese: "お願いがあるんだけど？" },
    { english: "Can you give me a hand?", japanese: "ちょっと手伝ってくれる？" },
    { english: "Could you repeat that?", japanese: "もう一度言ってくれますか？" },
    { english: "Speak a little slower, please.", japanese: "もう少しゆっくり話してください" },
    { english: "What do you mean?", japanese: "どういう意味ですか？" },
    { english: "How do you spell that?", japanese: "つづりはどう書きますか？" },
    { english: "Where is the restroom?", japanese: "お手洗いはどこですか？" },
    { english: "Do you have a moment?", japanese: "今ちょっといいですか？" },
    { english: "Is everything okay?", japanese: "大丈夫？ / 問題ない？" },
    { english: "What happened?", japanese: "何があったの？" },
    { english: "I made a mistake.", japanese: "間違えました" },
    { english: "It's my fault.", japanese: "私の責任です" },
    { english: "I apologize.", japanese: "申し訳ありません" },
    { english: "No problem.", japanese: "問題ないよ / どういたしまして" },
    { english: "Never mind.", japanese: "気にしないで / やっぱ何でもない" },
    { english: "Don't mention it.", japanese: "お安い御用です / どういたしまして" },
    { english: "Let me know.", japanese: "また教えてね / 連絡してね" },
    { english: "Keep in touch.", japanese: "連絡を取り合おうね" },
    { english: "Can I ask you something?", japanese: "ちょっと聞いてもいい？" },
    { english: "What should I do?", japanese: "どうすればいいんだろう？" },

    // 旅行・お出かけ
    { english: "I'd like to check in.", japanese: "チェックインをお願いします" },
    { english: "Could we have the menu, please?", japanese: "メニューをいただけますか？" },
    { english: "I'll have this one.", japanese: "これにします（注文時）" },
    { english: "Check, please.", japanese: "お会計をお願いします" },
    { english: "Do you accept credit cards?", japanese: "クレジットカードは使えますか？" },
    { english: "Is this tax-free?", japanese: "これは免税になりますか？" },
    { english: "I'm lost.", japanese: "道に迷いました" },
    { english: "How can I get to the station?", japanese: "駅にはどう行けばいいですか？" },
    { english: "Could you take a picture of us?", japanese: "私たちの写真を撮ってくれませんか？" },
    { english: "Do you have any recommendations?", japanese: "おすすめはありますか？" },
    { english: "I have a reservation.", japanese: "予約しています" },
    { english: "Can I try this on?", japanese: "これ試着してもいいですか？" },
    { english: "Do you have a smaller size?", japanese: "これの小さいサイズはありますか？" },
    { english: "What time is check-out?", japanese: "チェックアウトは何時ですか？" },
    { english: "Could you keep my baggage?", japanese: "荷物を預かってもらえますか？" },
    { english: "It's too expensive.", japanese: "ちょっと高すぎますね" },
    { english: "Can you give me a discount?", japanese: "まけてくれませんか？" },
    { english: "I'll take it.", japanese: "これ買います" },
    { english: "Where can I catch a taxi?", japanese: "どこでタクシーに乗れますか？" },
    { english: "Thank you for your help.", japanese: "助けてくれてありがとう" }
];

// 【ミッション13-2】wordListの中身を、メモ帳(localStorage)に保存する専用マシン
const saveToLocalStorage = function () {
    // リストを「文字(JSON)」に変身させて、"myWords" という名前で保存！
    localStorage.setItem("myWords", JSON.stringify(wordList));
};

// 1. 追加ボタンを捕まえる
const btnAdd = document.getElementById("btn-add");

// 2. 英語の入力欄を捕まえる
const englishInput = document.getElementById("english-input");

// 3. 日本語の入力欄を捕まえる
const japaneseInput = document.getElementById("japanese-input");

// 4. フレーズを追加する先（ulタグ）を捕まえる
const phraseList = document.getElementById("phrase-list");

// 【ミッション12】リストを画面に作る「専用の工場（関数）」
// englishとjapaneseのデータを受け取って、画面にリストを追加する役割
const addPhraseToScreen = function (english, japanese) {
    // 【ミッション5】新しい <li> タグを作る
    const newLi = document.createElement("li");

    // 【ミッション6】中身を流し込む（変数の名前に注意！）
    newLi.innerHTML = `
        <input type="checkbox">
        <div>
            <strong>${english}</strong><br>
            <span style="font-size: 14px; color: #888;">(${japanese})</span>
        </div>
        <button class="btn-delete">&#128465;</button>
    `;

    // 【ミッション8〜10】ゴミ箱ボタンの処理
    const deleteBtn = newLi.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", function () {
        const isSure = confirm("本当に削除しますか？");
        if (isSure) {
            newLi.remove();
            // 💡 後でここに「メモ帳（localStorage）からも消す」処理を追加します

            // 👇ここを追加！（データからも消して、上書き保存する）
            // filterの魔法：「今消した英語(english)と『違う』単語だけを残す！」
            wordList = wordList.filter(function (word) {
                return word.english !== english;
            });
            saveToLocalStorage();
        }
    });

    // 【ミッション7】画面のリストにくっつける
    phraseList.appendChild(newLi);
};

// 追加ボタンがクリックされた時の処理
btnAdd.addEventListener("click", function () {

    const englishText = englishInput.value;
    const japaneseText = japaneseInput.value;

    // 【ミッション4】空振り防止
    if (englishText === "" || japaneseText === "") {
        alert("英語と日本語の両方を入力してください！");
        return;
    }

    // 🌟 さっき作った「工場」にデータを渡して、リスト作りをお任せする！
    addPhraseToScreen(englishText, japaneseText);

    // 👇ここを追加！(wordListに単語を追加して、メモ帳に保存)
    wordList.push({ english: englishText, japanese: japaneseText });
    saveToLocalStorage();

    // 【おまけ】入力欄を空っぽにする
    englishInput.value = "";
    japaneseInput.value = "";

});

// 【ミッション11】入力欄でEnterキーが押されたら、追加ボタンを自動クリックする
const triggerAddOnEnter = function (event) {
    // もし「日本語の変換中（確定前）」だったら、ここでストップする！
    if (event.isComposing) {
        return;
    }

    // もし押されたキー(event.key)が "Enter" だったら
    if (event.key === "Enter") {
        btnAdd.click(); // プログラムの力で、追加ボタンを強制的に「カチッ」と押す！
    }
};

// 英語入力欄と日本語入力欄のそれぞれに、「キーボードが押された時(keydown)」の耳をつける
englishInput.addEventListener("keydown", triggerAddOnEnter);
japaneseInput.addEventListener("keydown", triggerAddOnEnter);

// 【ミッション15・進化版】ページを開いた時の読み込み処理
const loadFromLocalStorage = function () {
    const savedData = localStorage.getItem("myWords");

    if (savedData !== null && savedData !== "[]") {
        // 過去に保存されていたデータがある場合は、それを復活させる！
        wordList = JSON.parse(savedData);
    } else {
        // 🌟 初めてアプリを開いた（または全部消した）場合は、100選をセットする！
        wordList = [...presetPhrases]; // 初期データをコピー
        saveToLocalStorage(); // その100個をメモ帳に保存しておく
    }

    // 単語の数だけ、順番に工場を動かして画面に出す！
    wordList.forEach(function (word) {
        addPhraseToScreen(word.english, word.japanese);
    });
};

// ページが開かれた瞬間に、読み込みスタート！
loadFromLocalStorage();

// ==========================================
// 🌟 アップデート版：練習モードのロジック
// ==========================================

let currentIndex = 0; // 今何問目かを数える数字
const btnShowAnswer = document.getElementById("btn-show-answer");
const btnNext = document.getElementById("btn-next-question");
const pCounter = document.getElementById("practice-counter");

// 【ミッション17・19修正】練習スタートボタンを押した時
btnStart.addEventListener("click", function () {
    if (wordList.length === 0) {
        alert("まずは単語を追加してください！");
        return;
    }

    // 画面を切り替える（要素を隠す）
    document.querySelector("h1").style.display = "none";
    document.querySelector(".input-area").style.display = "none";
    document.querySelector("h2").style.display = "none";
    phraseList.style.display = "none";
    btnStart.style.display = "none";

    practiceArea.style.display = "block"; // 練習画面を表示

    currentIndex = 0; // 1問目からスタート
    showQuestion();   // 問題を表示する
});

// 【追加】問題を表示する専用の関数
const showQuestion = function () {
    const currentWord = wordList[currentIndex];

    // カウンターの表示 (例: 1 / 5)
    pCounter.textContent = `${currentIndex + 1} / ${wordList.length}`;

    // 英語を表示（idで指定した要素に書き込む）
    const questionElement = document.getElementById("question-text");
    questionElement.textContent = currentWord.english;
    questionElement.style.color = "#4A4A4A";

    // ボタンの表示切り替え（答え表示ボタンを出し、次へボタンを隠す）
    btnShowAnswer.style.display = "block";
    btnNext.style.display = "none";
};

// 【追加】「答えを表示」ボタンを押した時
btnShowAnswer.addEventListener("click", function () {
    const currentWord = wordList[currentIndex];
    const questionElement = document.getElementById("question-text");

    // 英語の下に日本語を追加して表示
    questionElement.innerHTML = `${currentWord.english}<br><span style="color: #C89F82; font-size: 0.8em;">${currentWord.japanese}</span>`;

    // ボタンを入れ替える
    btnShowAnswer.style.display = "none";
    btnNext.style.display = "block";
});

// 【追加】「次の問題へ」ボタンを押した時
btnNext.addEventListener("click", function () {
    currentIndex++; // 次の番号へ

    if (currentIndex >= wordList.length) {
        alert("全問終了！お疲れ様でした！");
        location.reload(); // 一覧に戻る
    } else {
        showQuestion(); // 次の問題へ
    }
});

// 「一覧に戻る」ボタン（これはそのまま残す）
btnBack.addEventListener("click", function () {
    location.reload();
});