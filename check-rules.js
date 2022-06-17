//验证某个字符串是否为空
function isEmpty(str, field){
    var res = false;
    if($.trim(str).length === 0){
        res = true;
        tusi(field+ '为空');
    };
    return res;
};

//验证字符串中是否包含特殊字符
function specialChars_check(str, field)
{
    var index=0;
    var re =/[`~@#^&+<>{}\/'[\]]/im;
    if (re.test($.trim(str)))
    {
        index=1;
        tusi(field+ '包含特殊字符');
    };
    return index;
};

//常规字符验证
function strCheck(str, filed, allowEmpty, minLength, maxLength){
    var allow = (allowEmpty == undefined) ? true : false;
    //声明一个变量确定字符串是否合法
    var res = true;
    if(allow) {
        //如果允许为空
        if((!isEmpty(str, filed)) && (length_check(str, minLength, maxLength, filed))){
            res = false;
        };
    }else{
        //先验证是否为空
        if(isEmpty(str, filed) || (length_check(str, minLength, maxLength, filed))){
            res = false;
        };
    };
    return res;
};

//数字验证
function numberCheck(num, field){
    var num = Number($.trim(num));
    var res = true;
    if(isNaN(num) || (num < 0)){
        res = false;
        tusi(field+ '不合法');
    };
    return res;
};

//长度限制
function length_check(str, minLength, maxLength, field) {
  var minLen = (parseInt(minLength) > 0) ? parseInt(minLength) : 0;
  var maxLen = (parseInt(maxLength) > 0) ? parseInt(maxLength) : 0;
  var len = str.length;

  //有最小长度限制
  if(minLen) {
    if(len < minLen) {
        tusi( field + '长度不合法');
        return true;
    };
  };

  //有最大长度小限制
  if(maxLen) {
    if(len > maxLen) {
        tusi( field + '长度不大于' + maxLen);
      return true;
    };
  };
  return false; 
};

function checkMobile(s) {
    var regu = /^[1][3|8|4|5|7|9][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
};

//身份证号验证
function isCardNo(card) { 
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
  if(!!card) {
    //首先判断位数
    let len = card.length;
    if((len != 15) && (len != 18)) {
        return true;
    } else {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
      if(reg.test(card) === false) { 
          return false; 
      };
      return true;
    }; 
  } else {
    return false;
  };  
}