function setLocalStorage(key, value, expires) {
    let obj = {
        value: value,
        expires: expires, //有效时间
        startTime: new Date().getTime() //记录存储数据的时间，转换为毫秒值存下来
    }
    // 判断是否设置了有效时间
    if (obj.expires) {
        // 如果设置了时间，把obj转换数据类型转换为字符串对象存起来
        localStorage.setItem(key, JSON.stringify(obj))
        // console.log(localStorage.getItem(key));
    }
    // 如果没有设置有效时间，直接把value值存进去
    else {
        localStorage.setItem(key, JSON.stringify(obj.value))
    }
};

//获取Local storage的值，保留原格式，若过期则删除该值并返回空
function getLocalStorage(key) {
    // 先定义一个变量临时存放提取的值
    let temp = JSON.parse(localStorage.getItem(key))
    // 判断有没有设置expires属性
    // 如果有，就需要判断是否到期了
    if (temp) {
        if (temp.expires) {
            let data = new Date().getTime()
            if (data - temp.startTime > temp.expires) {
                // 此时说明数据已过期,清除掉
                localStorage.getItem(key)
                // 直接return
                return
            } else {
                // 如果没有过期就输出
                return temp.value
            }
        }
        // 如果没有设置，直接输出
        else {
            return temp
        }
    } else {
        return null;
    }
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        };
    };
    return null;
};


function getWeixinUserInfo(returnUrl) {
    returnUrl = encodeURIComponent(returnUrl, "UTF-8");
    location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e45365212b6948e&redirect_uri=http%3A%2F%2Flive.ctdsb.net%2Findex.php%3Fm%3DApi%26c%3DWeixinUserinfo&response_type=code&scope=snsapi_userinfo&state=' + returnUrl + '#wechat_redirect';
};

//图像上传
function selectImg(file) {
    if (!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var replaceSrc = evt.target.result;
        //更换cropper的图片
        $('#tailoringImg').cropper('replace', replaceSrc, false); //默认false，适应高度，不失真
    }
    reader.readAsDataURL(file.files[0]);
}