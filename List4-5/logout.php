<?php

setcookie("username", "", time() - 360000, "/");

header("Location: index.php");
?>
