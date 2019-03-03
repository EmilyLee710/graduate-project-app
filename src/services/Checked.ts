export default new class{
    checkRegister(value:string){
        if(value === '0'){
            return "注册失败"
        } else {
            return '注册成功'
        }
    }

    checkLoginStat(value:string){
        if(value === '1'){
            return '登陆成功'
        } else if(value === '0'){
            return '密码错误'
        } else if(value === '-1'){
            return '账户不存在'
        }
    }

    checkSex(type:number){
        if(type === 0){
          return 'man'
        } else if(type === 1){
          return 'woman'
        } else if(type === 2){
          return 'secret'
        }
    }  

    timestampToDate(timestamp) {
        var date = new Date(timestamp),
          Y = date.getFullYear(),
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
          D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
          hour = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()),
          minute = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()),
          second = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        // alert(Y+M+D);
        return ({ year: Y, month: M, day: D, hour: hour, minute: minute, second: second })
      }
}