Picker.route('/study/:id/json', function(params, req, res, next) { 
    var response = Studies.findOne({_id: params.id});

		// Check that study configuration has been already exported
    if (!response.exported) {
      res.setHeader( 'Content-Type', 'text/html' );
      res.statusCode = 404;
			res.end();
    }
    else {

			var finalARRAY =[];

			var studyData = {study_name: response.title , study_description: response.description ,
					start_date: response.start_date, end_date: response.end_date};

			finalARRAY[0] = studyData;

			var questions ={};
			questions.esms =[];
			for (i = 0; i < response.questions.length; i++) {
			var data ={esm_type : response.questions[i].type, esm_title :response.questions[i].question,
					esm_instructions:response.questions[i].instructions, esm_expiration_threshold :response.questions[i].timeout, esm_trigger : "AWARE_TEST"};
					switch(response.questions[i].type){
							case 1:
									data.esm_submit = response.questions[i].submit;
									break;
							case 2:
									data.esm_submit = response.questions[i].submit;
									data.esm_radios =[];
									for(j = 0; j < response.questions[i].options.length; j++){
											data.esm_radios[j] =response.questions[i].options[j].option;
									}
									break;
							case 3:
									data.esm_submit = response.questions[i].submit;
									data.esm_checkboxes =[];
									for(j = 0; j < response.questions[i].options.length; j++){
											data.esm_checkboxes[j] =response.questions[i].options[j].option;
									}

									break;
							case 4:
									data.esm_submit = response.questions[i].submit;
									data.esm_likert_max = response.questions[i].maxValue;
									data.esm_likert_max_label = response.questions[i].maxLabel;
									data.esm_likert_min_label = response.questions[i].minLabel;
									data.esm_likert_step = response.questions[i].stepSize;
									break;
							case 5:
									data.esm_quick_answers =[];
									for(j = 0; j < response.questions[i].options.length; j++){
											data.esm_quick_answers[j] =response.questions[i].options[j].option;
									}
									break;
							case 6:
									data.esm_submit = response.questions[i].submit;
									data.esm_scale_min = response.questions[i].minValue;
									data.esm_scale_max = response.questions[i].maxValue;
									data.esm_scale_start = response.questions[i].scaleStart;
									data.esm_scale_max_label = response.questions[i].maxLabel;
									data.esm_scale_min_label = response.questions[i].minLabel;
									data.esm_scale_step = response.questions[i].stepSize;
									break;
							case 7:
									data.esm_submit = response.questions[i].submit;
									break;
							default:
									console.log("error");
					}
					questions.esms[i] = {esm : data};
			}
			finalARRAY[1] = questions;

			if( typeof response.scheduler != 'undefined'){
					var scheduler ={};
					scheduler.schedules=[];
					for(j=0; j<response.scheduler.length;j++){
							var data ={};
							switch (response.scheduler[j].scheduleCheck){
									case 'time':
											if ( typeof response.scheduler[j].hours != 'undefined'){
															data.hours = [];
															for(k = 0; k < response.scheduler[j].hours.length; k++){
																			data.hours[k] =response.scheduler[j].hours[k];
																	}
													}

											if ( typeof response.scheduler[j].weekdays != 'undefined'){
															data.weekdays = [];
															for(k = 0; k < response.scheduler[j].weekdays.length; k++){
																	data.weekdays[k] =response.scheduler[j].weekdays[k];
															}
													}
											break;
									case 'interval':
											data.interval = response.scheduler[j].interval
											break;
									default:
											console.log('error');
							}
							data.scheduleQuestion = response.scheduler[j].questionSchedule;
							data.scheduleCheck = response.scheduler[j].scheduleCheck;
							scheduler.schedules[j] = {schedule : data};
					}
					finalARRAY[2] = scheduler;
			}

			if (response.sensorCheck) {
				var sensors = [];
				var count = 0;
				for(j = 0; j< response.sensor.length;j++){
					if(response.sensor[j].sensorActive){
						var sensor_Data ={}
						var sensor_Freq ={}
						switch(response.sensor[j].sensorType){
							case "Accelerometer":
								sensor_Data.setting = "status_accelerometer";
								sensor_Freq.setting = "frequency_accelerometer";
								break;
							case "Application":
								sensor_Data.setting = "status_applications";
								sensor_Freq.setting = "frequency_applications";
								if(typeof response.sensor[j].application != "undefined" ){
									for(k =0; k<response.sensor[j].application.length; k++){
										var sensor_Extra ={}
										switch(response.sensor[j].application[k]){
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
										sensors[count] =sensor_Extra
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
								if(typeof response.sensor[j].communication != "undefined" ){
									for(k =0; k<response.sensor[j].communication.length; k++){
										var sensor_Extra ={}
										switch(response.sensor[j].communication[k]){
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
										sensors[count] =sensor_Extra
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
								sensor_Data.setting = "status_location";
								break;
							case "Magnetometer":
								sensor_Data.setting = "status_magnetometer";
								sensor_Freq.setting = "frequency_magnetometer";
								break;
							case "Network":
								break;
							case "Processer":
								sensor_Data.setting = "status_processer";
								sensor_Freq.setting = "frequency_processer";
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
						sensors[count] =sensor_Data;
						count++;
						if(typeof response.sensor[j].frequency != "undefined" ){
							sensor_Freq.value = response.sensor[j].frequency;
							sensors[count] =sensor_Freq;
							count++;
						}
					}
				}
				var finalSensorJSON ={};
				finalSensorJSON.sensors = sensors;
				finalARRAY[3] = finalSensorJSON;
			}

			var finalJSON = {AWARE: finalARRAY};



			res.setHeader( 'Content-Type', 'application/json' );
			res.statusCode = 200;
			res.end(JSON.stringify(finalJSON));
    }
});