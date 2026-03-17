// 1. 追加ボタンを捕まえる
const btnAdd = document.getElementById("btn-add");

// 2. 英語の入力欄を捕まえる
const englishInput = document.getElementById("english-input");

// 3. 日本語の入力欄を捕まえる
const japaneseInput = document.getElementById("japanese-input");

// 4. フレーズを追加する先（ulタグ）を捕まえる
const phraseList = document.getElementById("phrase-list");

// ちゃんと捕まえられたか、テスト表示してみる
console.log(btnAdd);

// 追加ボタンが「〇〇」されたら、{ } の中の処理を実行する
btnAdd.addEventListener("click", function () {

    // 1. 英語の入力欄から「値」を取り出して、新しい変数（englishText）に入れる
    const englishText = englishInput.value;

    // 2. 日本語の入力欄から「値」を取り出して、新しい変数（japaneseText）に入れる
    const japaneseText = japaneseInput.value;

    // 3. ちゃんと文字が取り出せたか、コンソールで確認してみる！
    console.log("入力された英語: " + englishText);
    console.log("入力された日本語: " + japaneseText);
btnAdd.addEventListener("click", function() {
    const englishText = englishInput.value;
    const japaneseText = japaneseInput.value;

    console.log("入力された英語: " + englishText);
    console.log("入力された日本語: " + japaneseText);

    // 👇ここから下を書き足して、穴埋めしてみてください！

    // 【ミッション4】入力が空っぽなら、アラートを出して処理をストップする（空振り防止）
    if (englishText === "" || japaneseText === "") {
        alert("英語と日本語の両方を入力してください！");
        return; // 「これ以上下のプログラムは実行しないで戻る」という魔法の言葉
    }

    // 【ミッション5】新しい <li> タグをJavaScriptのセカイに作り出す
    const newLi = document.createElement("ここを埋めてください");

    // 【ミッション6】作った <li> の中に、チェックボックスや入力された文字を流し込む
    // （※ バッククォート ` ` で囲むと、${変数名} で中身を埋め込める超便利な書き方です！）
    newLi.innerHTML = `
        <input type="checkbox">
        <div>
            <strong>${ここを埋めてください}</strong><br>
            <span style="font-size: 14px; color: #888;">(${ここを埋めてください})</span>
        </div>
        <button class="btn-delete">&#128465;</button>
    `;

    // 【ミッション7】完成した新しい <li> を、画面のリスト（phraseList）の一番下にくっつける
    phraseList.appendChild(ここを埋めてください);

    // 【おまけ】画面に追加し終わったら、次の入力のためにテキストボックスを空っぽに戻す！
    englishInput.value = "";
    japaneseInput.value = "";

});
});