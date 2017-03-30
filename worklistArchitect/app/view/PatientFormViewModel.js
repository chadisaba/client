/*
 * File: app/view/PatientFormViewModel.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.PatientFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.patientform',

    requires: [
        'Ext.data.Store'
    ],

    data: {
        trans: {
            patientIdentity: translate('patientIdentity'),
            gender: translate('gender'),
            civility: translate('civility'),
            date: translate('date'),
            hour: translate('hour'),
            firstName: translate('firstName'),
            lastName: translate('lastName'),
            birthday: translate('birthday'),
            birthname: translate('birthname'),
            referringDoctor: translate('referringDoctor'),
            InsNumber: translate('InsNumber'),
            secuNumber: translate('secuNumber'),
            pregnant: translate('pregnant'),
            address: translate('address'),
            zipCode: translate('zipCode'),
            city: translate('city'),
            phone: translate('phone'),
            mobile: translate('mobile'),
            email: translate('email'),
            free: translate('free'),
            hospitalized: translate('hospitalized'),
            emergency: translate('emergency'),
            studies: translate('studies'),
            addStudy: translate('addStudy'),
            price: translate('price'),
            device: translate('device'),
            active: translate('active'),
            contactInformation: translate('contactInformation'),
            save: translate('save'),
            cancel: translate('cancel')
        }
    },

    stores: {
        CityNameComboStore: {
            model: 'MyApp.model.CityNameComboModel'
        },
        ReferringPhysicianNameComboStore: {
            model: 'MyApp.model.ReferringPhysicianNameComboModel'
        },
        PatientTitleComboStore: {
            model: 'MyApp.model.PatientTitleComboModel'
        }
    }

});