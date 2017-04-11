Picker.route('/study/:id/json', function(params, req, res, next) {
    var response = Studies.findOne({
        _id: params.id
    });

    // Check that study configuration has been already exported
    if (!response.exported) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end();
    } else {

        var finalARRAY = [];

        var study_config = [];

        var sensors = [];

        var count = 0;

        var studyData = {
            study_name: response.title,
            study_description: response.description,
            researcher_first: "",
            researcher_last: "",
            researcher_contact: response.researcher_contact
        };

        // finalARRAY[0] = studyData;
        finalARRAY[0] = {"Study config": studyData};

        if (typeof response.scheduler != 'undefined') {
            var schedules = [];

            for (i = 0; i < response.scheduler.length; i++) {

                var singleSchedule = {};

                var d = new Date();

                singleSchedule.schedule_id = Math.random();

                var action = {
                    "type": "broadcast",
                    "class": "ACTION_AWARE_QUEUE_ESM"
                };

                var extraJSON = {
                    "extra_key": "esm"
                };

                var extra_value = [];

                for (j = 0; j < response.scheduler[i].questionSchedule.length; j++) {


                    var questionNumber = response.scheduler[i].questionSchedule[j];

                    var data = {
                        esm_type: response.questions[questionNumber].type,
                        esm_title: response.questions[questionNumber].question,
                        esm_instructions: response.questions[questionNumber].instructions,
                        esm_expiration_threshold: response.questions[questionNumber].expiration_threshold,
                        esm_notification_timeout: response.questions[questionNumber].notification_timeout,
                        esm_trigger: "AWARE_TEST"
                    };
                    switch (response.questions[questionNumber].type) {
                        case 1:
                            data.esm_submit = response.questions[questionNumber].submit;
                            break;
                        case 2:
                            data.esm_submit = response.questions[questionNumber].submit;
                            data.esm_radios = [];
                            for (k = 0; k < response.questions[questionNumber].options.length; k++) {
                                data.esm_radios[k] = response.questions[questionNumber].options[k].option;
                            }
                            break;
                        case 3:
                            data.esm_submit = response.questions[questionNumber].submit;
                            data.esm_checkboxes = [];
                            for (k = 0; k < response.questions[k].options.length; k++) {
                                data.esm_checkboxes[k] = response.questions[questionNumber].options[k].option;
                            }

                            break;
                        case 4:
                            data.esm_submit = response.questions[questionNumber].submit;
                            data.esm_likert_max = response.questions[questionNumber].maxValue;
                            data.esm_likert_max_label = response.questions[questionNumber].maxLabel;
                            data.esm_likert_min_label = response.questions[questionNumber].minLabel;
                            data.esm_likert_step = response.questions[questionNumber].stepSize;
                            break;
                        case 5:
                            data.esm_quick_answers = [];
                            for (k = 0; k < response.questions[questionNumber].options.length; k++) {
                                data.esm_quick_answers[k] = response.questions[questionNumber].options[k].option;
                            }
                            break;
                        case 6:
                            data.esm_submit = response.questions[questionNumber].submit;
                            data.esm_scale_min = response.questions[questionNumber].minValue;
                            data.esm_scale_max = response.questions[questionNumber].maxValue;
                            data.esm_scale_start = response.questions[questionNumber].scaleStart;
                            data.esm_scale_max_label = response.questions[questionNumber].maxLabel;
                            data.esm_scale_min_label = response.questions[questionNumber].minLabel;
                            data.esm_scale_step = response.questions[questionNumber].stepSize;
                            break;
                        case 7:
                            data.esm_submit = response.questions[questionNumber].submit;
                            break;
                        default:
                            console.log("error");
                    }

                    extra_value[j] = {esm: data};
                }
                //CHANGE JSON TO STRING FOR AWARE TO UNDERSTAND
                var stringJSON = JSON.stringify(extra_value);
                extraJSON.extra_value =stringJSON;

                // ASK NIELS OR DENZIL
                var extras = [];
                extras[0] = extraJSON;
                action.extras = extras;



                var trigger = {};
                switch (response.scheduler[i].scheduleType) {
                    case 'interval':
                        if (typeof response.scheduler[i].hours != 'undefined') {
                            trigger.hour = response.scheduler[i].hours;
                        }

                        if (typeof response.scheduler[i].days != 'undefined' && response.scheduler[i].days.length != 7) {
                            trigger.weekday = response.scheduler[i].days;
                        }
                        break;

                    case 'event':
                        for (k = 0; k < response.context[0].contextType.length; k++) {
                            switch (response.context[0].contextType[k]){
                                //console.log("hello "+ response.Context[k].contextType);
                                case 'ACTION_AWARE_SCREEN_ON':
                                    //ACTIVE SCREEN SENSOR
                                    //response.update({ "_id":  "rf4XuGzNXDhauCEXD", "sensor":{$elemMatch:{sensorType: "Screen"}}},{"$set": {"sensor.$.sensorActive" :true}});
                                    sensors[count] = {"setting":"status_screen","value":"true"};
                                    count++;

                                    break;
                                case 'Application':
                                    break;
                                default:
                                    console.log('error');
                            }

                        }
                        trigger.context = response.context[0].contextType;

                        break;

                    case 'random':
                        trigger.hour = [];
                        trigger.hour[0] = response.scheduler[i].firsthour;
                        trigger.hour[1] = response.scheduler[i].lasthour;
                        // // for(k = 0; k < response.scheduler[j].hours.length; k++){
                        //     data.hour[k] =response.scheduler[j].hours[k];
                        // }
                        trigger.random = {
                            "random_times": response.scheduler[i].nrRandoms,
                            "random_interval": response.scheduler[i].interNotifTime
                        };
                        break;

                    case 'repeat':
                        trigger.interval = response.scheduler[i].repeat;
                        break;

                    default:
                        console.log('error');
                }
                // data.scheduleQuestion = response.scheduler[j].questionSchedule;
                // data.scheduleType = response.scheduler[j].scheduleType;
                //just check
                //action.trigger = trigger;

                singleSchedule.action = action;
                singleSchedule.trigger = trigger;
                schedules[i] = {"schedule":singleSchedule, "package" :"com.aware.phone"};

            }

            finalARRAY[1] = {"schedulers": schedules};
            // study_config[0] = {"schedulers": schedules};
            //study_config[1] = {"sensors" : [{"setting":"status_esm","value":"true"}]}
            sensors[count] = {"setting":"status_esm","value":"true"};
            count++;
            sensors[count] = {"setting":"status_webservice","value":"true"};
            count++;
            //var webservice_server = "http://35.157.62.184/study/" + params.id;
            var webservice_server = "https://api.awareframework.com/index.php/webservice/index/1216/Sn6TGutF2OME"
            sensors[count] = {"setting":"webservice_server","value":webservice_server};
            count++;


            //finalARRAY[1] = study_config
        }





        // if (response.sensorCheck) {

        for (j = 0; j < response.sensor.length; j++) {
            if (response.sensor[j].sensorActive) {
                var sensor_Data = {}
                var sensor_Freq = {}
                switch (response.sensor[j].sensorType) {
                    case "Accelerometer":
                        sensor_Data.setting = "status_accelerometer";
                        sensor_Freq.setting = "frequency_accelerometer";
                        break;
                    case "Application":
                        sensor_Data.setting = "status_applications";
                        sensor_Freq.setting = "frequency_applications";
                        if (typeof response.sensor[j].application != "undefined") {
                            for (k = 0; k < response.sensor[j].application.length; k++) {
                                var sensor_Extra = {}
                                switch (response.sensor[j].application[k]) {
                                    case "notification":
                                        sensor_Extra.setting = "status_notifications";
                                        break;
                                    case "crash":
                                        sensor_Extra.setting = "status_crashes";
                                        break;
                                    case "keyboard":
                                        sensor_Extra.setting = "status_keyboard";
                                        break;
                                    default:
                                        console.log("error");
                                }
                                sensor_Extra.value = "true";
                                sensors[count] = sensor_Extra
                                count++;
                            }
                        }
                        break;
                    case "Barometer":
                        sensor_Data.setting = "status_barometer";
                        sensor_Freq.setting = "frequency_barometer";
                        break;
                    case "Battery":
                        sensor_Data.setting = "status_battery";
                        break;
                    case "Bluetooth":
                        sensor_Data.setting = "status_bluetooth";
                        sensor_Freq.setting = "frequency_bluetooth";
                        break;
                    case "Communication":
                        sensor_Data.setting = "status_communication_events";
                        if (typeof response.sensor[j].communication != "undefined") {
                            for (k = 0; k < response.sensor[j].communication.length; k++) {
                                var sensor_Extra = {}
                                switch (response.sensor[j].communication[k]) {
                                    case "calls":
                                        sensor_Extra.setting = "status_calls";
                                        break;
                                    case "messages":
                                        sensor_Extra.setting = "status_messages";
                                        break;
                                    default:
                                        console.log("error");
                                }
                                sensor_Extra.value = "true";
                                sensors[count] = sensor_Extra
                                count++;
                            }
                        }
                        break;
                    case "Gravity":
                        sensor_Data.setting = "status_gravity";
                        sensor_Freq.setting = "frequency_gravity";
                        break;
                    case "Gyroscope":
                        sensor_Data.setting = "status_gyroscope";
                        sensor_Freq.setting = "frequency_gyroscope";
                        break;
                    case "Installations":
                        sensor_Data.setting = "status_installations";
                        break;
                    case "Light":
                        sensor_Data.setting = "status_light";
                        sensor_Freq.setting = "frequency_light";
                        break;
                    case "Linear Accelerometer":
                        sensor_Data.setting = "status_linear_accelerometer";
                        sensor_Freq.setting = "frequency_linear_accelerometer";
                        break;
                    case "Location":
                        sensor_Data.setting = "status_location_gps";
                        break;
                    case "Magnetometer":
                        sensor_Data.setting = "status_magnetometer";
                        sensor_Freq.setting = "frequency_magnetometer";
                        break;
                    case "Network":
                        break;
                    case "Processor":
                        sensor_Data.setting = "status_processor";
                        sensor_Freq.setting = "frequency_processor";
                        break;
                    case "Proximity":
                        sensor_Data.setting = "status_proximity";
                        sensor_Freq.setting = "frequency_proximity";
                        break;
                    case "Rotation":
                        sensor_Data.setting = "status_rotation";
                        sensor_Freq.setting = "frequency_rotation";
                        break;
                    case "Screen":
                        sensor_Data.setting = "status_screen";
                        break;
                    case "Telephony":
                        sensor_Data.setting = "status_telephony";
                        break;
                    case "Temperature":
                        sensor_Data.setting = "status_temperature";
                        sensor_Freq.setting = "frequency_temperature";
                        break;
                    case "Wi-Fi":
                        sensor_Data.setting = "status_wifi";
                        sensor_Freq.setting = "frequency_wifi";
                        break;
                    default:
                        console.log("error");

                }
                sensor_Data.value = "true";
                sensors[count] = sensor_Data;
                count++;
                if (typeof response.sensor[j].frequency != "undefined") {
                    sensor_Freq.value = response.sensor[j].frequency;
                    sensors[count] = sensor_Freq;
                    count++;
                }
            }
        }
        // var finalSensorJSON = {};
        // finalSensorJSON.sensors = sensors;
        finalARRAY[2] = {"sensors": sensors};
        // study_config[1] = finalSensorJSON;


        // finalARRAY[0] = study_config

        // var finalJSON = {
        //      "AWARE": finalARRAY
        // };

        var finalJSON = finalARRAY;

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(finalJSON));
    }
});
