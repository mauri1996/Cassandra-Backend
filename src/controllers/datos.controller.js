/*jshint esversion: 8 */
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ["127.0.0.1:9042" || 'cassandra'],localDataCenter: 'datacenter1',  keyspace: 'app_data' });
client.connect(function(err, result){
    if (err){
        console.log(err)
    }
    else{
        console.log('App_data: cassandra connected');
    }
    
});

const datosCtrl = {};

datosCtrl.getDatos = async(req, res) => {
	client.execute('SELECT * FROM  app_data.datos',[], function(err, result){
		if(err){
			console.log('Datos: list err:', err);
			res.status(404).send({msg: err});
		} else {
            console.log('Datos: list succ:', result.rows);
            res.json(result.rows)
			
		}
	});
   
};

datosCtrl.createDato= async(req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    client.execute(`INSERT INTO app_data.datos (item_id, name, price_p_item) VALUES ('${input.id}', '${input.name}', '${input.price}' );`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Dato creado", grocery: input });
		}
	});

};

datosCtrl.getDato = async(req, res) => {
	var id = req.params.id;
    client.execute(`SELECT * FROM  app_data.datos WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			console.log('Datos: list err:', err);
			res.status(404).send({msg: err});
		} else {
            console.log('Datos: list succ:', result.rows);
            res.json(result.rows)
			
		}
	});
};

datosCtrl.updateDato = async(req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

	client.execute(`UPDATE app_data.datos set name = '${input.name}', price_p_item = '${input.price}' WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Dato actualizado" });
		}
	});


};

datosCtrl.deleteDato = async(req, res) => {

	var id = req.params.id;
	client.execute(`DELETE FROM app_data.datos  WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Dato eliminado", id: id });
			
		}
	});

};


module.exports = datosCtrl;
