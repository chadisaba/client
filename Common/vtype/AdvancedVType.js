Ext.define('Vtype.AdvancedVType', {
    override: 'Ext.form.field.VTypes',

    phoneNumber: function(val, field) {

        return this.phoneRe.test(value);
    },
    phoneRe: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
    // vtype Text property: The error text to display when the validation function returns false
    phoneText: 'Not a valid time.  Must be in the format "12:34 PM".',
    // vtype Mask property: The keystroke filter mask
    phoneMask: /[\d\s:amp]/i,

    numSecu: function(val, field) {
        return this.numSecuRe.test(val);
    },
    numSecuRe: /^([1-37-8])([0-9]{2})(0[0-9]|[2-35-9][0-9]|[14][0-2])((0[1-9]|[1-8][0-9]|9[0-69]|2[abAB])(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)|(9[78][0-9])(0[1-9]|[1-8][0-9]|90))(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})$/i,
    // vtype Text property: The error text to display when the validation function returns false
    numSecuText: 'Numéro de sécurité sociale invalide".',
    // vtype Mask property: The keystroke filter mask
    numSecuMask: /[0-9]|A|B/,

    cleSecu: function(val, field) {
        return this.cleSecuRe.test(value);
    },
    cleSecuRe: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
    // vtype Text property: The error text to display when the validation function returns false
    cleSecuText: 'invalidKey',
    // vtype Mask property: The keystroke filter mask
    cleSecuMask: /[\d\s:amp]/i,

    frenchZipCode: function(val, field) {

    },


    filePath: function(val, field) {
        return this.numSecuRe.test(val);
    },
    numSecuRe: /^([a-zA-Z]:)?(\/[a-zA-Z0-9_/-~]+)+\/?$/i,
    // vtype Text property: The error text to display when the validation function returns false
    numSecuText: translate('invalidSocialNumber'),


    password: function(val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText: 'Passwords do not match'
});
