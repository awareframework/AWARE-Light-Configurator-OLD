try{
import { Accounts } from 'meteor/accounts-base'

Accounts.ui.config({
    requestPermissions: {},
    // extraSignupFields: [{
    //     fieldName: 'email_updates',
    //     fieldLabel: 'Keep me up to date on updates.',
    //     inputType: 'checkbox',
    //     visible: true,
    //     optional: true,
    //     saveToProfile: true,
    //     validate: function(value, errorFunction) {
    //         if (value) {
    //             return true;
    //         } else {
    //             return true;
    //         }
    //     }
    // }]
});
}
catch (err){
    console.log(err);
}
