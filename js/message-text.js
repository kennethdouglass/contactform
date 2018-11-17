/**
	* @class MessageText
	* @description All Messaging strings for the Form
*/
var MessageText = function () {

  this.MIN_CHARACTERS = "Please provide a bit longer description.";
  
  this.DESC_ALLOWED_CHARS = "Your description may include only letters, numbers, spaces, hyphens, periods, question marks, commas, exclamations and linefeeds.";
  
  this.PROVIDE_DESC = "Please provide a description of your needs.";
  
  this.NAME_ALLOWED_CHARS = "Your name may only include letters, numbers, spaces and hyphens.";
  
  this.PROVIDE_NAME = "Please provide your name.";
  
  this.INVALID_EMAIL = "The email provided appears to be invalid. Please double check it.";
  
  this.PROVIDE_EMAIL = "Please provide your email so we can respond.";
  
  this.PROVIDE_SUBJECT = "Please select the subject of your message."; // useful for filtering on the BE

  this.SUCCESS_MSG = "Thanks for contacting us! We will get back to you soon.";

  this.FAIL_MSG = "We apologize. Something went wrong with submitting your message. Please try again.";


};
var MSGTEXT = new MessageText();