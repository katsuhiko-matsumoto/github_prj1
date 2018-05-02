◇bash の初期化スクリプト
1
/etc/profile
ログイン時 に実 行 される
環境変数
全 ユーザ
2
/etc/profile.d/
ログイン時 に実 行 される
環境変数
全 ユーザ
3
~/.bash_profile
ログイン時 に実 行 される
シェル変 数
各 ユーザ
4
~/.bashrc
bash の起動時に実行される
シェル変 数
各 ユーザ
5
/etc/bashrc
bash の起動時に実行される
環境変数
 全 ユーザ

-d ファイル名
引 数 に指 定 したファイルが、ディレクトリである場 合 に真 が返 される
-e ファイル名
引数に指定したファイルが、存在する場合に真が返される
-f ファイル名
引 数 に指 定 したファイルが、通 常 のファイルである(ディレクトリなどでない)場 合に真が返される
-L ファイル名
引 数 に指 定 したファイルが、シンボリックリンクである場 合 に真 が返 される
-r ファイル名
引数に指定したファイルが、読み取り可能である場合に真が返される
-s ファイル名
引 数 に指 定 したファイルのサイズが、0でない場 合 に真 が返 される
-w ファイル名
引数に指定したファイルが、書き込み可能である場合に真が返される
-x ファイル名
引数に指定したファイルが、実行可能である場合に真が返される

整数値1 -eq 整数値2
指定した2つの整数値が、等しい場合に真が返される
整数値1 -ne 整数値2
指定した2つの整数値が、等しくない場合に真が返される
整数値1 -lt 整数値2
整数値1が整数値2よりも、小さい場合に真が返される
整数値1 -le 整数値2
整数値1が整数値2よりも小さいか、等しい場合に真が返される
整数値1 -gt 整数値2
整数値1が整数値2よりも、大きい場合に真が返される
整数値1 -ge 整数値2
整数値1が整数値2よりも大きいか、等しい場合に真が返される

条件1 -a 条件2
条件1と条件2が、共に真である場合に真が返される
条件1 -o 条件2
条件1と条件2のどちらかが、真である場合に真が返される


ファイルの文字列置き換え **************
bootstrap.cfgファイルの文字列fedoraをbootstrapに置き換えて、bootstrap2.cfgに出力

sed -e s/fedora/bootstrap/ bootstap.cfg > bootstap2.cfg

sed -i s/fedora/bootstrap/g bootstrap.cfg
sed -i s/fedora/bootstarap/ bootstrap.cfg
sed -i 's/fedora/bootstrap/' bootstrap.cfg
↑
制御構造 **************
if [ "x"$1 == "x" ]; then
 echo "usage  ./setup_00_init_network <arg1:servername>"
 echo "servername: kerberos|bootstrap|balthasar|casper|melchior"
 exit;
fi

-----
cnt=1
while [ $cnt -lt 3 ]; do
  echo "hello"
  cnt=$(expr $cnt + 1)
done

-----
array=("a" "b" "c")
#add top
array=("test" ${array[@]})

#add tail
array=(${array[@]} "test2")

-----
for i in ${array[@]};
do
  echo $i
done
-----

while :
do
  read key
  case "$key" in
    "a" ) echo "aが入力されました。" ;;
    "bb" ) echo "bbが入力されました。" ;;
    "c c c" ) echo "c c cが入力されました。" ;;
    "q" ) echo "終了します。"
          break ;;
  esac
done

↑
一定間隔で実行 **************
while true; do echo "hello"; sleep 1; done
↑
一定間隔でコマンド実行：クォーテションに注意 **************
while true; do echo `ls`; sleep 1; done
↑
/dev/null **************
/dev/null は、Unix系オペレーティングシステムにおけるスペシャルファイルの1つで、そこに書き込まれたデータを全て捨て（write システムコールは成功する）、読み出してもどんなプロセスに対してもデータを返さない（EOFを返す）。

ls >/dev/null 2>&1
このようにすると、コンソールにはなにも出力されません。

1:標準出力
2:標準エラー出力
ログ出力の振り分け

command 1>file1 2>file2
まとめて出力

command file 2>&1
まとめて他コマンドに渡す

command 2>&1 less
↑
引数 **************
$# 引数の数
$0 実行時のコマンド名が設定される ./test.sh    /home/user/test.sh
$1 - $n  n番目に指定した引数が設定される
$* setコマンド実行時で指定された全パラメータ
$@ 全ての引数
終了ステータス　戻り値

$?  コマンドの成否を表す数値が設定される
0：成功
1：失敗
#!/bin/sh
read key
test(){
  case $key in
    "a") return 0
  esac
  return 1
}
test
#直前のコマンドの戻り値 $?
echo $?

***
失敗時の終了の仕方
exit 1

[ $? -ne 0 ] && exit 1

外部シェル読み込み*************

. /hoge/common.sh

pushd popd **************
スタック構成で保存できる。

ディレクトリの移動

pushd /home/node
元のディレクトリの戻る

popd
↑
sort **************
sort *.txt > result.txt
sort reverse

sort -r *.txt > result.txt

diff ***************
diff text1 text2 > result

export **************
export TEST_ENV
TEST_ENVを環境変数に設定する

shift***************

#!/bin/bash
while [ "$1" != "" ] do
echo "----- $1 -----" shift
←1番目の引数が空でない間、以下のコマンドを繰り返し実行する
← 1番目の引数の値を表示する ← 引数を1つシフトする
done

****************************************
technic


  if [ "x"${WORLDCHAT_ENV} == "x" -o "x"${WORLDCHAT_ENV} != "xdev" ]; then
    echo "WORLDCHAT_ENVがdevに指定されていません。WORLDCHAT_ENV:${WORLDCHAT_ENV}"
    exit 1
  fi

---

# Confirm
runconfirm "Service Adomin (admindevd start) Do you want to run?"
RETVAL=$?
if [ ${RETVAL} -ne 0 ]; then
  exit 1
fi

#run confirm
runconfirm(){
  if [ "x"${WORLDCHAT_ENV} != "xcommand" ]; then
    return 0
  fi
  
  echo -n "$1 (yes/no) : "
  read ok
  
  if [ "xyes" != "x"${}ok ]; then
    echo "[ERROR] command cancel"
    return 1
  fi
  
  return 0
}  

