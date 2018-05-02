#!/bin/bash

cnt=1

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

