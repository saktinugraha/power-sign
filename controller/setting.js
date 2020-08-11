var db = require('./connection');

function edit(req, res, next) {
  db.one('SELECT * FROM setting')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'ok',
          company_name: data.company_name,
          company_phone: data.company_phone,
          contact_person: data.contact_person,
          company_address: data.company_address,
          company_country: data.company_country,
          company_logo: data.company_logo,
          message: 'Retrived Info'
        });
    })
    .catch(function (err) {
      next();
    });
}

function update(req, res, next) {
  db.result("UPDATE setting SET company_name=$1, company_phone=$2, contact_person=$3, company_address=$4, company_country=$5, company_logo=$6",
    [ req.body.company_name,
      req.body.company_phone,
      req.body.contact_person,
      req.body.company_address,
      req.body.company_country,
      req.body.company_logo
    ])
    .then(function (result) {
      res.redirect('/cms/setting');
    })
    .catch(function (err) {
      res.redirect('/cms/setting');
    });
}

module.exports = {
  edit     : edit,
  update   : update
};
