!function () {
    let view = View('nav.menu')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);//这一部分是tween.js的
        },
        liActive: function(){
            let liTags = this.view.querySelectorAll('ul > li')//直接寻找nav下的li元素
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    x.currentTarget.classList.add('active')    //移进li标签就加上active样式  
                }
                liTags[i].onmouseleave = function (x) {
                    x.currentTarget.classList.remove('active')
                }
            }
        },
        scrollToElement: function (element) {
            let top = element.offsetTop//完整页面上 每个元素到页面顶部的高度
            //下面这段是从tween.js里抄来的
            var currentTop = window.scrollY
            var targetTop = top - 90
            var s = targetTop - currentTop
            var t = Math.abs((s / 100) * 300) //距离越长 时间越长 取绝对值
            if (t >= 500) { t = 500 }
            var coords = { y: currentTop };
            var tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
        bindEvents: function () {
            this.liActive()
            let aTags = this.view.querySelectorAll('ul >li >a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href') // #sideAbout
                    let element = document.querySelector(href) //取出选择器名为href的元素                   
                    this.scrollToElement(element)
                }
            }
        }       
    }
    controller.init(view)
}.call()