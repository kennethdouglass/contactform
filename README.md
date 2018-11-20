#contactform
 One of my favorite projects is designing, building and coding forms. This form is configurable, includes validation for required fields and is inherently responsive.

The configuration files are sitedata.js➚, which contains the bulk of the configurable features of the form, and message-text.js➚, which contains all of the feedback messaging text.

The 'Subject' drop down is a 'converted' form select element and can be configured to include as many elements as desired. The code in pscontact.js is pretty well commented on how this is done.

The radio button list and the list of checkboxes are also custom styled elements and are also configurable for as many items as needed.

The radio button list, checkbox list, and URL fields can be configured to be 'turned off' via the configuration file.

Any necessary reset CSS has been included in the form-ps.css➚ file. All style declarations are 'namespaced' to avoid conflicts with other CSS files. (there are no guarantees, of course)

I have cleaned up the code fairly well, though you may find various 'dev cheats' here and there.


