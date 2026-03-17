// 練習モード用の要素を捕まえる
const btnStart = document.querySelector(".btn-start"); // 練習スタートボタン
const practiceArea = document.getElementById("practice-area"); // 練習画面エリア
const btnBack = document.querySelector(".btn-back"); // 戻るボタン
const qText = practiceArea.querySelector("h3"); // 問題文を表示する場所

// 【ミッション13-1】すべての単語データを記憶しておく大元の箱（配列）
let wordList = [];

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

// 【ミッション15】ページを開いた時に、保存されたデータを読み込んで画面に復活させる！
const loadFromLocalStorage = function() {
    // メモ帳から "myWords" を探し出す
    const savedData = localStorage.getItem("myWords");

    // もしデータが空っぽじゃなかったら（過去に保存されていたら）
    if (savedData !== null) {
        // 文字列からJavaScriptのリスト（配列）に開封（パース）して復活！
        wordList = JSON.parse(savedData);

        // 保存されていた単語の数だけ、順番に工場を動かして画面に出す！
        wordList.forEach(function(word) {
            addPhraseToScreen(word.english, word.japanese);
        });
    }
};

// ページが開かれた瞬間に、読み込みスタート！
loadFromLocalStorage();

// 1. 練習スタートボタンを押した時
btnStart.addEventListener("click", function() {
    // もし単語が1つもなかったら、練習を始めない
    if (wordList.length === 0) {
        alert("まずは単語を追加してください！");
        return;
    }

    // 画面を切り替える
    // (一覧に関係するものを隠して、練習エリアを表示する)
    document.querySelector("h1").style.display = "none";
    document.querySelector(".input-area").style.display = "none";
    document.querySelector("h2").style.display = "none";
    phraseList.style.display = "none";
    btnStart.style.display = "none";

    practiceArea.style.display = "block"; // 練習画面を「現れろ！」とする

    // 最初の単語をセットする（とりあえず0番目の英語を表示）
    qText.textContent = wordList[0].english;
});

// 2. 「一覧に戻る」ボタンを押した時
btnBack.addEventListener("click", function() {
    // 画面を元に戻す（リロードしちゃうのが一番手っ取り早いですが、今回は丁寧に！）
    location.reload(); // ページを再読み込みして初期状態に戻す魔法
});