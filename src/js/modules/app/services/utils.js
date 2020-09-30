(function () {
  angular.module('app').service('util', [UtilService]);

  function UtilService() {
    var addScriptInput = function (inputs, scriptInput) {
      if (angular.isDefined(inputs)) {
        for (var key in inputs.data) {
          if (inputs.data[key].value) {
            scriptInput[key] = inputs.data[key].value;
          }
        }
      }
    };

    this.prepareInputs = function (context) {
      if (!angular.isObject(context.inputs)) {
        context.inputs = {};
      }
      return function (inputs) {

        addScriptInput(inputs, context.inputs);
        console.log(context);
      }
    }
  }
})();