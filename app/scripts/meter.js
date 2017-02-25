/**
 * Created by miguel on 25/02/17.
 */
var Meter = (function ($) {
    return function(config) {
        var $el = $('#' + config.selector);
        var balance = 0;

        function init(p) {
            setBalance(p.balance);
        }
        function setBalance(newBalance) {
            balance = newBalance;
            render();
        }

        function render() {
            $el.val(balance);
        }

        return {
            setBalance: setBalance,
            init: init
        };
    }
})(jQuery);
