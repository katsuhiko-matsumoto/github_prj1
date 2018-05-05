#!/bin/sh

[ "x`uname -s`" != "xLinux" ] && echo "Only for Linux.\t[ NG ]" && exit 1

#secure library
. /etc/rc.d/init.d/functions

[ "x`whoami`" != "xroot" ] && echo "Only for the root user." && failure $"error" && exit 1

__runuser=`which runuser`
pushd `dirname $0` >/dev/null 2>&1
[ $? -eq 1 ] && exit 1
__script_dir=`pwd`
popd >/dev/null 2>&1
#echo $__script_dir
__base_dir=`dirname ${__script_dir}`
PROG="cluster.js"
APPNAME="clusterdev"
WORLDCHAT_BIN=${__base_dir}/${PROG}

[ -f ${WORLDCHAT_BIN} ] || exit 1

OPTS=""
APP_OPTS=""
RETVAL=0
WORLDCHAT_ENV="dev"
NIC="eth0"
USER="hoge"
PIDFILE="/home/apps/pids/cluster"
LOGFILE="/home/apps/logs/clusterlog"

start() {
  ls /home/apps/pids/cluster.pid >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    for _p in `ls /home/apps/pids/cluster.pid`
    do
      echo -n "already started:pidfile=`basename ${_p}`"
      failure $"${APPNAME} startup"
      echo
      exit 1
    done
  fi

  echo -n $"Starting ${APPNAME} multi daemon: "
  echo
  ALL_RETVAL=0
  OPTS="-n ${NIC} --${WORLDCHAT_ENV}"
  echo "${__runuser} -s /bin/bash - ${USER} -c ${APP_OPTS} ${WORLDCHAT_BIN} ${OPTS} >>${LOGFILE}.log 2>&1 &"
  ${__runuser} -s /bin/bash - ${USER} -c "${APP_OPTS} ${WORLDCHAT_BIN} ${OPTS} >>${LOGFILE}.log 2>&1 &"
  RETVAL=$?

  if [ ${RETVAL} -eq 0 ]; then
    success $"${APPNAME} startup"
    echo
  else
    failure $"${APPNAME} startup"
    echo
    ALL_RETVAL=1
  fi
  if [ ${ALL_RETVAL} -eq 1 ]; then
    echo "You can not start the ${APPNAME}."
    exit 1
  fi
  echo
}

stop() {
  ALL_RETVAL=0
  echo $"Stopping ${APPNAME} daemon: "
  ls /home/apps/pids/cluster.pid >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo -n "already stoped."
    failure $"${APPNAME}"
    echo
    exit 1
  fi

  for _p in `ls /home/apps/pids/cluster.pid`
  do
    PID=`cat ${_p}`
    echo -n "kill ${PID}"
    kill ${PID}
    RETVAL=$?
    sleep 1
    if [ ${RETVAL} -eq 0 ]; then
      success $"${APPNAME} stop. pidfile=`basename ${_p}`"
    else
      failure $"${APPNAME} stop. pidfile=`basename ${_p}`"
    fi
    echo ""
    [ ${RETVAL} -ne 0 ] && ALL_RETVAL=1
  done
  if [ ${ALL_RETVAL} -eq 1 ]; then
    echo "You can not stop the ${APPNAME}."
    exit 1
  fi
}

status() {
  ls /home/apps/pids/cluster.pid >/dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Is starting up."
    for _p in `ls /home/apps/pids/cluster.pid`
    do
      echo "`cat ${_p}`"
    done
    return 0
  else
    echo "${APPNAME} is stopped."
    return 0
  fi
}

case "$1" in
	start)
		start
		;;
	stop)
		stop
		;;
	status)
		status
		RETVAL=$?
		;;
	restart)
		stop
		sleep 1
		start
		;;
	*)
		echo $"How to: $0 {start|stop|status|restart}"
		;;
esac
exit $RETVAL
