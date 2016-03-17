

var CronJob = require('cron').CronJob;
var job = new CronJob('00 20 23 * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
   console.log('test');

   var Speaker = require('speaker');
   var lame = require('lame');
   var fs = require('fs');

   // Create the Speaker instance
   var speaker = new Speaker({
     channels: 2,          // 2 channels
     bitDepth: 16,         // 16-bit samples
     sampleRate: 44100     // 44,100 Hz sample rate
   });

   fs.createReadStream('101.mp3')
   .pipe(new lame.Decoder())
   .on('format', function (speaker) {
       this.pipe(new Speaker(speaker));
   });

  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'Europe/Paris'  /* Time zone of this job. */
);
