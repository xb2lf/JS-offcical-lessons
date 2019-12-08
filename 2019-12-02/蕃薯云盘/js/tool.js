let tools = (function () {
    // 通过父级的Id去找一个子级
    function getChild(data,id=0) {
       if(!data[id])return null;
       let ary = Object.keys(data);
       return ary.filter(item => data[item].pid === id).map(item => data[item]);
    }

    //通过父级的ID去找多个子级

    function getChilds(id=-1) {
        let ary = Object.keys(data);
        return ary.filter(item => data[item].pid === id).map(item => data[item]);
     }
    // 专门用来找一个父级的
    function getParent(id) {
        if(data[id].pid === '-1')return null;
        return data[data[id].pid];
    }

    // 找所有父级的
    function getParents(id) {
        let pdata = getParent(id);
        let ary = [data[id]];
       // 循环pdata直到为null
       while (pdata) {
           ary.unshift(pdata); // unshift向数组的开头添加内容  把每次的父级都存到ary中
           pdata = getParent(pdata.id);
       }
       return ary
    }
    
    // 碰撞检测
    function impact(obj,obj2){
        let {left:l,top:t,bottom:b,right:r} = obj.getBoundingClientRect();
        let {left:l2,top:t2,bottom:b2,right:r2} = obj2.getBoundingClientRect();
        if(r < l2 || b < t2 || l > r2 || t > b2){
            // console.log('没碰到');
            return false;
        }else{
            // console.log('碰到');
            return true;
        }
    }

    return {
        getChild,
        getChilds,
        getParents,
        impact
    }
}) ();