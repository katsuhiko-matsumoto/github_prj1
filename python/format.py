#python module install
# python3 -m pip install hoge

import sys
import random
import copy

#exec:  python3 hoge.py

print("hello world")
print("what is your name")
myname = input()
print("it is goot to meet you :" + myname)

len("hello")
#5

str(29)
#'29'

int('19')
#19

float('3.14')
#3.14

(4<5) and (5<6) or (3<4)

not True


#if
name = "wow"
if name == "wow":
    print("wow")
elif name == "test":
    print("not wow")
else:
    print("else")


#while
cnt = 0
while cnt < 5:
    print("hello %d",cnt)
    cnt+=1


while True:
    print("who are you? [joe]")
    name = input()
    if name != "joe":
        continue
    print("what is your password[joe]")
    passwd = input()
    if passwd == "joe":
        break
print("authorized")


##for

for i in range(5):
    print("range: "+str(i))

for i in range(0,10):
    print("range: "+str(i)) #0 to 9

#sys exit
#import sys
#sys.exit()

#function

def test():
    print("def of test")

test()
test()


#import random

def get_ans(num):
    if num == 1:
        return "wow"
    elif num == 2:
        return "wowow"
    else:
        return "w"

print(get_ans(random.randint(1,3)))
print(get_ans(random.randint(1,3)))
print(get_ans(random.randint(1,3)))


#global 変数
global eggs


#try catch
def test1():
    try:
        return 42/0
    except ZeroDivisionError:
        print("invalid argument")

test1()


#list *********************
[1,2,3]
['hello',3.14,20]

test = ['car','dog','human']
test[1]
test[0:2]
len(test)

newtest = test + ['1',2,3]

test3 = ['aa','bb','cc']
aa1,bb1,cc1 = test3

#search list
test3.index('aa')

#list add
test3.append('dd')
test3.insert(3,'wow')
test3.remove('aa')

test3.sort()
test3.sort(key=str.lower)

#文字列トとタプル
name = "Zophie"
name[0]
name[0:4]

eggs = ('hello',42,0.5)
print(eggs[0])
print(eggs[1:4])

#タプルリスト変換
tuple(['aa','bb','cc'])
list(('aa','bb','cc'))
list('hello')

#copy
#copy.copy(list)

#listを含むlistの場合
#copy.deepcopy(list)

#dictionary : 辞書 **************
mycat={'size':'fat','color':'gray','disposition':'loud'}
mycat['size']

#比較
mycat == mycat

pets = {'test':'2014/4/4'}
while True:
    print('set name')
    name = input()
    if name == '':
        break
    if name in pets:
        print(name+' birthday is '+ pets[name])
    else:
        print('input birthday')
        bday = input()
        pets[name] = bday
        print('added birthday to database')


for v in pets.keys():
    print(v)

for v in pets.values():
    print(v)

for v in pets.items():
    print(v)

#検索
if 'wow' in pets.keys():
    print('exists')

if '2014/4/4' in pets.values():
    print('exists')

#辞書とリストの入れ子
all_guests = {'alice':{'apple':5,'cop':4},
                'bob':{'orange':344,'pie':1}}
for k,v in all_guests.items():
    print('##key:'+k)
    for i in v.keys():
        print(str(i)+':'+str(v[i]))

#文字列操作
#escape
#\'
#\"
#\t
#\n
#\\

#複数行３連クォート
print('''wow
    this is a test
    repeat this is a test
''')

spam1 = "hello world"
print(spam1[4])  # at 4
print(spam1[0:5]) # 0 to 5
print(spam1[6:]) # 6 ....

"hello" in "hello workd"
#true

print(spam1.upper())
print(spam1.lower())

spam1.startswith('hello')
spam1.endswith('world')

#join
', '.join(["cats","dogs","birds"])

"my name is Mike".split(' ')

#strip(), rstrip(), lstrip()で空白文字削除

#コマンドライン引数
sys.argv
if len(sys.argv) > 0:
    for i in range(0, len(sys.argv)):
        print(sys.argv[i])


#正規表現
#\d\d\d-\d\d\d\d-\d\d\d\d
#\d{3}-\d{4}-\d{4}

#rでエスケープを簡潔に：２重にしなくてよい
r'\d\d\d-\d\d\d\d-\d\d\d\d'
import re
phone_num_regex = re.compile(r'\d\d\d-\d\d\d\d-\d\d\d\d')
mo = phone_num_regex.search("my phone numbe is 090-1234-4567")
print("find:"+mo.group())

#re.compile(r'BAT(man|mobile|copter|bat)')
#re.compile(r'BAT(wo)?man')
#re.complle(r'BAT(wo)*man')
#re.comile(r'(HA){3,5}')

#全て検索
mo = phone_num_regex.findall("yo 090-2345-4566 and 080-3333-2234")

"""
?は、直前のグループの０回か１回の出現にマッチ
*は、直前のグループの０回以上の出現にマッチ
+は、直前のグループの１回以上の出現にマッチ
{n} n回
{n,} n回以上
{n,m} n〜m回
{n,m}?, *?, +?は貧欲マッチ
^hoge 前方一致
hoge$ 後方一致
. は開業文字以外の１文字とマッチ
\d 数字
\w　単語
\s　空白
\D 数字以外
\W　単語以外
\S 空白文字以外
[abc] カッコ内の任意の１文字と一致
[^abc]　カッコ内のおじ以外の任意の位置文字
"""

#大文字小文字無視
re.compile(r'hoge', re.I)

