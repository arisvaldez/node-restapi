const { response } = require('express');

const user_get = (req, res = response) => {
  const params = req.query;
  res.json({ ok: true, msg: 'Controller get', params });
};

const user_post = (req, res = response) => {
  const body = req.body;
  res.json({ ok: true, msg: 'Controller post', body });
};

const user_put = (req, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: 'Controller put', id });
};

const user_delete = (req, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: 'Controller del', id });
};

const user_patch = (req, res = response) => {
  res.json({ ok: true, msg: 'Controller patch' });
};

module.exports = {
  user_get,
  user_delete,
  user_post,
  user_put,
  user_patch,
};
