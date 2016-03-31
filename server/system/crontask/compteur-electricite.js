var Teleinfo   = require(__base + 'models/teleinfo');
var TeleinfoProvider = require(__base + 'providers').teleinfo();

var logger     = require(__base + 'utils/logger');
var mongoose   = require('mongoose');


var CronJob = require('cron').CronJob;

var job = new CronJob('00 * * * * *', function() {
    dataToSave = TeleinfoProvider.getData();

    logger.debug(dataToSave);

    if(dataToSave.length > 0) 
    {
      var Teleinfo   = mongoose.model("Teleinfo");

      var teleinfo = new Teleinfo({
          'datetime' : new Date(),
          'OPTARIF'  : dataToSave.OPTARIF,
          'ISOUSC'   : dataToSave.ISOUSC,
          'BASE'     : dataToSave.BASE,
          'HCHP'      : dataToSave.PTEC.substr(0, 2),
          'IINST'    : dataToSave.IINST,
          'IMAX'     : dataToSave.IMAX,
          'PAPP'     : dataToSave.PAPP
      });

      teleinfo.save();
    }

  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'Europe/Paris'  /* Time zone of this job. */
);