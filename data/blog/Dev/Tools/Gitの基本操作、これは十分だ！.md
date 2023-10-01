## はじめに
この記事は、Gitを使用した経験がある初中級の開発者を対象としており、Gitの使用時によく使われるコメンドと操作を記録しています。

## 余談
日本語初心者から、もし単語や文法に誤りや不正な表現があれば、教えていただけると嬉しいです。

## Gitについて
Gitは分散型バッション管理シスチムです。コードの変更歴史を記録し、複数の開発者が協力してプロジェクトを管理するのに役立ちます。

Gitの一般的の操作手順は以下の図に示されています。
![[Drawing 2023-09-23 23.25.15.excalidraw]]
主の特徴は4つがあります。
1. 作業エリア：プロジェクトファイルを保存するためのローカルの場所。
2. ステーシングエリア(Index/Stage)：GItを使用してプロジェクトを管理する時は、ローカルファイル内は`.git` というフォルダを追加させます。このフォルダはバーション内容を保存します。通常`add`　コメンドを使用して作業ディレクトリのファイルをステージングエリアに追加します。
3. ローカルリポジトリ：Gitフォルダには、自動的に作成された`master`ブランチが含まれており、`HEAD`ポインタは`master`ブランチを指しています。`commit`コメンドを使用して、ステーシングエリアの変更させたファイルをローカルリポジトリに追加することができます。
4. リモートリポジトリ：中央のコードのリポジトリで、複数の開発者が共同で作業するプロジェクトの中心的なコードベースです。

## Gitの設定コマンド
`git config`コメンドは、Gitの設定を構成および管理するに使用させます。
- **グローバルのユーザー情報設定**
```
git config --global user.name "Your Name"
git config --gloabl user.email "youremail@example.com"
```
- **ユーザー情報をリストアップする**
```
git config --global user.name
git config --global user.email
```
- **デフォルトブランチ名を設定**
```
git config --global init.defaultBranch "main"
```
Git v2.28以上のバッションで、デフォルトブランチを`main`に変更しました。
- **カラー出力を有効する**
```
git config --global color.ui true
```
このコマンドは、Gitの出力をカラー表示するために使用されます。これにより、出力が読みやすくなります。

`--global`ブラグを使用して、これらの設定がグローバルで有効します。
特定のリポジトリで異なるせってを行いたい場合は、`--global`フラグを省略し、そのリポジトリで同じコメンドを実施するだけです。その場合は、設定はそのリポジトリにのみ適用されます。

全ての設定をリストアップします
```
git config --list
```
## よく使ってのコメンド
### add
```
// 特定のファイルをステーシングエリアに追加する。
git add [file1] [file2]
// 特定のフォルダーにステーシングエリアにを追加する。
git add [dir]
// 現在のローカルリポジトリの全て変更したファイルをステージシングエリアに追加する。
git add .
// ワーキングディレクトリ/ステージシングエリアのファイルを削除する
git rm [file1] [file2]
// 指定されたファイルの追跡を停止します
git rm --cached [file]
```
### status
ワーキングディレクトリとステージシングエリアのファイルを確認する
```
git status
```
### commit
- ステージシングエリアの変更されたファイルをコミットする(ローカルリポジトリにマージ)
```
git commit -m "コミットメッセージ"
```
- `commit` と`add`結合する
```
git commit -am "コミットメッセージ"
```
- 検証をスキップする
```
git commit --no-verify
git commit -n
```
デフォルトでは、Gitはコミット時に、コミットフックを実施し、規則や基準などに適合しているかどうか確認します。このコミットはこのような検証をスキップします。便利ですけど、コード品質を下がって可能があります。慎重に使用することは必要があります。
- コミットを修正し、同時にコミットメッセージを変更する
```
git commit --amend -m "新しいコミットメッセージ"
```
### push
- 変更された後コミットされたのファイルをリモートリポジトリにプッシュする
```
git push
```
- ローカルブランチとリモートブランチを関連する
```
git push -u origin branchName
```
### pull
- リモートリポジトリの変更点をローカルリポジトリにマージする
```
git pull origin branchName
```
ブランチの指定なしの場合は、`git pull`だけです。
### merge
- ブランチをマージする
```
git merge branchName
```
- リモートブランチをローカルブランチにマージする
```
git merge <remote-branch>/branchName
```
### branch
- ブランチ一覧を取得する
```
git branch // ローカルブランチ
git branch -a //　全てのブランチ(ローカルとリモート)
```
- ブランチを生成する
```
git branch branchName
```
- ブランチを削除する
```
git branch -d branchName
```
### checkout
- 指定のブランチ/コミット/タッグに切り替える
```
git checkout branchName　// 指定のブランチに切り替える
git checkout -b branchName　//　新しいブランチを作成して切り替える

git checkout commitID

git checkout tagId
```
- ファイルを作業エリアに復元する
```
git checkout fileName　// 指定ファイル
git checkout . // 全てファイル
```
- 最新のコミットに戻す
```
git checkout HEAD // コミット前に使用有効

git checkout HEAD^　// 直近のコミットに戻す
```
### stash
`stash`は現在の作業ディレクトリの変更を一時的に保存し、他のブランチに切り替える。
```
git stash
```
- 保存された変更の一覧を表示する
```
git stash list
```
- 保存された変更を取得する
```
git stash apply //デフォルトでは、最新の作業進捗が適用されます。
git stash apply stash@{ind}　// 複数の場合、名前で特定のstashを取得する。
```
- 以前に保存された変更を取得し、同時にリストから削除する。
```
git stash pop
git stash pop stash@{ind}
```
- 全てのことをクリアする
```
git stash clear
```
### rebase
`git rebase` は、コミット履歴を整理し、改善するために使用される強力なツールです。
```
git checkout targetBranch
git rebase baseBranch
```
例えば、`feature` ブランチのコミットを `main` ブランチにリベースする場合
```
git checkout main
git rebase feature
```
**注意⚠️**
公共リポジトリにコミットされたコミットをrebaseで変更しないでください。
### reset
今のブランチを指定のコミット或いはHEADにリセットする
```
git reset commitId // 指定したコミットおよびそれ以降のコミットを取り消し、指定したコミットまでの状態を戻る
git reset --soft commitId //　上記と同じ機能、でも変更されたファイルはステージングエリアに保持できる

git reset --hard commitId　//　コミット完全に取り消しする
```
### revert
`git revert`は全ての変更されたコードを取り消すために使用されます。
これは変更を取り消した後、新しいコミットを追加します。このようにして、特定のコミットを削除したけど、履歴は保存されます。
```
git revert HEAD　// 直近のコミットを削除する
git revert commitID　//　指定のコミットを削除する
```
**注意**
`git revert`は、公開されたコミットを取り消す安全な方法としており、`git reset`はローカルの変更を元に戻すための設計です。
### cherry-pick
指定のコミットに変更されたのコードを今作業しているのブランチに使用されます。
```
git cherry-pick commitId　// 指定のコミット
git cherry-pick commitIdA commitIdB // コミットAとコミットB
git cherry-pick commitIdA^..commitIdD // コミットAからコミットDまで
```


## END
以上は私の日常開発の中でよく使うのGitコミットです。
もし私が何か誤解していたり、他の便利なコメンドがある場合、コメントで教えてください！

以上、よろしくお願いします。