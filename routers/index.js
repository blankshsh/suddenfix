const axios = require('axios')
const md5 = require('md5')

let userData = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    openid: "oZooA0RPG7cVVzANe_YcNgoUtrz8",
  },
  user_id: null
}

let password = function(time) {
  return md5('blankshsh' + time).substring(16)
}

exports.sdxiu = function(req, res) {
  axios({
    url: 'https://blankshsh.herokuapp.com/api/sdxiu',
    method: 'POST',
    headers: {
      sign: req.get('sign'),
      time: req.get('time')
    },
    data: req.body
  }).then(response => {
    res.json(response.data)
  })
}
