var config     = require(__base + 'config');
var serialport = require('serialport');
var events     = require('events');
var util       = require('util');
var Teleinfo   = require(__base + 'models/teleinfo');
var logger     = require(__base + 'utils/logger');
var mongoose   = require('mongoose');



var SerialPort = serialport.SerialPort; // localize object constructor

var serialPort = new SerialPort(config.serialPort, {
    baudrate: 1200,
    dataBits: 7,
    parity: 'even',
    stopBits: 1,
    // Caractères séparateurs = fin de trame + début de trame
    parser: serialport.parsers.readline(String.fromCharCode(13,3,2,10))
});

serialPort.on('open',function() {
    logger.debug(config.serialPort + ' port open');
});

serialPort.on('data', function(data) {
    trameEvents.emit('trame', data);
});


/*serialPort.on('error', function(err) {
    trameEvents.emit('error', err);
});*/


// Evénements 'trame' et 'tramedecodee'
var trameEvents = new events.EventEmitter();

trameEvents.on('trame', function(data) {
    // Decode trame '9 lignes en tarif bleu base'
    var trame = {};
    var arrayOfData = data.split('\r\n');

    if(arrayOfData.length > 8)
    {
        for (var i=0; i < arrayOfData.length; i++) {
            try
            {
                decodeLigne(arrayOfData[i], trame, trameEvents);
            }
            catch(e){}
        }
        // trame incomplete s'il manque la première ligne ADCO
        if (trame.ADCO !== undefined) {
            trameEvents.emit('tramedecodee', trame);
        }
        else {
            // logger.log(trame);
            var err = new Error('Trame incomplete');
            trameEvents.emit('error', err);
        }
    }
});


trameEvents.on('tramedecodee', function (data) {
  teleinfo().setData(data);
});


function decodeLigne(ligneBrute, trame, trameEvents) {
    // Ligne du type "PAPP 00290 ," (Etiquette / Donnée / Checksum)
    var elementsLigne = ligneBrute.split(' ');
    if (elementsLigne.length === 3) {
      // Spec chk : somme des codes ASCII + ET logique 03Fh + ajout 20 en hexadécimal
      // Résultat toujours un caractère ASCII imprimable allant de 20 à 5F en hexadécimal
      // Checksum calculé sur etiquette+space+données => retirer les 2 derniers caractères
      var sum = 0;
      for (var j=0; j < ligneBrute.length-2; j++) {
        sum += ligneBrute.charCodeAt(j);
      }
      sum = (sum & 63) + 32;

      if (sum === ligneBrute.charCodeAt(j+1)) {
        // Checksum ok -> on ajoute la propriété à la trame
        // Conversion en valeur numérique pour certains cas
        switch (elementsLigne[0].substr(0,4)) {
          case 'BASE': // Index Tarif bleu
          case 'HCHC': // Index Heures creuses
          case 'HCHP': // Index Heures pleines
          case 'EJPH': // Index EJP (HN et HPM)
          case 'BBRH': // Index Tempo (HC/HP en jours Blanc, Bleu et Rouge)
          case 'ISOU': // Intensité souscrite
          case 'IINS': // Intensité instantannée (1/2/3 pour triphasé)
          case 'ADPS': // Avertissement de dépassement
          case 'IMAX': // Intensité max appelée (1/2/3 pour triphasé)
          case 'PAPP': // Puissance apparente
          case 'PMAX': // Puissance max triphasée atteinte
            trame[elementsLigne[0]]= Number(elementsLigne[1]);
            break;
          default:
            trame[elementsLigne[0]]= elementsLigne[1];
        }
        return true;
      }
      else {
        var err = new Error('Erreur de checksum : \n' + ligneBrute + '\n Checksum calculé/reçu : ' + sum + ' / ' + ligneBrute.charCodeAt(j+1));
        trameEvents.emit('error', err);
      }
    };
};


var dataToSave = {};

function teleinfo() 
{
  return {
    setData: function(data) 
    {
       dataToSave = data;
    },
    getData: function()
    {
      return dataToSave;
    }
  }
}

module.exports = teleinfo