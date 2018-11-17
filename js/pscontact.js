/*
 * @Class PSCONTACT / Contact Form 
 * @description
 *
 *
 .......................................................................... */
 var PSCONTACT = function () {
   
  var $errTarget = false;
  var submitMethod = formSetupData.submitmethod; 
  var msgmax = messageData.messagemax; 
  var msgmin = messageData.messagemin; 

  /** 
  * @private loadHTMLText()
  * @description Populates text content
  *   
  */
  var loadHTMLText = function () {

    $("#form-header").html(formSetupData.formheader);
    $("#form-contact-info h3 span").html(contactData.contactinfoheader);
    $("#form-contact-info label[for=name]").html(contactData.contactnamelabel);
    $("#form-contact-info label[for=email]").html(contactData.contactemaillabel);
    $("#fullName").attr('placeholder',contactData.contactnameplaceholder);
    $("#emailAddr").attr('placeholder',contactData.contactemailplaceholder);

    if (websiteData.websiteinfoshow) {
      $("#form-website-info h3").html(websiteData.websiteinfoheader);
      $("#form-website-info label[for=url]").html(websiteData.websitelabel);
      $("#url").attr('placeholder',websiteData.websiteplaceholder); 
      $("#form-website-info").show();
    }

    $("#submit-psform span").html(formSetupData.buttontext);
      
  }; // loadHTMLText()



  /** 
  * @private loadMessageText()
  * @description Populates message field text and sets up counter
  *   
  */
  var loadMessageText = function () {

    $("#form-message-info h3 span").html(messageData.messageheader);
    $("#form-message-info label[for=message]").html(messageData.messagelabel);
    $("#form-ps-msg").attr('placeholder',messageData.messageplaceholder);
    $("#form-ps-msg").attr('maxlength',msgmax);

    var instruction = messageData.messagelimit;
    instruction = instruction.replace("{{LIMIT}}",'<span class="init-chars">' + msgmax + '</span>');
    $("#msg-limit").html(instruction);

    var counter = messageData.messagecounter;
    counter = counter.replace("{{LIMIT}}",'<span id="msg-count" class="init-chars">' + msgmax + '</span>');
    $("#msg-counter").html(counter);

    // track the number of characters and provide feedback to the user on the characters typed in real time
    $('#form-ps-msg').keyup(function () { 
      var len = $(this).val().length;
      var char,tmp;
      if (len >= msgmax) {
        $("#msg-counter").addClass('overMax');
      }
      if (len < msgmax) {
        $("#msg-counter").removeClass('overMax');
      }
      tmp = msgmax - len;
      if (tmp > 0) {
        char = tmp;
      } else {
        char = '0';
      }
      $("#msg-count").text(char);
    });

  }; // loadMessageText()



  /** 
  * @private loadSelectDropDown()
  * @description Populates select with defined options 
  *   
  */
  var loadSelectDropDown = function () {

    $("#form-subject-info h3 span").html(selectData.selectheader);

    var thisOption;

    for (var i=0; i<selectData.options.length; i++) {

      thisOption = '<option value="' + selectData.options[i].value + '">' + selectData.options[i].text + '</option>';
      $("#select-subject").append(thisOption);
      thisOption = "";

    }
  
  }; // loadSelectDropDown()



  /** 
  * @private loadCheckBoxes()
  * @description Populates the checkbox fieldset with defined items 
  *   
  */
  var loadCheckBoxes = function () {

    $("#form-checkbox-list h3").html(checkboxData.checkboxheader);
    $("#form-checkbox-list p").html(checkboxData.checkboxdescription);

		for (var j=0; j < checkboxData.items.length; j++) {
		
      var itemtemplate = $("#checkbox-template").html();
      var itemID = 'checkbox' + j;
			var html = itemtemplate.replace('{{checkboxfor}}',itemID);
			html = html.replace('{{checkboxname}}',itemID);
			html = html.replace('{{checkboxid}}',itemID);
      html = html.replace('{{checkboxvalue}}',checkboxData.items[j].value);
      html = html.replace('{{checkboxtext}}',checkboxData.items[j].text);
			
      $("#form-checkbox-list ul").append(html);
      
    }	

    $("#form-checkbox-list").show();
    
    $("#form-ps .f-cbx").on( "click", function(e) { 
      e.stopPropagation();
      var thisthis = $(this);

      if (thisthis.hasClass("selected")) {
        thisthis.removeClass("selected");
        thisthis.children('input').prop( "checked", false );
      } else {
        thisthis.addClass("selected");
        thisthis.children('input').prop( "checked", true );
      }
     
      return false;
    });

  }; // loadCheckBoxes()

 
  
  /** 
  * @private loadRadioButtons()
  * @description Populates the radio button fieldset with defined items 
  *   
  */
  var loadRadioButtons = function () {

    $("#form-radiobutton-list h3").html(radiobuttonData.radiobuttonheader);
    $("#form-radiobutton-list p").html(radiobuttonData.radiobuttondescription);

    for (var j=0; j < radiobuttonData.items.length; j++) {
    
      var itemtemplate = $("#radiobutton-template").html();
      var itemID = 'radibutton' + j;
      var html = itemtemplate.replace('{{radiobuttonfor}}',itemID);
      html = html.replace('{{radiobuttonname}}',radiobuttonData.radiobuttongroupname);
      html = html.replace('{{radiobuttonid}}',itemID);
      html = html.replace('{{radiobuttonvalue}}',radiobuttonData.items[j].value);
      html = html.replace('{{radiobuttontext}}',radiobuttonData.items[j].text);
      
      $("#form-radiobutton-list ul").append(html);
      
    }	

    $("#form-radiobutton-list").show();
    
    $("#form-ps .f-radio").on( "click", function(e) {
      e.stopImmediatePropagation();
      $("#form-ps .f-radio").removeClass("selected");
      $(this).addClass("selected");
      return true;
    });

  }; // loadRadioButtons()
 


  /**
  *  @private convertSelects()
  *  @description This is coded to apply the customization over N form select elements, but here 
  *               it is only for a single element on this form. The caveat has to do with IDs 
  *               that are set up in the validation code...
  *
  */
  var convertSelects = function () {

    // Iterate over each select element
    $('#form-ps select').each(function () {

      // Cache the number of options
      var $this = $(this),
          numberOfOptions = $(this).children('option').length;

      let thisIDattr = $this.attr('id');
      let thisID = '#' + thisIDattr;

      // Hides the select element
      $this.addClass('s-hidden');

      // Wrap the select element in a div
      $this.wrap('<div class="f-button select"></div>');

      // Insert a styled div to sit over the top of the hidden select element
      $this.after('<div class="styledSelect" tabindex="0"><span></span><b><i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i></b></div>');

      // Cache the styled div
      var $styledSelect = $this.next('div.styledSelect');

      $styledSelect.parent().after('<span class="error" id="err-' + thisIDattr + '" style="display:none;">required input error message</span>');

      // Show the first select option in the styled div
      $styledSelect.children('span').text($this.children('option').eq(0).text());

      // Insert an unordered list after the styled div and also cache the list
      var $list = $('<ul />', {
        'class': 'options'
      }).insertAfter($styledSelect);

      // Insert a list item into the unordered list for each select option
      for (var i = 1; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
      }

      // Cache the list items
      var $listItems = $list.children('li');

      // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
      $styledSelect.on( "click", function(e) {
        e.stopPropagation();
        let $thisone = $(this);
        if ($thisone.hasClass('active')) {
          $thisone.removeClass('active').next('ul.options').hide();
        } else {
          $thisone.addClass('active').next('ul.options').show();
        }
      });

      // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
      // Updates the select element to have the value of the equivalent option
      $listItems.on( "click", function(e) {
        e.stopPropagation();
        let $thisone = $(this);
        $styledSelect.removeClass('active').addClass('selected').children('span').text($thisone.text());
        $this.val($thisone.attr('rel'));
        clearErrors('select-subject');
        $errTarget = false;
        
        // var qaVal = $(thisID + ' option:selected').val(); console.log(thisID + ' : ' + qaVal);

        $list.hide();
      });

      // Hides the unordered list when clicking outside of it
      $(document).on( "click", function(e) {
        $styledSelect.removeClass('active');
        $list.hide();
      });

    }); // each()

  }; // convertSelects()
  
  
  /**
  *  @private textareaFeedback()
  *  @description Add events to the textarea element to track the number of characters
  *               and provide feedback to the user on the characters typed in real time
  *
  */
  var textareaFeedback = function () {
  /*  
    // feedback number of characters in description
    $('#form-ps-msg').keyup(function () {
      var len = $(this).val().length;
      var char,tmp;
      if (len >= msgmax) {
        $("#msg-counter").addClass('overMax');
      }
      if (len < msgmax) {
        $("#msg-counter").removeClass('overMax');
      }
      tmp = msgmax - len;
      if (tmp > 0) {
        char = tmp;
      } else {
        char = '0';
      }
      $("#desc_count").text(char);
    });
  
    // set up counter for the description
    $('#form-ps-msg').each(function () {
      var len = $(this).val().length;
      var char,tmp;
      if (len >= msgmax) {
        $("#msg-counter").addClass('overMax');
      }
      if (len < msgmax) {
        $("#msg-counter").removeClass('overMax');
      }
      tmp = msgmax - len;
      if (tmp > 0) {
        char = tmp;
      } else {
        char = '0';
      }
      $("#desc_count").text(char);
    });
*/

  }; // textareaFeedback()
  
  
  /**
  *  @private valMessage()
  *  @description  Validate the message field; There are a limited set of characters that are legal
  *                Handle error message feedback
  *
  */
  var valMessage = function () {

    var fvalue,allowed,illegalCharacters,illegalCharacters2;
    fvalue = $("#form-ps-msg").val();
    // console.log(fvalue.length);
    // allow only letters, numbers, spaces, hyphens
    //            periods, question marks, comma, linefeed
    allowed = /^([\w\d\-?.,!\n  ]+)$/i;
      
    // another option is to define illegal chars
    illegalCharacters = /^[^@$]+$/; // ampersand and dollar sign characters
    illegalCharacters2 = /^[^<>%$]*$/ // dollar,percent,less grtr than

    if (fvalue !== "") {   
      if (allowed.test(fvalue)) {
        if ( fvalue.length < msgmin ) {
          $("#err-form-ps-msg").html(MSGTEXT.MIN_CHARACTERS).show();
          $errTarget = $("#form-ps-msg");
          return false;
        } else {
          return true;
        }
      } else {
        $("#err-form-ps-msg").html(MSGTEXT.DESC_ALLOWED_CHARS).show();
        $errTarget = $("#form-ps-msg");
        return false;
      }
    } else {
      $("#err-form-ps-msg").html(MSGTEXT.PROVIDE_DESC).show();
      $errTarget = $("#form-ps-msg");
    }
  }; // valMessage()


  /**
  *  @private valname()
  *  @description  Validate the name field; There are a limited set of characters that are legal
  *                Handle error message feedback
  *
  */
  var valname = function() {

    var nvalue,allowed;
    nvalue = $("#fullName").val();
    allowed = /^([\w\d\- ]+)$/i; // allow only letters, numbers, spaces and hyphens
    
    if (nvalue !== "") {
      if (allowed.test(nvalue)) {
        return true;
      } else {
        $("#err-fullName").html(MSGTEXT.NAME_ALLOWED_CHARS).show();
        $errTarget = $("#fullName");
        return false;
      }
    } else {
       $("#err-fullName").html(MSGTEXT.PROVIDE_NAME).show();
       $errTarget = $("#fullName");
       return false;
    }

  }; // valname()
  

  /**
  *  @private valemail()
  *  @description  Validate the email field; Evaluates the email formatting entered
  *                Handle error message feedback
  *
  */
  var valemail = function() {

    var evalue,good,evil;
    evalue = $("#emailAddr").val();
    good = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    evil =  /[^a-z0-9\@_\-\.]+/i;

    if (evalue !== "") {

      if (good.test(evalue) && !evil.test(evalue)) {
        return true;
      } else {
        $("#err-emailAddr").html(MSGTEXT.INVALID_EMAIL).show();
        $errTarget = $("#emailAddr");
        return false;
      }

    } else {
       $("#err-emailAddr").html(MSGTEXT.PROVIDE_EMAIL).show();
       $errTarget = $("#emailAddr");
       return false;
    }

  }; // valemail()
  
  /**
  *  @private valphone()
  *  @description  Validate the phone number field; Evaluates the phone number formatting entered
  *                Deprecated field before completed. 
  *                Studies show including this even as optional causes abandonment
  *
  */
  var valphone = function () { 
  
    var phvalue = $("#phoneNum").val(); 
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
    
    if (phvalue !== "") {
      if(phvalue.match(phoneno)) {  
        return true;          
      } else {  
        console.log('invalid phone number');  
        return false;  
      }  
    } else {
      console.log('no phone number');  
       return false;
    }
    
  }; // valphone() 

  /**
  *  @private valsubject()
  *  @description  Validate the subject customized select element.
  *                Handle error message feedback
  *
  */
  var valsubject = function() {
    
    var subjectVal = $('#select-subject option:selected').val();
    if (subjectVal !== 'null') {
      return subjectVal;
    } else {
      $("#err-select-subject").html(MSGTEXT.PROVIDE_SUBJECT).show();
      $errTarget = $("#select-subject");
      return false;
    }

  };

  /**
  *  @private collectChks()
  *  @description  Builds and returns a values array of checkboxes checked
  *
  */
  var collectChks = function(){
    var chkArray = [];
    
    $("#check-list input:checked").each(function() {
      chkArray.push($(this).val());
    });
    
    var selected;
    selected = chkArray.join(',') ; 
    return selected;
  };

  /**
  *  @private valiscomp()
  *  @description  Validate the 'i am a computer' checkbox hidden from the user's view
  *                cheap anti-spam: bots, at one time, checked every checkbox on a form 
  *                captchas are one cause of abandonment, but if necessary, I recommend 
  *                using Google's Recaptcha:https://www.google.com/recaptcha/intro/v3.html
  *
  */
  var valiscomp = function() {
    if ($("#iamcomp").is(':checked')) {
      return true;
    } else {
      return false;
    }
  };

  /**
  *  @private clearMessage()
  *  @description  Success or Fail message displayed at the top of the form
  *  @param {string} whichMsg: Identifies which (success or fail) message to clear from the UI
  *
  */
  var clearMessage = function (whichMsg) {
    $("#" + whichMsg).fadeOut( 300, function() {
      $("#" + whichMsg + " div").html("");
    });
  }; // clearMessage()

  /**
  *  @private clearMessages()
  *  @description  Clear both messages that might be shown at the top of the page
  *
  */
  var clearMessages = function () {
    $(".feedback").fadeOut( 100, function() {
      $(".feedback div").html("");
    });
  }; // clearMessages()

  /**
  *  @private clearErrors()
  *  @description  Clear input error message for the appropriate field
  *  @param {string} errinput: Identifies which error message to clear from the UI
  *
  */
  var clearErrors = function (errinput) {
    if (errinput) {
      $('#err-' + errinput).hide().html('');
    } else {
      $(".error").hide().html('');
    }
  }; // clearErrors()


  /**
  *  @private cleanFields()
  *  @description Clears all form fields and re-enables submit button
  */
  var cleanFields = function () {

    $("#submit-psform").removeAttr('disabled');
    $("#fullName").val('');
    $("#emailAddr").val('');
    $("#url").val('');
    $("#form-ps-msg").val('');
    $("#desc_count").text(msgmax);

    $('#select-subject option:selected').prop("selected", false);
    $("#select-subject option:first").prop("selected", "selected");
    $('#select-subject').siblings('.styledSelect').removeClass('selected').children('span').text(selectData.defaultoptiontext);

    $("#check-list input").each(function() {
      if ($(this).is(":checked")) {
        $(this).prop("checked", false).parent().removeClass('selected');
      }
    });

    $("input[name='radiobuttonlist']:checked").val('').parent().removeClass('selected');

  }; // cleanFields()
  

  /**
  *  @private validate()
  *  @description  Runs all of the validation methods and sets the top most target for the scroll
  *
  */
  var validate = function () {
    
    clearMessages();
    clearErrors();
   
    // order is important here for the scrollTo
    // so we scroll to the first-most error
    valMessage();
    valsubject();
    valemail();
    valname();

    if ($errTarget) {
      return false;
    } else {
      return true;
    }

  }; // validate()
  
  
  /**
  *  @private collectData()
  *  @description Collect all data from form fields and return the data in an object
  *
  */
  var collectData = function () {

    var dataObject = {};
    dataObject.name = $("#fullName").val();
    dataObject.email = $("#emailAddr").val();
    dataObject.subject = $('#select-subject option:selected').val();

    if (websiteData.websiteinfoshow) {
      dataObject.website = $("#url").val();
    }

    if (radiobuttonData.radiobuttonshow) {
      dataObject.radiovalue = $("input[name='radiobuttonlist']:checked").val();
    }

    if (checkboxData.checkboxshow) {
      var chkselected = collectChks();
      dataObject.chkboxvalues = chkselected;
    }

    dataObject.msg = $("#form-ps-msg").val();

    return dataObject;

  }; // collectData()

  /**
  *  @private successMsg()
  *  @description  Display a success message at the top of the form
  *  @param {boolean} flag: True: re-enable the submit button
  *                         False: leave the button disabled if it is disabled
  *
  */
  var successMsg = function (flag) {

    $("#feedback-success div").html(MSGTEXT.SUCCESS_MSG);
    $("#feedback-success").show();
    $('html, body').stop(true,true).animate({
      scrollTop: $("#feedback-success").offset().top - 60
    }, 700, function() {
      // callback?
    });

    if (flag) {
      $("#submit-psform").removeAttr('disabled');
    }

  }; // successMsg()

  /**
  *  @private failMsg()
  *  @description  Display a fail message at the top of the form
  *
  */
 var failMsg = function () {

    $("#feedback-fail div").html(MSGTEXT.FAIL_MSG);
    $("#feedback-fail").show();
    $('html, body').stop(true,true).animate({
      scrollTop: $("#feedback-fail").offset().top - 60
    }, 700, function() {
    // callback?
    });

  }; // failMsg()
  
  /**
  *  @private setup()
  *  @description add the action to the form dynamically (forces JS validation)
  *               setup UX i.e. add event handlers to form elements
  *
  */
  var setup = function () {

    cleanFields();

    $("#form_ps").attr('action',formSetupData.submitaction); 
  
    // prevent form submit with Enter key
    $('input,select').keypress(function(event) { return event.keyCode != 13; });

    // manage name input field error
    $("#fullName").on( "focus", function(e) {
      clearErrors('fullName');
      $errTarget = false;
    });

    // manage email input field error
    $("#emailAddr").on( "focus", function(e) {
      clearErrors('emailAddr');
      $errTarget = false;
    });

    // manage message input field error
    $("#form-ps-msg").on( "focus", function(e) {
      clearErrors('form-ps-msg');
      $errTarget = false;
    });

    // close x on success message box
    $("#feedback-success i").on( "click", function(e) {
      clearMessage('feedback-success');
      cleanFields();
    });

    // close x on fail message box
    $("#feedback-fail i").on( "click", function(e) {
      clearMessage('feedback-fail');
    });
    
    // Only allow sumbittal using the 'send' button
    $("#submit-psform").on( "click", function(e) {

      if (valiscomp()) { 
        clearMessages();
        clearErrors();
        return false;
      } else {

        if ( validate() ) {

          // disable the submit button to prevent multiple submittals
          $("#submit-psform").attr('disabled','disabled');

          if (submitMethod === "console") { // dev

            var dataCache = collectData();
            var theData = JSON.stringify(dataCache);

            console.log('Request data: ' + theData);

            //successMsg(true);
            successMsg(false); // test the disabled submit button styling
            // failMsg();

          } else if (submitMethod === "php") { // e.g. using form 'action'

            // I normally use Tectite FormMail: https://www.tectite.com/
            // in my freelance/personal projects
            $( "#form_ps" ).submit();

          } else { // submitMethod === "ajax" // using an API method

            var dataCache = collectData();
            var theData = JSON.stringify(dataCache);
            var apiUrl = formSetupData.submitaction; 

            /*
                The following basic Ajax request was derived from jQuery's Ajax API page
                https://api.jquery.com/jQuery.Ajax/
                Authoring APIs is not necessarily my forte and this has not been tested
            */
            var request = $.ajax({
              url: apiUrl,
              method: "POST",
              data: theData,
              dataType: "text"
            });
            
            // success 
            request.done(function( msg ) {
              successMsg(true);
            });
            
            // failure 
            request.fail(function( jqXHR, textStatus ) {
              console.log( "Request failed: " + textStatus );
              failMsg();
            });

          }
          
        } else {

          $('html, body').stop(true,true).animate({
            scrollTop: $errTarget.offset().top
          }, 700, function() {
            // any callback?
          });

        }
      
      }

      return false;
    });
    

  }; // setup()

  /**
  *  @public init()
  *  @description
  */
  this.init = function() {
    
    loadHTMLText();
    loadMessageText();
    loadSelectDropDown();
    convertSelects();

    if (checkboxData.checkboxshow) {
      loadCheckBoxes();
    }

    if (radiobuttonData.radiobuttonshow) {
      loadRadioButtons();
    }
    
    setup();

  }; // init()


}; // PSCONTACT
var pscontactform = new PSCONTACT();



$(document).ready(function(){

    pscontactform.init();

});


