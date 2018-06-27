### 简单封装一个灯箱
> 使用方法：选定灯箱和子的，通过lb(elem).Lightbox({ifChange:true/fales},...) ifchange改变是否可以点击切换上下页

示例代码：
```
var im = document.getElementsByClassName('imgBox')[1];
var imgg = document.getElementsByClassName('imgBox')[0];
lb(im).Lightbox({
    ifChange: false
});
lb(imgg).Lightbox({
    ifChange: true
});
```