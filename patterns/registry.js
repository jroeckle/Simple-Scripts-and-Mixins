define([], function () {
	
	function registryPattern(defaultValue) {
		this._defaultValue = defaultValue;
		this._values = Object.create(null);
	}

	registryPattern.prototype.register = function(name, value) {
		this._values[name] = value;
	};

	registryPattern.prototype.get = function(name) {

		var valuetoReturn = (Object.prototype.hasOwnProperty.call(this._values, name)) ? this._values[name] : this._defaultValue;

		return valuetoReturn;
	};

	return registryPattern;

});