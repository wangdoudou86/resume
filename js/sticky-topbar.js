!function () {
  let view = View('#sideNavBar')
  var controller = {
    view:null,
    init:function(view){
      this.view = view  //这里的this是controller
      this.bindEvents()
      //相当于this.bidEvents.call(this)，里面的this等于外面的this，即controller
    },
    bindEvents:function(){
      var view = this.view
      window.addEventListener('scroll',()=>{
        if (window.scrollY > 0) {
          this.active()//想让这里的this等于上面的那个this，就把函数换成箭头函数
          //因为箭头函数内外this不变
        } else {
          this.deactive()//这里this也是controller，不加this就取不到active和deactive
        }
      })
    },
    active:function(){
      view.classList.add('nian')
    },
    deactive:function(){
      view.classList.remove('nian')
    }
  }
  
  controller.init.call(controller,view)
  //如果用对象来调用一个函数，那这个函数的this就是这个对象
}.call()
//controller的所有属性就是对view的操作