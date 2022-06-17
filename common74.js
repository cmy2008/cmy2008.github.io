function tusi(txt, fun) {
	if(timer) {
		clearInterval(timer);
	};
  var dom = document.createElement('div');
  var style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000',
    opacity: 0.7,
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '10px',
    paddingBottom: '10px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '13px',
    zIndex: 1000
  };
  for(var prop in style) {
    dom.style[prop] = style[prop];
  };
  dom.innerHTML = txt;
  document.body.appendChild(dom);
  var timer = setTimeout(function() {
    document.body.removeChild(dom);
    	if(fun){
    		fun();
    	};
  }, 2000);
};

//获取cookie
function getCookie(c_name) {
	if(document.cookie.length>0) {
	  var c_start=document.cookie.indexOf(c_name + "=");
	  if(c_start != -1){ 
	   c_start = c_start + c_name.length + 1;
	   var c_end=document.cookie.indexOf(";",c_start);
	   if(c_end == -1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	  };
	};
	return "";
};

//删除
function delCookie(c_name) {     
    var date=new Date(); 
    date.setTime(date.getTime()-1000000); 
    document.cookie = c_name+"=v; expires="+date.toGMTString(); 
};

//获取本地用户信息
function getVoteUserInfo() {
	let obj = {};
	let type = getCookie('type');
	if(type == 1) {
		//微信
		obj.openid = getCookie('openid');
		obj.nickname = getCookie('nickname');
		obj.headimgurl = getCookie('headimgurl');
		obj.type = getCookie('type');
	} else if(type == 3) {
		obj.memberid = getCookie('memberid');
		obj.mobilephone = getCookie('mobilephone');
		obj.type = getCookie('type');
	};
	return obj;
};

//文件上传
function uploadFile(fileObj) {
  if(fileObj && fileObj.uploader && fileObj.chooseBtn && fileObj.submitBtn && fileObj.fileList) {
      fileObj.url = fileObj.url || './index.php?m=App&c=Upload';
      fileObj.data = fileObj.data || {};
      fileObj.field = fileObj.filed || 'files';
      fileObj.accept = fileObj.accept || 'file';
      fileObj.acceptMime = fileObj.acceptMime || '*/*';
      fileObj.multiple = fileObj.multiple || 'false';
      fileObj.auto = fileObj.auto || false;
      fileObj.number = fileObj.number || 1;
      fileObj.size = fileObj.size || 10240;
      fileObj.drag = fileObj.drag || false;
      fileObj.beforeFun = fileObj.beforeFun || null;
      var uploader = fileObj.uploader.render({
        elem: fileObj.chooseBtn,
        url: fileObj.url,
        data: fileObj.data,
        field: fileObj.field,
        accept: fileObj.accept,
        acceptMime: fileObj.acceptMime,
        multiple: fileObj.multiple,
        auto: fileObj.auto,
        number: fileObj.number,
        exts: fileObj.exts,
        bindAction: fileObj.submitBtn,
        //文件上传前的回调
        before: function(obj) {
            fileObj.beforeFun && fileObj.beforeFun(obj);
            layIndex = layer.load(2, {
              shade: [0.4, '#393D49']
            });
        },
        choose: function(obj){  
          var files = this.files = obj.pushFile(); 
          //读取本地文件
          obj.preview(function(index, file, result){
            if(file && file.size && file.size > 1024 * 1024 * 10) {
                  tusi('上传图片不超过10M');
                  return false;
            };
            var tr = `<tr id="upload-`+ index +`">
                <td>
                  <img src="`+ result +`" alt="${file.name}" class="layui-upload-img">
                </td>
                <td>等待上传</td>
                <td>
                    <button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
                    <button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>
                </td>
            </tr>`;
            tr = $(tr);
            
            //单个重传
            tr.find('.demo-reload').on('click', function(){
              obj.upload(index, file);
            });
            
            //删除
            tr.find('.demo-delete').on('click', function(){
              delete files[index]; //删除对应的文件
              tr.remove();
              uploader.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
            });
            fileObj.fileList.append(tr);
          });
        },
        done: function(res, index, upload) {
          layer.close(layIndex);
          if(res) {
            if((res.code == 200) && res.data) {
              fileObj.finishFn && fileObj.finishFn(res.data);
              var tr = fileObj.fileList.find('tr#upload-'+ index),
                tds = tr.children();
                tds.eq(1).html('<span style="color: #5FB878;">上传成功</span>');
                //tds.eq(2).html('<button class="layui-btn layui-btn-xs layui-btn-disabled">上传</button>');
                tds.eq(2).html('<button class="layui-btn layui-btn-xs layui-btn-danger test-img" data-log="'+ res.data.url +'" onclick="delImg(`'+ res.data.url +'`)">删除</button>');
                return delete this.files[index];
            } else {
              tusi(res.msg);
            };
          };

          this.error(index, upload);
        },
        error: function(index, upload) {
          layer.close(layIndex);
          var tr = fileObj.fileList.find('tr#upload-'+ index)
          ,tds = tr.children();
          tds.eq(1).html('<span style="color: #FF5722;">上传失败</span>');
          tds.eq(2).find('.demo-reload').removeClass('layui-hide');
        }
    });
  } else {
    tusi('上传组件初始化失败');
  } ;
};

