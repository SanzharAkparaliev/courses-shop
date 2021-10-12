const keys = require('../keys')
module.exports = function(email,token) {
  return {
    to:email,
         from: keys.EMAIL_FROM,
         subject: 'Восстанавление доступа',
         html:`
             <h1>Вы забыли пароль?</h1>
             <p>Если нет то проигнируйте данное письмо</p>
             <p>Иначе нажмите на ссылку ниже:</p>
             <p><a href="${keys.BASE_URL}/auht/password/${token}">Восстановить доступ</p>
             <hr/>
             <a href="${keys.BASE_URL}">Магазин курсов </a>
     `
    
  }
}