
// 切换登入注册
let link_reg = document.querySelector("#link_reg")
let link_box = document.querySelector("#link_box")
let reg_box = document.querySelector('.reg_box')
let login_box = document.querySelector('.login_box')
link_reg.addEventListener('click',function(){
    login_box.style.display = 'none'
    reg_box.style.display = 'block'
})
link_box.addEventListener('click',function(){
    reg_box.style.display = 'none'
    login_box.style.display = 'block'
})
// 从layui中获取form对象
let form = layui.form 
let layer = layui.layer
form.verify({
    // 判断密码
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    //进行密码比较是否相等
    repass:function(value){
       let pwd = $('.reg_box [name = password]').val();
       if(pwd != value){
           return `两次密码不一致`
       }
    }
})
// 监听注册提交事件
const form_reg = document.querySelector('#form_reg')
form_reg.addEventListener('submit',function(e){
    // 阻止默认提交
   e.preventDefault()
   axios.post('http://www.liulongbin.top:3008/api/reg',$(this).serialize())
   .then((response)=>{
       if(response.code === 1){
          layer.msg('提交错误')
       }
        layer.msg('注册成功,请登入')
        link_box.click()
        console.log(response)
   })

})
// 监听登录事件
const form_login = document.querySelector("#form_login")
form_login.addEventListener('submit',function(e){
     e.preventDefault()
    console.log($(this).serialize())
    axios.post('http://www.liulongbin.top:3008/api/login',$(this).serialize())
    .then((response)=>{
        if(response.code === 1){
             layer.msg('登入失败')
        }
        layer.msg('登入成功')
        location.href = '/index.html'
    })
})