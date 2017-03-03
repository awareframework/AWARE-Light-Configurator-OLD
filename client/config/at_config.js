try{
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'email_updates',
        fieldLabel: 'Keep me up to date on updates.',
        defaultValue: true,
        inputType: 'checkbox',
        visible: true,
        saveToProfile: true,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                return false;
            }
        }
    }]
});
}
catch (err){
    console.log(err);
}
