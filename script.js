"use strict";

{
  document.addEventListener('DOMContentLoaded', () => {
    // チャンネル名と初期カウントを受け取る
    const channelName = prompt('チャンネル名を入力してください:');
    const initialCount = parseInt(prompt('初期カウントを入力してください:'), 10); 
    const initialWait = parseInt(prompt('画像アップロード後、登録者が増えるまでの待機秒数を入力してください\n(アイコンをクリックすると、登録者数が初期カウントに戻った後、再度同じ時間待機後に登録者が増えます。):'), 10);
    
    // チャンネル名と初期カウントを設定
    let current = initialCount;
    let next = initialCount + 1;

    const currentDiv = document.getElementById('current');
    const nextDiv = document.getElementById('next');

    currentDiv.textContent = current;
    nextDiv.textContent = next;

    document.getElementById('channelName').textContent = channelName;

    // 登録者カウントアップ関数
    function updateCounter() {  
      currentDiv.style.transform = 'translateY(-100%)';
      nextDiv.style.transform = 'translateY(0)'; // 初期値が100%なので戻す
  
      setTimeout(() => { 
        currentDiv.style.transition = 'none'; // アニメーションを無効化
        nextDiv.style.transition = 'none';
        
        currentDiv.textContent = next; // 初期カウントを1増えた状態のままに変更
        currentDiv.style.transform = 'translateY(0)'; // 初期カウントとネクストカウントを初期位置に戻す
        nextDiv.style.transform = 'translateY(100%)';
        
        setTimeout(() => { // 初期位置に戻るまで50ミリセカンド待機してからアニメーションを再度有効化
          currentDiv.style.transition = '';
          nextDiv.style.transition = '';
        }, 50);
  
      }, 2000); // アニメーションが終わるまで待つ
    }
  
    // アイコン画像のアップロード処理
    const iconUpload = document.getElementById('iconUpload');
    const channelIcon = document.getElementById('channelIcon');
  
    // 最初のカウントをする関数
    function startCounter() {
      setTimeout(updateCounter, initialWait * 1000);
    }

    // 2回目以降アイコンクリックでカウントする関数
    function restartCounter() {
      currentDiv.textContent = current; // 初期値をリセット
      setTimeout(updateCounter, initialWait * 1000);
    }
  
    iconUpload.addEventListener('change', (event) => { // changeイベントでファイルアップロードを検知
      const file = event.target.files[0]; // イベントの発火元からファイルを読み込み
      if (file) { // ファイルが読み込まれたら
        const reader = new FileReader();
        reader.onload = (e) => { //　ファイル読み込み時の関数を定義
          channelIcon.src = e.target.result; // アイコンをセット
          channelIcon.style.display = 'block'; // アイコンを表示
          iconUpload.style.display = 'none'; // ファイルアップロードの入力欄を非表示
          // 画像がアップロードされた後に、所定の時間待機して最初のカウントを開始
          startCounter();
        };
        reader.readAsDataURL(file); // ファイル読み込み＝関数が実行される
      }
    });
    
    // アイコン画像がクリックされたときにリセットしてカウントアップ
    channelIcon.addEventListener('click', restartCounter);
  });
}
