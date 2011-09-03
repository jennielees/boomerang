/* End User schema: App user
   Different from Person schema due to simplified access control
   An EndUser can have many People supplying them with messages,
   this relationship is held in the Person.relative lookup.
   Possibly many-many: a Person could have multiple Relatives, but
   how would we route messages appropriately?
*/

var EndUserSchema = new Schema({
	deviceID  : String
 ,	devicePIN : String
 ,	date	  : Date // creation date
 ,	username  : String
 ,	password  : String
  
});



/* Schema for people.
   Most subject to change.
   Will use a lookup on messages by author to find a person's messages.
   Supports username and password but we might not use these...
*/

var PersonSchema = new Schema({
//	_id : built-in
	name 	 : String
 ,	twitter  : String
 ,	enabled  : Boolean
 , 	date	 : Date // creation date
 , 	username : String
 , 	password : String // hash
 , 	relative : [EndUserSchema]
});
// Note, array relationship due to Mongoose hack, may need to revert to ObjectId


/*
  Schema for basic messages.
  Supports primarily author plus text, with date fields for
  creation and read events.
*/

var MessageSchema = new Schema({
//	_id : built-in
	text    : String
 ,	source  : String
 ,	author  : [PersonSchema]
 , 	date    : Date
 , 	read    : Date
});


/*
   Schema for Image entries.
   Supports two methods: binary (in-db) or an external URL.
   The dual-reference to Message may need to be changed, if so
   it will always remain in the Image schema.
*/

var ImageSchema = new Schema({
//	_id : built-in
	binary   : Buffer
 , 	external : String
 , 	message  : [MessageSchema]
 , 	name 	 : String
 , 	date	 : Date
});



mongoose.model('EndUser', EndUserSchema);
mongoose.model('Person', PersonSchema);
mongoose.model('Image', ImageSchema);
mongoose.model('Message', MessageSchema);

