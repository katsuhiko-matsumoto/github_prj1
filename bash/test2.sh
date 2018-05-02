#!/bin/sh

read key

test(){
  case $key in
    "a") return 0    
  esac
  return 1
}

test

echo $?

