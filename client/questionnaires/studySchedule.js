try {
    Template.studySchedule.onCreated(function () {
        var self = this;
        self.autorun(function () {
            var id = FlowRouter.getParam('id');
            self.subscribe('singleStudy', id);
        });

        SEO.set({
            title: "AWARE Create - Schedule configuration"
        });
    });

    AutoForm.addHooks("updateSchedule", {
        onSuccess: function (formType, result) {
            FlowRouter.go("/study/:id/sensor", { id: FlowRouter.getParam('id') });
        }
    });

    AutoForm.addHooks(null, {
        before: {
            update: function (doc) {
                _.each(doc.$set, function (value, setter) {
                    if (_.isArray(value)) {
                        var newValue = _.compact(value);
                        doc.$set[setter] = newValue;
                    }
                });
                return doc;
            }
        }
    });

    Template.registerHelper('incremented', function (index) {
        index++;
        return index;
    });

    Template.studySchedule.helpers({
        append(string1, string2) {
            return string1 + '.' + string2;
        },
        study: () => {
            var id = FlowRouter.getParam('id');
            return Studies.findOne({
                _id: id
            });
        },
        updateStudyId: function () {
            var id = FlowRouter.getParam('id');
            return Studies.findOne({
                _id: id
            });
        },
        questionsCheckbox: function () {
            var id = FlowRouter.getParam('id');
            study = Studies.findOne({
                _id: id
            });
            var options = [];
            if (typeof study != "undefined") {
                for (i = 0; i < study.questions.length; i++) {
                    var json = {};
                    json["label"] = "Question " + (i + 1) + " - " + study.questions[i].title;
                    json["value"] = study.questions[i].id;
                    options[i] = json;
                }
                return options;
            }
        },
        questionsCheckboxValue: function () {
            var options = [];
            if (typeof study != "undefined") {
                for (i = 0; i < study.questions.length; i++) {
                    options[i] = study.questions[i].id;
                }
                return options;
            }
        }
    });

} catch (err) {
    console.log(err);
}
