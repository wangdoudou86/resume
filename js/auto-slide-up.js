!function () {
  let specialTags = document.querySelectorAll('[data-x]')//取出含有这个属性的元素
  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset') //让每个部分都是从下向上飘出来的
  }
  findClosestAndRemoveOffset()
  window.addEventListener('scroll', function () { findClosestAndRemoveOffset() })

  function findClosestAndRemoveOffset() {
    //下面这一堆是在滚动时发生的 所以要放在滚动事件里
    let specialTags = document.querySelectorAll('[data-x]')//取出含有这个属性的元素
    let minIndex = 0 //假设最小的是0，下面从1开始遍历比较
    for (let i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i
      }
    }
    specialTags[minIndex].classList.remove('offset')
    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]') //a[href="#sideAbout"]
    let li = a.parentNode
    let brotherAndMe = li.parentNode.children
    for (let i = 0; i < brotherAndMe.length; i++) {
      brotherAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
  }
}.call()