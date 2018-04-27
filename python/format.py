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
