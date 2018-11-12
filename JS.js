
let option_local = document.querySelector('.option_local')
let option_des = document.querySelector('.option_des')

var xhr = new XMLHttpRequest
xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery")
xhr.send()
xhr.onload = function(){
    var data = JSON.parse(xhr.responseText);
//  console.log(data);

   var local = {};
   for(var i = 0; i < data.length; i++){
       var content = data[i].ZipName_;
//    console.log(content);
       if(local[content] == undefined) local[content] = 1;
       else local[content] += 1;
   }
//    console.log(local);
   var str_local = '`<option value="請選擇地區">請選擇地區</option>`';
   for(const x in local){
        str_local +=  `<option value="${x}">${x}</option>`;
   }
   console.log(str_local)
   option_local.innerHTML = str_local

   var des = {}
   for(var j = 0; j <data.length; j++){
       var content = data[j].InformDesc_
       if(des[content] == undefined) des[content] = 1;
       else des[content] += 1;
   }
   console.log(des)
   var str_des = '`<option value="請選擇災害類型">請選擇災害類型</option>`'
   for(var y in des){
      str_des +=  `<option value="${y}">${y}</option>`;
    }
   console.log(str_des)
   option_des.innerHTML = str_des

   var list = document.querySelector('.list')
   var search = document.querySelector('.search')
   search.addEventListener('click', function(){
       var nowlocal = option_local.value;
       var nowdes = option_des.value
       console.log(nowdes+nowlocal);
        var num = 0;
        var str = ''
        for(var i = 0; i < data.length; i++){
            if(nowdes == data[i].InformDesc_ && nowlocal == data[i].ZipName_){
                num += 1;
                str += '<li>' +'地點 ： ' + data[i].address_+'<br>'+'報案狀況 ： ' + data[i].BeforeDesc_ +'</li>'+'<br>';
            }
        }
        list.innerHTML = str;
        var title = document.querySelector('h3')
        title.innerHTML = nowlocal+' '+nowdes+' 有 '+num+' 處';

   })









}