#FILE IO***********
import os

os.path.join('/usr','local','bin')
#/usr/local/bin

os.getcwd()
#cwd

os.chdir('../')
#cd

#os.makedirs('./test')
#mkdir

#相対パス、絶対パス
path = os.getcwd()
os.path.abspath(path)
os.path.realpath(path)

path='/usr/loal/bin/test.ext'
print(os.path.basename(path))
print(os.path.dirname(path))

os.path.getsize('/Users/johnanderton/git/github_prj1/python/format.py')
os.listdir('/Users/johnanderton/git/github_prj1/python')

os.path.exists('/Users/johnanderton/git/github_prj1/python')
os.path.isdir('/Users/johnanderton/git/github_prj1/python')
os.path.isfile('/Users/johnanderton/git/github_prj1/python')

#file open
hello_file = open('/Users/johnanderton/git/github_prj1/python/format.py')

hello_content = hello_file.read()
hello_file.readline()

baconfile = open('bacon.txt','w')
baconfile.write('hello world!\n')
baconfile.close()

baconfile = open('bacon.txt','a');
baconfile.write('bacon is not a vegetable.')
baconfile.close()

baconfile = open('bacon.txt');
content = baconfile.read()
baconfile.close()
print(content)

#shelveモジュール,pprint.pformat()関数で変数データを保存可能

#ファイル管理
import shutil

shutil.copy('/Users/johnanderton/git/github_prj1/bacon.txt',
    '/Users/johnanderton/git/github_prj1/bacon2.txt')
#フォルダコピー
#shutil.copytree('/usr/hoge', '/usr/bkup')

#shutil.move('./a','../b')
#mv

#os.unlink(path)
#rm

#os.rmdir(path)
#rm -rf dir 空であること

#ディレクトリを渡り歩く
for foldername, subfolders, filenames in os.walk('/Users/johnanderton/git/github_prj1/'):
    print('current folder:'+foldername)

    for subfolder in subfolders:
        print('subfolder of '+ foldername+':'+subfolder)
    
    for filename in filenames:
        print('file inside '+foldername+':'+filename)
    print('')

#debug *********

# raise Exception('this is error message')

import traceback
try:
    raise Exception('this is an error message.')
except:
    err_file = open('./errorInfo.txt','w')
    err_file.write(traceback.format_exc())
    err_file.close()
    print('logged error message.')

#log
import logging
logging.basicConfig(level=logging.DEBUG, format=' %(asctime)s - %(levelname)s - %(message)s')

def factorial(n):
    logging.debug('start def of factorial({})'.format(n))
    total = 1
    for i in range(n+1):
        total *= i
        logging.debug('i = {},total = {}'.format(i,total))
    logging.debug('end deff({})'.format(n))
    return total

print(factorial(5))
logging.debug('end of program.')

#########################
#scraping
import webbrowser

webbrowser.open('https://m2k2web.appspot.com')

#import requests
#res = requests.get('https://m2k2web.appspot.com/20180121.txt')


#excel
# import openpyxl : thried party module

#csv
import csv
example_file = open('/Users/johnanderton/git/github_prj1/python/test.csv')
example_reader = csv.reader(example_file)
example_data = list(example_reader)
print(example_data)

output_file = open('/Users/johnanderton/git/github_prj1/python/test.csv', 'w', newline='');
output_writer = csv.writer(output_file)
output_writer.writerow(['1','2','3','4'])
output_writer.writerow(['aa','bb','cc','dd'])
output_file.close()

#区切りをタブにする
#csv_writer = csv.writer(csv_file, delimiter='\t', lineterminator='\n\n')

#json
import json
stringdata = '{"name":"zombie","isCat":true,"mineCaigjt":0,"felineIQ":null}'
jsondata = json.loads(stringdata)
print(jsondata)

dumped = json.dumps(stringdata)
print(dumped)

##time**********************
import time
print('tick')
time.sleep(1)
print('tock')

import datetime
print(datetime.datetime.now())

dt = datetime.datetime(2018,5,1,11,50,59)
print(dt.year)
print(dt.month)
print(dt.day)

#期間をあらわす timedelta
#特定日付まで停止
halloween2020 = datetime.datetime(2020,10,31,0,0,0)
#while detetime.datetime.now < halloween2020:
#   time.sleep(1)

##thread****************

import threading

def test4():
    time.sleep(5)
    print('wake up')

threadobj = threading.Thread(target=test4)
threadobj.start();

def test5(arg1,arg2,arg3):
    print(arg1+" "+arg2+" "+arg3)

threadobj = threading.Thread(target=test5,
                            args=['cats','dogs','frogs'])
threadobj.start()

thread_pool = []
for i in range(14):
    th = threading.Thread(target=test5,args=['a'+str(i),'b'+str(i),'c'+str(i)])
    thread_pool.append(th)
    th.start()

#全てのスレッド終了を待つ
for t in thread_pool:
    t.join()
print('finished')

##別プログラム実行
import subprocess

subprocess.Popen([sys.executable, '/Users/johnanderton/git/github_prj1/python/test.py'])

#**********mail

import smtplib
#smtp_obj = smtplib.SMTP('smtp.example.com', 587)
#smtp_obj.ehlo()
#smtp_obj.starttls()
#smtp_obj.login('account','pass')
#smtp_obj.sendmail('to@addr','from@addr','Subject\nMessage')

#imap
#import imapclient

#GUIオートメーション、キーボードマウス操作
#pyautogui










