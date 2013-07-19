* Boomerang
 * Server side simplified message passing
 *
 * Copyright Jennie Lees
 * mail@jennielees.net
 * 2011
 *
 * This file is publicly available since the code
 * was never actively released, and probably doesn't
 * work fully. The accessibility provides no guarantee
 * against its functionality, but hopefully someone
 * might find part of it useful somehow.     
 *
*/

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
 ,	twitter  : { type: String, unique : true} // unique index removed for now, didn't translate to db properly
 ,	enabled  : Boolean
 , 	date	 : { type: Date, default: Date.now }// creation date
 , 	username : String
 , 	password : String // hash
 , 	avatarURL : String // URL to avatar
 , 	relative : ObjectId // EndUser
});

/*
  Schema for basic messages.
  Supports primarily author plus text, with date fields for
  creation and read events.
*/

var MessageSchema = new Schema({
//	_id : built-in
	text     : String
 ,	source   : String
 , 	sourceID : {type: String, unique: true }
 //,	authorID   : ObjectId // Person
 , 	date     : Date
 , 	read     : Date
 , 	author   : { name : String, twitter: String }
 , 	images   : [ImageSchema]
});

var ResponseSchema = new Schema({
	messageID : ObjectId
 , 	text      : String
 , 	date      : Date
});


/*
   Schema for Image entries.
   Supports two methods: binary (in-db) or an external URL.
   The dual-reference to Message may need to be changed, if so
   it will always remain in the Image schema.
*/

var ImageSchema = new Schema({
//	_id : built-in
// 	binary   : Buffer // Removed local binary for now due to JS handling
  	external : String
 , 	externalThumbnail : String
 , 	message  : ObjectId // Message
 , 	name 	 : String
 , 	date	 : Date
});

var PhoneSchema = new Schema({
	clientID  : String // Device ID
 ,	authToken : String // ClientLogin token
 ,	registration_id : String // ClientLogin id
 , 	PIN 	  : String // User specific PIN. Check v enduser.
 ,      timestamp : { type: Date, default: Date.now }
});

mongoose.model('EndUser', EndUserSchema);
mongoose.model('Person', PersonSchema);
mongoose.model('Image', ImageSchema);
mongoose.model('Message', MessageSchema);
mongoose.model('Phone', PhoneSchema);
