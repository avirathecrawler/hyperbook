
<?php
// Added Comment - Just to see diff in bitbucket
$isEnabled = in_array('mod_rewrite', apache_get_modules());
echo ($isEnabled) ? 'Enabled' : 'Not enabled';

phpinfo();
?>

