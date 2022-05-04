const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  // ブラウザーをリロード中断できる
  event.preventDefault();
  // liタグを追加する定義
  add();
});

// add中身
function add(todo) {
  // todoTextを変数宣言しユーザーが入力した値がinput.valueになるのでinput.valueをtodoTextに入れておく
  let todoText = input.value;
  // todoに画面がリロードされても保存されたデータを消えずに画面に残る処理
  if (todo) {
    todoText = todo.text;
  }
  if (todoText.length > 0) {
    // document.createElementでliタグを追加して
    const li = document.createElement("li");
    // li.innerText中に宣言したtodoTextを入れておく、これでユーザーが入力してるかしてないか判定してくれる
    li.innerText = todoText;
    // classListを追加してその中にlist-group-itemというタグを追加しておく
    li.classList.add("list-group-item");
    // liタグが存在した時のif文
    if (todo && todo.Commented) {
      li.classList.add("text-decoration-line-through");
    }
    // 画面のリストを削除する機能
    li.addEventListener("contextmenu", function (event) {
      // event.preventDefaultはイベントが発生するのをブロックして発生しないようにする関数
      event.preventDefault();
      li.remove();
      saveData();
    });
    // クリックしたら取り消し線を付ける機能
    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    ul.appendChild(li);
    // チェックボックスにチェックしたら完了したってことにする
    // フォーム入力した後空にするために""って書く
    input.value = "";
    saveData();
  }
}

// saveData中身
function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];

  lists.forEach((list) => {
    // オブジェクトでtodoの中身を宣言してあげる
    let todo = {
      text: list.innerText,
      Commented: list.classList.contains("text-decoration-line-through"),
    };
    todos.push(todo);
    // console.log(list.innerText);
  });
  // ローカルストレージにtodosで入力されたデータを保存する
  localStorage.setItem("todos", JSON.stringify(todos));
  // console.log(lists);
}
