const axios = require('axios')

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
