<!-- Tests -->
<div id="mocha"></div>
<script src="https://unpkg.com/mocha/mocha.js"></script>
<script src="/test/chai-4.4.1/chai.js"></script>
<script class="mocha-init">
    mocha.setup('bdd');
    mocha.checkLeaks();
</script>

<script src="/tests/js/dependencies/common/help_functions.js"></script>

<script src="/tests/js/randomizer/UI_close_settings.js"></script>
<script src="/tests/js/randomizer/UI_open_settings.js"></script>

<script class="mocha-exec">
    mocha.run();
</script>