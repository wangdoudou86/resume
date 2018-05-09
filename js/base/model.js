window.Model = function (options) { //options是一个属性为resourceName的对象
    let resourceName = options.resourceName
    return {
        init: function () {
            var APP_ID = 'bg3xY1oJM0d0t1zWoOx3v9A4-gzGzoHsz';
            var APP_KEY = 'RaWik3KIelBjgp5P2KfK1R9p';
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        //保存数据
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X()
            return x.save(object)
        }
    }
}