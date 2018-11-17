/**
	* Configuration file for the Plain & Simple Contact Form
	* 
*/

var formSetupData = {
	formheader: "Let us know what's on your mind",
	submitmethod: "console", // dev='console', form action for php='php', ajax api call='ajax'
	submitaction: "javascript:void(0)", // dev: 'javascript:void(0)', prod: 'http://your-domain.com/form-processor.php'
	buttontext: "Send it off to us!"
};

var contactData = {
	contactinfoheader: "Contact Info",
	contactnamelabel: "Name:",
	contactemaillabel: "Email:",
	contactnameplaceholder: "Your full name",
	contactemailplaceholder: "Who should we respond to?"
};

var websiteData = {
	websiteinfoshow: true, // false is the default i.e. this optional field is hidden
	websiteinfoheader: "Website Address",
	websitelabel: "", // not necessary because of header, but provided as a general rule
	websiteplaceholder: "http://"
};

var messageData = {
	messagemax: 200, // upper limit you want submitted to the server
	messagemin: 20, // to prevent messages too short to bother with :)
	messageheader: "Your Message",
	messagelabel: "", // not necessary because of header, but provided as a general rule
	messageplaceholder: "How can we help?",
	messagelimit: "Please limit your text to {{LIMIT}} characters.", // insert {{LIMIT}} where the dynamic numbering should be placed within the sentence.
	messagecounter: "You have {{LIMIT}} characters left.", // insert {{LIMIT}} where the dynamic numbering should be placed within the sentence.
};

var selectData = {
	selectheader: "Subject",
	defaultoptiontext: "Please select one",
	options:  [ // add as many options as required
		{
			value: "inquiry",
			text: "General Inquiry"
		},
		{
			value: "support",
			text: "Tech Support"
		},
		{
			value: "billing",
			text: "Billing Question"
		},
		{
			value: "membership",
			text: "Membership Question"
		},
	],
};

var checkboxData = {
	checkboxshow: true, // false is the default i.e. this optional field is hidden
	checkboxheader: "Other Choices",
	checkboxdescription: "Descriptive paragraph",
	items:  [ // add as many items as required
		{
			value: "item1",
			text: "Checkbox Item One"
		},
		{
			value: "item2",
			text: "Checkbox Item Two"
		},
		{
			value: "item3",
			text: "Checkbox Item Three"
		},
	],
};

var radiobuttonData = {
	radiobuttonshow: true, // false is the default i.e. this optional field is hidden
	radiobuttonheader: "Choose One From the List",
	radiobuttondescription: "Descriptive paragraph",
	radiobuttongroupname: "radiobuttonlist",
	items:  [ // add as many items as required
		{
			value: "radioitem1",
			text: "Radio Item One"
		},
		{
			value: "radioitem2",
			text: "Radio Item Two"
		},
		{
			value: "radioitem3",
			text: "Radio Item Three"
		},
	],
};


