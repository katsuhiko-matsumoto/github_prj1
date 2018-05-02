#!/bin/bash

cnt=1
while [ $cnt -lt 3 ]; do
  echo "hello"
  cnt=$(expr $cnt + 1)
done

echo "##########"

array=("a" "b" "c")
#add top
array=("test" ${array[@]})

#add tail
array=(${array[@]} "test2")

for i in ${array[@]};
do
  echo $i
done


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

