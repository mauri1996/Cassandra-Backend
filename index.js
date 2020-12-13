/*jshint esversion: 6 */

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: [process.env.CASSANDRA_IP || 'cassandra'],  keyspace: 'grocery' });
client.connect(function(err, result){
	console.log('groceries: cassandra connected');
});

/*
 * GET users listing.
 */
exports.list = function(req, res){

	console.log('Groceries: list');
	client.execute('SELECT * FROM  grocery.fruit_stock',[], function(err, result){
		if(err){
			console.log('Groceries: list err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('Groceries: list succ:', result.rows);
			res.render('customers', {page_title:"Customers - Node.js", data: result.rows})
		}
	});

};

exports.add = function(req, res){
  res.render('add_grocery',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){

    var id = req.params.id;


	console.log('groceries: edit');

	client.execute(`SELECT * from grocery.fruit_stock WHERE item_id = ${id} ALLOW FILTERING`,[], function(err, result){
		if(err){
			console.log('customers: edit err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: edit succ:');
			res.render('edit_customer',{page_title:"Edit Customers - Node.js", data: result.rows});
		}
	});

};
/*Save the grocery*/
exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

	console.log('groceries: save');

	client.execute(`INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES (${input.id}, ${input.name}, ${input.price} `,[], function(err, result){
		if(err){
			console.log('customers: add err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: add succ:');
			res.redirect('/customers');
		}
	});
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;


	console.log('customers: save_edit');

	client.execute(`UPDATE people.subscribers set name = ${input.name}, price_p_item = ${input.price} WHERE id =  ${id}`,[], function(err, result){
		if(err){
			console.log('customers: save_edit err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: save_edit succ:');
			res.redirect('/customers');
		}
	});

};


exports.delete_customer = function(req,res){

    var id = req.params.id;

	console.log('customers: delete');

	client.execute("DELETE FROM people.subscribers WHERE id = " + id,[], function(err, result){
		if(err){
			console.log('customers: delete err:', err);
			res.status(404).send({msg: err});
		} else {
			console.log('customers: delete succ:');
			res.redirect('/customers');
		}
	});

};

