({
	// Handler para buscar todas las cuentas
	doInit: function(component, event, helper) {
		var action = component.get('c.bscCuentas');
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === 'SUCCESS') {
				var responseValue = response.getReturnValue();
				component.set('v.accountList', responseValue);
			}
		});
		$A.enqueueAction(action);
	},

	// Handler para tomar valores con checkbox tildado
	selectedAcc: function(component, event, helper) {
		var nivel1 = [];
		var nivel2 = [];
		var checkvalue1 = component.find('checkAcc1');
		var checkvalue2 = component.find('checkAcc2');
		var actionN1 = component.get('c.actNivel1');
		var actionN2 = component.get('c.actNivel2');

		if (!Array.isArray(checkvalue1 && checkvalue2)) {
			if (checkvalue1.get('v.value') && checkvalue2('v.value')) {
				nivel1.push(checkvalue1.get('v.text'));
				nivel2.push(checkvalue2.get('v.text'));
			}
		} else {
			for (var i = 0; i < checkvalue1.length; i++) {
				if (checkvalue1[i].get('v.value')) {
					nivel1.push(checkvalue1[i].get('v.text'));

					actionN1.setParams({ actN1: nivel1 });
					actionN1.setCallback(this, function(response) {
						var state = response.getState();
						if (state === 'SUCCESS') {
							var responseValue = response.getReturnValue();
							component.set('v.accountList', responseValue);
						}
					});
				}
			}
			for (var i = 0; i < checkvalue2.length; i++) {
				if (checkvalue2[i].get('v.value')) {
					nivel2.push(checkvalue2[i].get('v.text'));

					actionN2.setParams({ actN2: nivel2 });
					actionN2.setCallback(this, function(response) {
						var state = response.getState();
						if (state === 'SUCCESS') {
							var responseValue = response.getReturnValue();
							component.set('v.accountList', responseValue);
						}
					});
				}
			}
		}

		$A.enqueueAction(actionN1);
		$A.enqueueAction(actionN2);
	}
});
