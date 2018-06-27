/*
* @Author: ZZZ
* @Date:   2018-05-23 21:07:16
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-05-25 16:30:48
*/

(function (){
	var body = document.getElementsByTagName('body')[0];
	var showBox = document.createElement('div');
	body.appendChild(showBox);
	showBox.innerHTML = '<div id="lightbox" style="display:none">'+
					  '<div id="l_pic-view">'+
					    '<img src="" alt="#" id="l_pic">'+
					    '<button id="l_btn-prev" style="display:block">←</button>'+
				      	'<button id="l_btn-next" style="display:block">→</button>'+
				      	'<button id="l_btn-close">×</button>'+
					  '</div>'+
					'</div>';

	var lightdiv = document.getElementById('lightbox');
	//var imgs = document.getElementById('imgBox').getElementsByTagName('img');//所有图片
	var img = document.getElementsByClassName('l_img');//所有大盒子下面的所有图片
	var pic_view = document.getElementById('l_pic-view');
	var pic = document.getElementById('l_pic');
	var btn_prev = document.getElementById('l_btn-prev');
	var btn_next = document.getElementById('l_btn-next');
	var btn_close = document.getElementById('l_btn-close');

	//console.log(imgs);

	var lightbox = function(elem,options){
		var that = this;
		this.el = elem.el;
		this.imgItem = this.el.getElementsByClassName('imgItem');//图片框
		this.lightdiv = lightdiv;//整个模态框
		this.pic_view = pic_view;//模态框div
		this.pic = pic;//模态框图片
		this.btn_prev = btn_prev;//上一张按钮
		this.btn_next = btn_next;//下一张按钮
		this.btn_close = btn_close;//关闭按钮
		this.indexs = 0;//设置index属性
		this.groupData = [];//设置数组

		this.defaults = {//设置某些默认功能 是否可切换
			ifChange : true,
			iss : '123'
		};

		//this.opts = Object.assign(this.defaults,options);//用户设置选项覆盖默认值,es6写法
		//this.opts = $.extend({}, this.defaults, options);//JQ写法
		this.opts = {};
		for(var k in this.defaults){
		    this.opts[k]=this.defaults[k];
		}
		for(var k in options){
		    this.opts[k]=options[k];
		}
		console.log(this.el);
		console.log(this.imgItem);
	};

	lightbox.prototype = {
		changePic : function () {//显示图片
			var that = this;
			this.pic.setAttribute('src',this.groupData[this.indexs].src);
		},
		btnSwitch : function () {//左右按钮切换
			var that = this;
			this.btn_prev.onclick = function (){
				if (that.indexs <= 0 ){
					that.indexs = that.groupData.length - 1;
				}else{
					that.indexs -- ;
				}

				that.changePic();
			};
			this.btn_next.onclick = function () {
				if (that.indexs >= that.groupData.length - 1) {
					that.indexs = 0;
				}else{
					that.indexs ++ ;
				}
				that.changePic();

				//console.log(that.indexs);
			};
		},
		showPop : function (curSrc) {//显示灯箱
			//console.log(this.pic);
			this.lightdiv.style.display = 'block';
			this.pic.setAttribute('src',curSrc);
		},
		initalPop : function () {//点击页面上的图片
			var that = this;
			var curSrc = null;
			//console.log(this);
			for (var i = 0; i < this.imgItem.length; i++) {
				var ib = this.imgItem[i];
				ib.index = i;
				this.imgItem[i].onclick = function () {
					curSrc = this.getElementsByTagName('img')[0].getAttribute('src');

					that.groupData.length = 0;

					for (var i = 0; i < this.parentNode.children.length; i++) {
						//console.log(this.parentNode.children.length);

						that.groupData.push({
							src:this.parentNode.children[i].getElementsByTagName('img')[0].getAttribute('src'),
						});
					}

					that.indexs = this.index;//弹出框，显示当前被点击的图片
					//console.log(that.indexs);
					that.showPop(curSrc);//
					that.btnSwitch();//执行切换函数

					if (that.opts.ifChange) {// 自定义切换功能
						that.btn_prev.style.display = 'block';
						that.btn_next.style.display = 'block';
					}else{
						that.btn_prev.style.display = 'none';
						that.btn_next.style.display = 'none';
					}
				};
			}
			this.btn_close.onclick = function () {
				that.groupData = [];
				that.lightdiv.style.display = 'none';
			};
		},

	};

	lb = function (el) {
		return new _lb(el);
	};
	var _lb = function (el) {
		this.el = el;
	};
	_lb.prototype = {
		constructor : this,
		Lightbox : function (options) {
			//console.log(options);
			var Lightbox = new lightbox(this,options);
			return Lightbox.initalPop();
		}
	};
})();