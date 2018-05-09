!function(){
  var view = View('section.message')
  var model = Model({resourceName:'Message'})
  
  var controller = {
    view:null,
    messageList:null,
    form:null,
    model:null,
    init:function(view,model){
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    
    loadMessages:function(){
      this.model.fetch()
      .then(function (messages) {
        let array = messages.map((x)=> x.attributes) 
        //得到新的数组，这里箭头函数加上花括号的话，里面要加上return
        //把这个数组的内容（留言）想办法添加到页面中
        array.forEach(
          (item)=>{
            let li = document.createElement('li')
            li.innerText = `${item.name}:${item.content}`
            this.messageList.appendChild(li)
          }) 
      })
    },
    bindEvents:function(){
      this.form.addEventListener('submit',(e)=>{
          e.preventDefault() //因为提交后会刷新，阻止它的刷新
          this.postMessage()
      })
    },
    postMessage:function(){
      let myForm = this.form  
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value
      this.model.save({'name':name,'content':content})
      .then(function(object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}:${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = '' //提交完清空评论栏里的文字
        })
    }  
  }
controller.init(view,model)
  
}.call()

/* helper
//创建TestObject表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一条数据
var testObject = new TestObject();
//数据内容是 words: 'Hello World!' 保存
//如果保存成功，则运行alert   (利用promise)
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/