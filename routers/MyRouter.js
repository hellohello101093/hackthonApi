import _ from 'lodash';
import {
    Router
} from 'express';
import {
    handleErrors
} from './ResponseHandler.js';
import config from '../configs/config.js'
import {
    createUser,
    updateUserById,
    getUserById
} from '../biz/UserBiz.js';
import {
    createSubject,
    listSubject
} from '../biz/SubjectBiz.js';
import {
    createClass,
    listClass
} from '../biz/ClassBiz.js';
import {
    createRegion,
    listRegion
} from '../biz/RegionBiz.js';
import {
    createRequest,
    updateRequestById,
    getRequestById,
    removeRequestById,
    listRequest
} from '../biz/TutorRequestBiz.js';
const router = Router();
const prefix = config.api_prefix;

router.get(`${prefix}/users/id/:id`, (req, res) => {
  getUserById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});
router.post(`${prefix}/users`, (req, res) => {
  createUser(req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});
router.put(`${prefix}/users/id/:id`, (req, res) => {
  updateUserById(req.params.id, req.body).then((responses) => {
    res.status(200).json({
      message: responses
    });
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});


router.post(`${prefix}/subjects`, (req, res) => {
  createSubject(req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});

router.get(`${prefix}/subjects`, (req, res) => {
  listSubject().then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});

router.post(`${prefix}/classes`, (req, res) => {
  createClass(req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});

router.get(`${prefix}/classes`, (req, res) => {
  listClass().then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});


router.post(`${prefix}/regions`, (req, res) => {
  createRegion(req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});

router.get(`${prefix}/regions`, (req, res) => {
  listRegion().then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});


router.post(`${prefix}/request`, (req, res) => {
  createRequest(req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});
router.get(`${prefix}/request`, (req, res) => {
  listRequest(req.query).then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});
router.put(`${prefix}/request/id/:id`, (req, res) => {
  updateRequestById(req.params.id,req.body).then((result) => {
    res.status(200).json({
      message: result
    });
  }).catch((err) => {
    res.status(400).json({
      message: err
    });
  });
});
router.get(`${prefix}/request/id/:id`, (req, res) => {
  getRequestById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});
router.delete(`${prefix}/request/id/:id`, (req, res) => {
  removeRequestById(req.params.id).then((result) => {
    res.status(200).json({
      message: result
    });
  }).catch((err)=>{
    res.status(400).json({
      message: err
    });
  })
});

export default router;
