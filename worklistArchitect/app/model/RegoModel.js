/*
 * File: app/model/RegoModel.js
 *
 * This file was generated by Sencha Architect version 4.1.0.
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

Ext.define('MyApp.model.RegoModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.field.Integer'
    ],

    fields: [
        {
            name: 'regoId'
        },
        {
            name: 'patientId'
        },
        {
            name: 'visitId'
        },
        {
            name: 'regoNumSecu'
        },
        {
            name: 'regoCleSecu'
        },
        {
            name: 'regoCodeRegime'
        },
        {
            name: 'regoCodeCaisse'
        },
        {
            name: 'regoCodeCentre'
        },
        {
            name: 'regoDateNaiss'
        },
        {
            name: 'regoTauxRemboursement'
        },
        {
            name: 'regoAtNumero'
        },
        {
            name: 'regoAtEmployeur'
        },
        {
            name: 'regoAtOrganisme'
        },
        {
            type: 'date',
            name: 'regoAtDate'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoCmu'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAld'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoForcageAld'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAutrePec'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAme'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAt'
        },
        {
            type: 'boolean',
            name: 'regoPresentationFeuilletAt'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAmeComp'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoInvalidite'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoDepistage'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoAccDroitCommun'
        },
        {
            type: 'date',
            name: 'regoDateAccDroitCommun'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoMaternite'
        },
        {
            type: 'boolean',
            name: 'regoForcageMaternite'
        },
        {
            type: 'date',
            name: 'regoDateMaternite'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoSmg'
        },
        {
            type: 'boolean',
            name: 'regoRegimeAlsace'
        },
        {
            name: 'regoQualiteBenef'
        },
        {
            type: 'int',
            name: 'regoRangGemBenef'
        },
        {
            name: 'regoNomAssure'
        },
        {
            name: 'regoDateNaissAss'
        },
        {
            name: 'regoPrenomAssure'
        },
        {
            type: 'int',
            name: 'regoRangGemAssure'
        },
        {
            name: 'regoCodeCouverture'
        },
        {
            type: 'boolean',
            defaultValue: false,
            name: 'regoFns'
        },
        {
            type: 'date',
            name: 'regoDu'
        },
        {
            type: 'date',
            name: 'regoAu'
        },
        {
            type: 'boolean',
            name: 'active'
        }
    ]
});