/*jshint esversion: 6 */
const { Router } = require('express');
const datosCtrl = require('../controllers/datos.controller');
const router = Router();


router.get('/', datosCtrl.getDatos);
router.post('/', datosCtrl.createDato);
router.get('/:id', datosCtrl.getDato);
router.put('/:id', datosCtrl.updateDato);
router.delete('/:id', datosCtrl.deleteDato);



module.exports = router;
