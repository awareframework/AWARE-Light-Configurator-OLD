try{
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'firstname',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'lastname',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'gender',
        showFieldLabel: false,      
        fieldLabel: 'Gender',
        inputType: 'radio',
        radioLayout: 'vertical',    
        data: [{                    
            id: 1,                  
            label: 'Male',          
            value: 'm',
            checked: 'checked'             
          }, {
            id: 2,
            label: 'Female',
            value: 'f'
        }],
        visible: true
    },  {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }]
});
}
catch (err){
    console.log(err);
}