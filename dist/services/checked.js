export default new class {
    checkRegister(value) {
        if (value === '0') {
            return "注册失败";
        }
        else {
            return '注册成功';
        }
    }
    checkLoginStat(value) {
        if (value === '0') {
            return '登陆成功';
        }
        else if (value === '1') {
            return '密码错误';
        }
        else if (value === '2') {
            return '账户不存在';
        }
    }
};
